import os
import sys
import logging
from vertex_ai_interface import VertexAI_Interface
import markdown
import html_to_json
import shutil

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

def main(content, descriptions, type, language, duration, identifier, difficulty):
    logging.info("Starting course generation process...")

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
    if not project_id:
        logging.error("GOOGLE_CLOUD_PROJECT environment variable not set.")
        return

    # Get the Singleton instance
    vertex_ai = VertexAI_Interface.get_instance(project_id)

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

    try:
        logging.info("Generating course content using text model...")
        result = vertex_ai.generate_text(prompt)
        if result is None:
            logging.error("Failed to generate course content. Exiting.")
            return


        # ... (Diagram processing logic) ...

        temp_folder = "main_course/temp"
        image_folder = "temp"

        if os.path.exists(temp_folder):
            shutil.rmtree(temp_folder) #Clean up temp folder before creating a new one.
        os.makedirs(temp_folder)

        image_data = []
        md_image_data = []

        result_list = result.split('**[Diagram Start]**')

        for i, split in enumerate(result_list):
            if '**[Diagram End]**' in split:
                temp = split.split('**[Diagram End]**')
                result_list[i] = temp[-1]
                image_prompt = temp[0].split("Prompt :")[-1].strip()

                logging.info(f"Generating image for prompt: '{image_prompt}'...")
                try:
                    image = vertex_ai.generate_image(image_prompt)
                    if image is None:
                        logging.error(f"Failed to generate image for prompt: '{image_prompt}'")
                        continue  #Skip to next iteration if image generation fails

                    image_path = os.path.join(temp_folder, f"image_{i}.png")
                    md_image_path = os.path.join(image_folder, f"image_{i}.png")
                    image.save(image_path)
                    md_image_data.append(md_image_path)
                    image_data.append({"prompt": image_prompt, "image_path": image_path})
                    logging.info(f"Image saved to {image_path} successfully.")

                except Exception as e:
                    logging.error(f"Error generating or saving image for prompt '{image_prompt}': {e}")


        # Assemble the final markdown output
        logging.info("Assembling final markdown output...")
        final_output = ""
        for i, section in enumerate(result_list):
            final_output += section
            if i < len(image_data):  # Add image if available for this section
                # Log available attributes of the generated image
                #logging.info(f"Generated Image Attributes: {dir(image_data[i]['image'])}")
                
                # Attempt to access the correct attribute for the image
                image_path = os.path.join("temp", f"image_{i}.png")  # Use the same path for markdown
                final_output += f"![Generated Image]({image_path})\n"  # Update this line to use the saved path
                final_output += f"{image_data[i]['prompt']}\n"

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

        # Save markdown file.  Added explicit error handling
        md_file_path = "main_course/temp.md" #Simplified path for clarity
        try:
            with open(md_file_path, "w", encoding="utf-8") as f:
                f.write(final_output)
            logging.info(f"Markdown output saved to {md_file_path} successfully.")
        except Exception as e:
            logging.error(f"Error saving markdown output: {e}")


        print(jsonified)

    except Exception as e:
        logging.exception(f"An unexpected error occurred: {e}")



if __name__ == "__main__":
    # Extract command-line arguments
    args = sys.argv
    
    # Assign values from command-line arguments, use default values if not provided
    content = args[1] if len(args) > 1 else ''
    descriptions = args[2] if len(args) > 2 else ''
    type = int(args[3]) if len(args) > 3 else 1
    language = args[4] if len(args) > 4 else 'English'
    duration = int(args[5]) if len(args) > 5 else 1
    identifier = args[6] if len(args) > 6 else 'Day'
    difficulty = args[7] if len(args) > 7 else 'Beginner'
    
    # Call the main function with the provided arguments
    main(content, descriptions, type, language, duration, identifier, difficulty)
