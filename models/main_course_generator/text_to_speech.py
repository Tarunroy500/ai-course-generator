# from flask import Flask, render_template, request, jsonify
# import requests
# import base64

# app = Flask(__name__)

# SARVAM_API_URL = "https://api.sarvam.ai/text-to-speech"
# SARVAM_API_KEY = "b6e62ec5-4a76-4b0f-8922-fe2a9b23af4f"  # Replace with your actual API key

# @app.route('/')
# def index():
#     return render_template('index2.html')

# @app.route('/convert_text', methods=['POST'])
# def convert_text():
#     data = request.get_json()
#     text = data.get('text', '')
#     target_language = data.get('language', 'en-IN')
    
#     # Payload to send to the Sarvam API
#     payload = {
#         "inputs": [text],
#         "target_language_code": target_language,
#         "speaker": "meera",
#         "pitch": 0,
#         "pace": 1.65,
#         "loudness": 1.5,
#         "speech_sample_rate": 22050,
#         "enable_preprocessing": True,
#         "model": "bulbul:v1"
#     }

#     headers = {
#         "Content-Type": "application/json",
#         "api-subscription-key": SARVAM_API_KEY
#     }
    
#     response = requests.post(SARVAM_API_URL, json=payload, headers=headers)
    
#     if response.status_code == 200:
#         audio_data = response.json().get('audios', [])[0]  # Base64 encoded audio
#         return jsonify({"audio": audio_data})
#     else:
#         return jsonify({"error": "Failed to convert text to speech"}), 500

# if __name__ == '__main__':
#     app.run(debug=True)




from flask import Flask, render_template, request, jsonify
import requests
import base64

app = Flask(__name__)

SARVAM_API_URL_TTS = "https://api.sarvam.ai/text-to-speech"
SARVAM_API_URL_TRANSLATE = "https://api.sarvam.ai/translate"
SARVAM_API_KEY = "b6e62ec5-4a76-4b0f-8922-fe2a9b23af4f"  # Replace with your actual API key

@app.route('/')
def index():
    return render_template('index2.html')

def translate_text(text, target_language_code):
    url = SARVAM_API_URL_TRANSLATE

    payload = {
        "input": text, 
        "source_language_code": "en-IN",  # You might want to make this dynamic later
        "target_language_code": target_language_code, 
        "speaker_gender": "Male",
        "mode": "formal",
        "model": "mayura:v1",
        "enable_preprocessing": True
    }

    headers = {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY 
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        try:
            translated_text = response.json()["translated_text"]
            return translated_text
        except KeyError: 
            return None  # Or handle the error in a more user-friendly way
    else:
        return None  # Or handle the error in a more user-friendly way

def convert_text(text, target_language):
    # First, translate the text
    translated_text = translate_text(text, target_language)

    if translated_text is None:
        return jsonify({"error": "Failed to translate text"}), 500

    # Then, convert the translated text to speech
    payload = {
        "inputs": [translated_text],  # Use the translated text here
        "target_language_code": target_language,
        "speaker": "meera",
        "pitch": 0,
        "pace": 1.65,
        "loudness": 1.5,
        "speech_sample_rate": 22050,
        "enable_preprocessing": True,
        "model": "bulbul:v1"
    }

    headers = {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY
    }

    response = requests.post(SARVAM_API_URL_TTS, json=payload, headers=headers)

    if response.status_code == 200:
        audio_data = response.json().get('audios', [])[0]
        return jsonify({"audio": audio_data})
    else:
        return jsonify({"error": "Failed to convert text to speech"}), 500

@app.route('/convert_text', methods=['POST'])
def convert_text_route():  # Renamed for clarity
    data = request.get_json()
    text = data.get('text', '')
    target_language = data.get('language', 'en-IN')
    return convert_text(text, target_language)

if __name__ == '__main__':
    app.run(debug=True)