import logging
import os
from groq import Groq

class GroqModel:

    def __init__(self):
        self.client = Groq(
            api_key = os.getenv("GROQ_API_KEY")
        )
        logging.info("Groq models initialized successfully.")

    def generate_text(self, prompt):
        try:
            response = self.client.chat.completions.create(
                model="llama-3.2-11b-vision-preview",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }   
                ],
                temperature=0.8,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            return response.choices[0].message.content
        except Exception as e:
            logging.error(f"Error generating text: {e}")
            return None
