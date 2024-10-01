import os
import sys
import logging
import markdown
import html_to_json
import shutil
import base64
from pymongo import MongoClient
from google_model import GoogleModel
from groq_model import GroqModel
# from openai_model import OpenAIModel

# Configure logging to write to a file
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='main_course/course_generator.log',
    filemode='a'  # Append mode
)

class MongoDBHandler(logging.Handler):
    def __init__(self, project_collection, project_id):
        super().__init__()
        self.project_collection = project_collection
        self.project_id = project_id

    def emit(self, record):
        log_entry = self.format(record)
        self.project_collection.update_one(
            {"_id": self.project_id},
            {"$push": {"logs": log_entry}}
        )

# Connect to MongoDB
client = MongoClient('mongodb+srv://CourseCreator:khOJyuy6rSdQGgrw@cluster0.8rvtn.mongodb.net/')
db = client['course_database']
project_collection = db['projects']

class CourseGenerator:
    def __init__(self, user_id, content, descriptions, type, language, duration, identifier, difficulty, text_provider, image_provider):
        self.user_id = user_id
        self.type = type
        self.content = content
        self.descriptions = descriptions
        self.language = language
        self.duration = duration
        self.identifier = identifier
        self.difficulty = difficulty
        self.text_provider = text_provider
        self.image_provider = image_provider

        # Initialize project document
        self.project_id = project_collection.insert_one({
            "user_id": user_id,
            "content": content,
            "descriptions": descriptions,
            "type": type,
            "language": language,
            "duration": duration,
            "identifier": identifier,
            "difficulty": difficulty,
            "text_provider": text_provider,
            "image_provider": image_provider,
            "course_content": None,
            "images": [],
            "logs": [],
            "chat": []
        }).inserted_id

        # Add MongoDB logging handler
        mongo_handler = MongoDBHandler(project_collection, self.project_id)
        mongo_handler.setLevel(logging.INFO)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        mongo_handler.setFormatter(formatter)
        logging.getLogger().addHandler(mongo_handler)

    def generate_course(self):
        logging.info("Starting course generation process...")

        # Generate prompt
        self.prompt = self.generate_prompt()
        logging.info("Prompt created successfully.")

        try:
            self.text_model = self.get_text_model()
            self.image_model = self.get_image_model()
        except Exception as e:
            logging.error(f"Error getting text or image model: {e}")
            return

        try:
            # Generate course content
            self.result = self.generate_course_texts()
            if self.result is None:
                return

            # Generate images
            result_list, image_data = self.generate_images(self.result)

            # Assemble markdown
            final_output = self.assemble_markdown(result_list, image_data)

            # Convert to JSON
            jsonified = self.convert_to_json(final_output)
            if jsonified is None:
                return

            # Save markdown
            self.save_markdown(jsonified)
            print(jsonified)

        except Exception as e:
            logging.exception(f"An unexpected error occurred: {e}")

    def get_text_model(self):
        if self.text_provider == "google":
            return GoogleModel(os.environ.get("GOOGLE_CLOUD_PROJECT"))
        elif self.text_provider == "groq":
            return GroqModel()
        # elif self.text_provider == "openai":            
        #     return OpenAIModel(os.environ.get("OPENAI_API_KEY"))
        else:
            raise ValueError("Unsupported text provider")

    def get_image_model(self):
        if self.image_provider == "google":
            return GoogleModel(os.environ.get("GOOGLE_CLOUD_PROJECT"))

        # elif self.image_provider == "openai":
        #     return OpenAIModel(os.environ.get("OPENAI_API_KEY"))
        else:
            raise ValueError("Unsupported image provider")

    def generate_course_texts(self):
        logging.info("Generating course content using text model...")
        result = self.text_model.generate_text(self.prompt)
        if result is None:
            logging.error("Failed to generate course content. Exiting.")
            return None
        return result

    def generate_images(self, result):
        image_data = []
        result_list = result.split('**[Diagram Start]**')

        for i, split in enumerate(result_list):
            if '**[Diagram End]**' in split:
                temp = split.split('**[Diagram End]**')
                result_list[i] = temp[-1]
                image_prompt = temp[0].split("Prompt :")[-1].strip()

                logging.info(f"Generating image for prompt: '{image_prompt}'...")
                try:
                    image = self.image_model.generate_image(image_prompt)
                    if image is None:
                        logging.error(f"Failed to generate image for prompt: '{image_prompt}'")
                        continue  # Skip to next iteration if image generation fails
                    image = image._image_bytes
                    # Convert image to base64 string
                    image_base64 = base64.b64encode(image).decode('utf-8')

                    # Store image in MongoDB
                    image_id = project_collection.update_one(
                        {"_id": self.project_id},
                        {"$push": {"images": {"image_base64": image_base64, "prompt": image_prompt}}}
                    )

                    image_data.append({"prompt": image_prompt, "image_base64": image_base64})
                    logging.info(f"Image for prompt '{image_prompt}' generated and stored successfully.")

                except Exception as e:
                    logging.error(f"Error generating image for prompt '{image_prompt}': {e}")

        return result_list, image_data

    def assemble_markdown(self, result_list, image_data):
        logging.info("Assembling final markdown output...")
        final_output = ""
        for i, section in enumerate(result_list):
            final_output += section
            if i < len(image_data):  # Add image placeholder if available for this section
                final_output += f"![Generated Image Placeholder](IMAGE_PLACEHOLDER_{i})\n"
                final_output += f"{image_data[i]['prompt']}\n"
        logging.info("Markdown output assembled successfully.")
        return final_output

    def convert_to_json(self, final_output):
        logging.info("Converting markdown to HTML and JSON...")
        try:
            htmlified = markdown.markdown(final_output)
            jsonified = html_to_json.convert(htmlified)
            logging.info("Conversion to JSON successful.")
            return jsonified
        except Exception as e:
            logging.error(f"Error converting markdown to JSON: {e}")
            return None

    def save_markdown(self, final_output):
        try:
            # Store course JSON in MongoDB
            project_collection.update_one(
                {"_id": self.project_id},
                {"$set": {"course_content": final_output}}
            )
            logging.info(f"Course content saved to MongoDB with ID: {self.project_id}")
        except Exception as e:
            logging.error(f"Error saving course content to MongoDB: {e}")

    def save_chat_record(self, chat_record):
        try:
            # Store chat record in MongoDB
            chat_id = self.chat_collection.insert_one({"chat_record": chat_record}).inserted_id
            logging.info(f"Chat record saved to MongoDB with ID: {chat_id}")
        except Exception as e:
            logging.error(f"Error saving chat record to MongoDB: {e}")

    # System roles
    CreationSysRole = """
    You are a Course Designer.

    You are a professional Course Designer specializing in creating detailed online courses. Your task is to design comprehensive courses in the specified language, ensuring that all content is well-structured and thoroughly explained.

    You must:
    1. Create clear, detailed lecture notes for each class, covering all topics and subtopics in depth. Avoid single-sentence explanations; instead, provide thorough descriptions and explanations for each concept.
    2. Include proper descriptions of diagrams, charts, or images where necessary. Clearly mark the start and end of each diagram or image description using the following format:
        - **[Diagram Start]**
        - Description : Provide a concise description of the diagram, explaining its components and their relevance to the topic.
        - Prompt : Provide a complete prompt for the generation of image that can be directly be fed to Image Generator AIs.
        - **[Diagram End]**
    3. Ensure all content is easy to understand and well-organized, using headings, subheadings, and bullet points where applicable for clarity.
    4. Continuously review the course flow to ensure all elements (text, images, diagrams) contribute to the learning objectives.
    5. The explanations have to be detailed, not simple one-line definitions. It should be understood easily by any layman in the field.
    6. The assignments/questions have to consist of both easy and complex questions based on the topic.

    7. The lecture notes should include clearly defined sections, subsections, examples, and references, along with appropriate diagrams or images. Each lecture must have the following structure:

    Table of Contents: Start with a well-organized table of contents, with links to each section and subsection.
    Introduction: Briefly introduce the topic and provide an overview.
    Time: Breakdown the course into the time it would take in weeks and days with each day having Main Content, Definitions, Examples, Diagrams and Images, Keypoints and assessments. 
    Main Content: Break down the main topic into subtopics. Each subtopic must include:
    Definitions: Provide detailed definitions and explanations.
    Examples: Offer real-world examples and link to further resources when applicable.
    Diagrams and Images: Include visual aids with proper descriptions. Diagram descriptions must be clearly identified with a label.
    Terminology: Include a glossary section explaining key terms used in the lecture.
    Project Lifecycle: Where applicable, explain any lifecycle or project stages with steps and processes.
    Conclusion: Summarize key points and link to any further reading or resources.
    For instance, a lecture note on Generative AI should follow this structure:
    Table of Contents
    Introduction
    Generative AI
    LLMs
    Definition
    Examples
    Terminology
    Project Lifecycle
    Scope
    Select
    Adapt and Align Model
    Application Integration
    Use detailed, properly formatted descriptions for all diagrams and ensure the text flows logically with clear transitions between topics.

    8. Generate complete results.
    """

    ChatSysRole = """
    You are Expert Online Course Creator.
    You Help the user with the issues they are facing and if given the content form the course.
    You explain them with extensive examples and diagrams(if neccessary).
    You do not reply to the questions out of the context.
    """

    def generate_prompt(self):
        if self.type == 0:
            logging.info("Generating content using CreationSysRole...")
            prompt = f'>>> Topic : {self.content}'
            if self.descriptions != '':
                prompt += f'\n >>> Description : {self.descriptions}'
            prompt += f'\n >>> Language : {self.language}'
            prompt += f'\n >>> Difficulty : {self.difficulty}'
            prompt += f'\n >>> Duration : {str(self.duration) + " " + self.identifier}\n\n'
            prompt += self.CreationSysRole
            prompt += f'\n >>> System Role : {self.CreationSysRole}'
        else:
            logging.info("Generating content using ChatSysRole...")
            prompt = f'>>> User Message : {self.content}'
            prompt += f'\n\n >>> SystemRole : {self.ChatSysRole}'
        return prompt

if __name__ == "__main__":
    # Extract command-line arguments
    args = sys.argv

    # Assign values from command-line arguments, use default values if not provided
    user_id = args[1] if len(args) > 1 else '0001'
    content = args[2] if len(args) > 2  else 'Machine Learning : Introduction'
    descriptions = args[3] if len(args) > 3 else ''
    type = int(args[4]) if len(args) > 4 else 1
    language = args[5] if len(args) > 5 else 'English'
    duration = int(args[6]) if len(args) > 6 else 1
    identifier = args[7] if len(args) > 7 else 'Day'
    difficulty = args[8] if len(args) > 8 else 'Beginner'
    text_provider = args[9] if len(args) > 9 else 'google'
    image_provider = args[10] if len(args) > 10 else 'google'

    course_generator = CourseGenerator(
        user_id,
        content,
        descriptions,
        type,
        language,
        duration,
        identifier,
        difficulty,
        text_provider,
        image_provider
    )

    course_generator.generate_course()