from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Route to serve the frontend
@app.route('/')
def index():
    return render_template('index3.html')  # Make sure this filename matches your HTML file name

# Route to handle audio and convert it to text
@app.route('/convert_speech', methods=['POST'])
def convert_speech():
    audio_file = request.files['file']
    
    # Sarvam API details
    url = "https://api.sarvam.ai/speech-to-text-translate"
    api_key = "b6e62ec5-4a76-4b0f-8922-fe2a9b23af4f"  # Replace with your Sarvam API key
    
    files = {
        'file': (audio_file.filename, audio_file, 'audio/wav'),
    }
    data = {
        'model': 'saaras:v1',  # Model to use
    }
    headers = {
        'api-subscription-key': api_key,  # Correct API subscription key header
    }

    # Send request to Sarvam API
    response = requests.post(url, files=files, data=data, headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        transcript = response_data.get('transcript', 'No transcript found')
        return jsonify({'transcript': transcript})
    else:
        return jsonify({'error': 'Error processing the audio'}), 500

if __name__ == '__main__':
    app.run(debug=True)
