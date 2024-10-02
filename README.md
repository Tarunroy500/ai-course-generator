# AI Course Generator

![image](public/icon.png)

## Overview

The AI Course Generator is a web application designed to create personalized learning paths using AI. It leverages various AI models to generate course content, including text and images, and provides functionalities for speech-to-text and text-to-speech conversions. The application is built using a combination of Python, Flask, and Next.js, and integrates with MongoDB for data storage.



## Features

- **Course Generation**: Generate personalized courses based on user input.
- **Speech-to-Text**: Convert audio files to text using the Sarvam API.
- **Text-to-Speech**: Convert text to speech in various languages using the Sarvam API.
- **Chat System**: Interactive chat system for course content generation.
- **Image Generation**: Generate images based on text prompts.
- **Translation**: Translate text into different languages.

## Project Structure

### Backend

- **Flask**: Used for handling API requests and rendering templates.
- **MongoDB**: Used for storing course data, logs, and chat messages.
- **Sarvam API**: Used for speech-to-text and text-to-speech functionalities.
- **Google Vertex AI**: Used for generating text and images.
- **Groq**: Used for generating text.

### Frontend

- **Next.js**: Used for building the user interface.
- **Tailwind CSS**: Used for styling the application.
- **React**: Used for building interactive components.

## Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Tarunroy500/ai-course-generator.git
    cd ai-course-generator
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables for API keys and MongoDB connection string.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the required Node.js packages:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```


### Running the Frontend

1. Start the Next.js development server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Speech-to-Text

- **Description**: Converts audio files to text using the Sarvam API.


### Text-to-Speech

- **Description**: Converts text to speech using the Sarvam API.


### Course Generation

- **Description**: Generates course content based on user input.

## Frontend Components

### Hero Component

- **Description**: Displays the main hero section of the landing page.


### Dashboard

- **Description**: Main dashboard for creating and managing courses.


### ChatBot

- **Description**: Interactive chat system for course content generation.


## Configuration

### Tailwind CSS

- **Configuration File**: `tailwind.config.js`
- **CSS File**: `app/globals.css`


### Environment Variables

- **MongoDB Connection String**: Set the connection string for MongoDB in your environment variables.
- **Sarvam API Key**: Set the API key for Sarvam in your environment variables.
- **Google Cloud Project ID**: Set the Google Cloud Project ID in your environment variables.
- **Groq API Key**: Set the Groq API key in your environment variables.

## Dependencies

### Python Packages

- `requests`
- `playsound`
- `Flask==2.0.2`
- `groq`
- `markdown`
- `html_to_json`
- `vertexai`

### Node.js Packages

- `@clerk/nextjs`
- `@radix-ui/react-dialog`
- `@radix-ui/react-icons`
- `@radix-ui/react-select`
- `@radix-ui/react-slot`
- `axios`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `mongodb`
- `next`
- `react`
- `react-dom`
- `react-icons`
- `react-toastify`
- `tailwind-merge`
- `tailwindcss-animate`

## Backend Code Details

### `script.py`

This script handles the main course generation logic, including connecting to MongoDB, generating prompts, and saving course content.


### `google_model.py`

This script initializes and uses Google Vertex AI models for generating text and images.

### `groq_model.py`

This script initializes and uses Groq models for generating text.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to the developers of the Sarvam API for providing the speech-to-text and text-to-speech functionalities.
- Thanks to the contributors of the various open-source libraries used in this project.

## Contact

For any inquiries or support, please contact [tarunroy500@gmail.com, adityaraj.anshukumar50@gmail.com, vsurajk7@gmail.com, utkarshanandani9@gmail.com].