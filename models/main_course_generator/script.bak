import os
import sys
import logging
import vertexai
import markdown
import html_to_json
from vertexai.generative_models import GenerativeModel
from vertexai.preview.vision_models import ImageGenerationModel

# Initialize logging
log_file = "models/main_course_generator/course_generator.log"
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

PROJECT_ID = "course-generator-436412"
vertexai.init(project=PROJECT_ID, location="us-central1")

# Initialize Vertex AI models
logging.info("Initializing Vertex AI models...")
text_model = GenerativeModel("gemini-1.5-pro-001")
imagen_model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")
fast_imagen_model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")
logging.info("Models initialized successfully.")

# Define the system role for the course designer
CreationSysRole = '''
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

'''

ChatSysRole = ''' 
You are Expert Online Course Creator.
You Help the user with the issues they are facing and if given the content form the course.
You explain them with extensive examples and diagrams(if neccessary).
You do not reply to the questions out of the 
'''

def main(
        content,
        descriptions='',
        type=1,
        language='English',
        duration=1,
        identifier='Weeks',
        difficulty='Beginner'
):
    logging.info("Starting course generation process...")

    # Construct the prompt based on type
    if type == 0:
        logging.info("Generating content using CreationSysRole...")
        prompt = f'>>> Topic : {content}'
        if descriptions != '':
            prompt += f'\n >>> Description : {descriptions}'
        prompt += f'\n >>> Language : {language}'
        prompt += f'\n >>> Difficulty : {difficulty}'
        prompt += f'\n >>> Duration : {str(duration) + " " + identifier}'
        prompt += CreationSysRole
        prompt += f'\n >>> System Role : {CreationSysRole}'
    else:
        logging.info("Generating content using ChatSysRole...")
        prompt = f'>>> User Message : {content}'
        prompt += f'\n\n >>> SystemRole : {ChatSysRole}'

    logging.info("Prompt created successfully.")
    
    # Generate course content using the text model
    try:
        logging.info("Generating course content using text model...")
        response = text_model.generate_content(prompt)
        result = response.text
        logging.info("Course content generated successfully.")
    except Exception as e:
        logging.error(f"Error generating course content: {e}")
        return

    # Create and refresh the temp folder
    temp_folder = os.path.join("models", "main_course_generator", "temp")
    image_folder = "temp"
    if os.path.exists(temp_folder):
        logging.info(f"Refreshing temp folder at {temp_folder}...")
        for file in os.listdir(temp_folder):
            os.remove(os.path.join(temp_folder, file))
    else:
        logging.info(f"Creating temp folder at {temp_folder}...")
        os.makedirs(temp_folder)

    # Split the result into sections based on diagram markers
    logging.info("Splitting result into sections based on diagram markers...")
    result_list = result.split('**[Diagram Start]**')

    # Initialize an empty list to store image data
    image_data = []
    md_image_data = []

    # Process each section to generate and store images
    for i, split in enumerate(result_list):
        if '**[Diagram End]**' in split:
            # Extract image prompt and update the result list
            temp = split.split('**[Diagram End]**')
            result_list[i] = temp[-1]
            image_prompt = temp[0].split("Prompt :")[-1].strip()  # Extract the prompt

            # Generate and display the image
            logging.info(f"Generating image for prompt: '{image_prompt}'...")
            try:
                image_response = imagen_model.generate_images(image_prompt)
                image_data.append({
                    "prompt": image_prompt,
                    "image": image_response.images[0]  # Store the image object
                })
                
                # Save the image to the temp folder
                image_path = os.path.join(temp_folder, f"image_{i - 1}.png")  # Use the index for naming
                md_image_path = os.path.join(image_folder, f"image_{i - 1}.png")
                md_image_data.append(md_image_path)  # Fix this line to use md_image_data
                image_response.images[0].save(image_path)  # Save the image
                logging.info(f"Image saved to {image_path} successfully.")
                
            except Exception as e:
                logging.error(f"Error generating image for prompt '{image_prompt}': {e}")

    # Assemble the final markdown output
    logging.info("Assembling final markdown output...")
    final_output = ""
    for i, section in enumerate(result_list):
        final_output += section
        if i < len(image_data):  # Add image if available for this section
            # Log available attributes of the generated image
            logging.info(f"Generated Image Attributes: {dir(image_data[i]['image'])}")
            
            # Attempt to access the correct attribute for the image
            image_path = os.path.join("temp", f"image_{i}.png")  # Use the same path for markdown
            final_output += f"![Generated Image]({image_path})\n"  # Update this line to use the saved path
            final_output += f"**Prompt:** {image_data[i]['prompt']}\n"

    logging.info("Markdown output assembled successfully.")

    # Convert markdown to HTML and then to JSON
    logging.info("Converting markdown to HTML and JSON...")
    try:
        htmlified = markdown.markdown(final_output)
        jsonified = html_to_json.convert(htmlified)

        logging.info("Conversion to JSON successful.")
    except Exception as e:
        logging.error(f"Error converting markdown to JSON: {e}")
        return

    # Save the final output to a markdown file
    md_file_path = "models/main_course_generator/temp.md"
    try:
        logging.info(f"Saving final markdown output to {md_file_path}...")
        with open(md_file_path, "w", encoding="utf-8") as f:
            f.write(final_output)
        logging.info("Markdown output saved successfully.")
    except Exception as e:
        logging.error(f"Error saving markdown output: {e}")

    # Print the final JSON output to the console
    print(jsonified)

# # Call the main function with example arguments
# main('Deep Learning: RNN Models', type=0, identifier="Days")

if __name__ == "__main__":
    # Extract command-line arguments
    args = sys.argv
    
    # Assign values from command-line arguments, use default values if not provided
    content = args[1] if len(args) > 1 else ''
    descriptions = args[2] if len(args) > 2 else ''
    type = int(args[3]) if len(args) > 3 else 1
    language = args[4] if len(args) > 4 else 'English'
    duration = int(args[5]) if len(args) > 5 else 1
    identifier = args[6] if len(args) > 6 else 'Weeks'
    difficulty = args[7] if len(args) > 7 else 'Beginner'
    
    # Call the main function with the provided arguments
    main(content, descriptions, type, language, duration, identifier, difficulty)
