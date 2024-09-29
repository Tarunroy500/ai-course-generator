# import requests

# def translate_text(text):
#     url = "https://api.sarvam.ai/translate"

#     # Update the payload to include the actual text to translate
#     payload = {
#         "input": text,  # Use the 'text' argument here
#         "source_language_code": "en-IN",
#         "target_language_code": "hi-IN",
#         "speaker_gender": "Male",
#         "mode": "formal",
#         "model": "mayura:v1",
#         "enable_preprocessing": True
#     }

#     headers = {
#         "Content-Type": "application/json",
#         "api-subscription-key": "21f113e6-3ee3-4cc9-8e7a-2c851019a2c8" 
#     }

#     response = requests.post(url, json=payload, headers=headers)

#     if response.status_code == 200:
#         print("Full Response:", response.text)  # Print the full response for debugging
#         translated_text = response.json()["translated_text"]
#         print("Translated Text:", translated_text)
#     else:
#         print("Error:", response.status_code, response.text)

# # Example usage
# text_to_translate = input("Enter text to translate (English to Hindi): ")
# translate_text(text_to_translate)



from flask import Flask, render_template, request
import requests

app = Flask(__name__)

def translate_text(text, target_language_code):
    url = "https://api.sarvam.ai/translate"

    payload = {
        "input": text, 
        "source_language_code": "en-IN",
        "target_language_code": target_language_code,  # Use the selected target language
        "speaker_gender": "Male",
        "mode": "formal",
        "model": "mayura:v1",
        "enable_preprocessing": True
    }

    headers = {
        "Content-Type": "application/json",
        "api-subscription-key": "21f113e6-3ee3-4cc9-8e7a-2c851019a2c8" 
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        translated_text = response.json()["translated_text"]
        return translated_text
    else:
        return f"Error: {response.status_code} {response.text}"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        original_text = request.form["original_text"]
        target_language = request.form["target_language"]
        translated_text = translate_text(original_text, target_language)
        return render_template("index1.html", original_text=original_text, translated_text=translated_text, target_language=target_language)
    else:
        return render_template("index1.html", original_text="", translated_text="", target_language="hi-IN")

if __name__ == "__main__":
    app.run(debug=True)