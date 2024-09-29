from flask import Flask, render_template, request, jsonify
import requests
import base64

app = Flask(__name__)

SARVAM_API_URL = "https://api.sarvam.ai/text-to-speech"
SARVAM_API_KEY = "b6e62ec5-4a76-4b0f-8922-fe2a9b23af4f"  # Replace with your actual API key

@app.route('/')
def index():
    return render_template('index2.html')

@app.route('/convert_text', methods=['POST'])
def convert_text():
    data = request.get_json()
    text = data.get('text', '')
    target_language = data.get('language', 'en-IN')
    
    # Payload to send to the Sarvam API
    payload = {
        "inputs": [text],
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
    
    response = requests.post(SARVAM_API_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        audio_data = response.json().get('audios', [])[0]  # Base64 encoded audio
        return jsonify({"audio": audio_data})
    else:
        return jsonify({"error": "Failed to convert text to speech"}), 500

if __name__ == '__main__':
    app.run(debug=True)
