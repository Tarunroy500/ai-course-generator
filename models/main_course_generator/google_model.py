import logging
import vertexai
from vertexai.generative_models import GenerativeModel
from vertexai.preview.vision_models import ImageGenerationModel

class GoogleModel:
    __instance = None

    def __new__(cls, project_id, location="us-central1"):
        if cls.__instance is None:
            cls.__instance = super(GoogleModel, cls).__new__(cls)
            cls.__instance._initialized = False
        return cls.__instance

    def __init__(self, project_id, location="us-central1"):
        if self._initialized:
            return
        try:
            vertexai.init(project=project_id, location=location)
            self.text_model = GenerativeModel("gemini-1.5-flash-001")
            self.image_model = ImageGenerationModel.from_pretrained("imagen-2.0-generate-001")
            # self.image_model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")
            self.fast_image_model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")
            logging.info("Google Vertex AI models initialized successfully.")
            self._initialized = True
        except Exception as e:
            logging.error(f"Error initializing Google Vertex AI models: {e}")
            raise

    def generate_text(self, prompt):
        try:
            response = self.text_model.generate_content(prompt)
            return response.text
        except Exception as e:
            logging.error(f"Error generating text: {e}")
            return None

    def generate_image(self, prompt, model="default"):
        try:
            model_to_use = self.image_model if model == "default" else self.fast_image_model
            image_response = model_to_use.generate_images(prompt)
            return image_response.images[0]
        except Exception as e:
            logging.error(f"Error generating image: {e}")
            return None