import logging
import openai

class OpenAIModel:
    def __init__(self, api_key):
        openai.api_key = api_key
        logging.info("OpenAI models initialized successfully.")

    def generate_text(self, prompt):
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                temperature=0.8,
            )
            return response.choices[0].text.strip()
        except Exception as e:
            logging.error(f"Error generating text: {e}")
            return None

    def generate_image(self, prompt, model="default"):
        try:
            response = openai.Image.create(
                prompt=prompt,
                n=1,
                size="1024x1024"
            )
            return response['data'][0]['url']
        except Exception as e:
            logging.error(f"Error generating image: {e}")
            return None