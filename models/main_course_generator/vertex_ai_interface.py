import os
import logging
import vertexai
from vertexai.generative_models import GenerativeModel
from vertexai.preview.vision_models import ImageGenerationModel

# Configure logging
log_file = "main_course/course_generator.log"  # Changed log file name for clarity
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class VertexAI_Interface:
    __instance = None

    @staticmethod
    def get_instance(project_id, location="us-central1"):
        if VertexAI_Interface.__instance is None:
            VertexAI_Interface(project_id, location)
        return VertexAI_Interface.__instance

    def __init__(self, project_id, location="us-central1"):
        if VertexAI_Interface.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            try:
                vertexai.init(project=project_id, location=location)
                self.text_model = GenerativeModel("gemini-1.5-pro-001")
                self.imagen_model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")
                self.fast_imagen_model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")
                logging.info("Vertex AI models initialized successfully.")
                VertexAI_Interface.__instance = self
            except Exception as e:
                logging.error(f"Error initializing Vertex AI models: {e}")
                raise

    def generate_text(self, prompt):
        try:
            response = self.text_model.generate_content(prompt)
            return response.text
        except Exception as e:
            logging.error(f"Error generating text: {e}")
            return None

    def generate_image(self, prompt, model="imagen-3.0-generate-001"):
        try:
            model_to_use = self.imagen_model if model == "imagen-3.0-generate-001" else self.fast_imagen_model
            image_response = model_to_use.generate_images(prompt)
            return image_response.images[0]
        except Exception as e:
            logging.error(f"Error generating image: {e}")
            return None
