import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const data = await request.json();

    // Log or process the data (e.g., save to a database)
    console.log("Received data:", data);

    const { text, target_language_code } = data;

    // Prepare the options for the axios request
    const options = {
      method: "POST",
      url: "https://api.sarvam.ai/text-to-speech",
      headers: {
        "api-subscription-key": "b6e62ec5-4a76-4b0f-8922-fe2a9b23af4f", // Your API key
        "Content-Type": "application/json",
      },
      data: {
        inputs: [text], // Passing the text input from the request body
        target_language_code: target_language_code || "hi-IN",
        speaker: "meera",
        pitch: 0,
        pace: 1.65,
        loudness: 1.5,
        speech_sample_rate: 22050,
        enable_preprocessing: true,
        model: "bulbul:v1", // Default to 'hi-IN' if no language is provided
      },
    };

    // // Make the request to the Sarvam API
    let response = await axios(options);
    console.log("response", response.data.audios[0]);

    if (response.status === 200) {
      console.log("Audio generated successfully:", response.data.audios[0]);

      const audioData = response.data.audios[0]; // Get audio data

      return NextResponse.json(
        {
          message: "Audio generated successfully",
          audio: audioData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to convert text to speech" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error processing data:", error);
    return NextResponse.json(
      { message: "Error processing data", error: error.message },
      { status: 500 }
    );
  }
}
