const { spawn } = require('child_process');

function getResponseFromAPI(data) {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = 'models/main_course_generator/script.py';
        
        // Ensure all values are properly assigned and avoid null values using the `||` operator
        let userID = data.details?.id || '';
        let content = data.details?.title || '';
        let descriptions = data.details?.descriptions || '';
        let type = data.details?.type || 0;
        let language = data.details?.language || "English";
        let duration = data.details?.duration || 1;
        let identifier = data.details?.identifier || "Days";
        let difficulty = data.details?.difficulty || "Beginner";
        let text_provider = data.details?.text_provider || "groq";
        let image_provider = data.details?.image_provider || "google";
        let target_language = data.details?.target_language || "English";

        // Construct the arguments array for the Python script
        const pythonArgs = [
            pythonScriptPath,  // The path to the Python script
            userID,
            content,
            descriptions,
            type.toString(),  // Convert numbers to strings to ensure they are passed correctly
            language,
            duration.toString(),  // Convert numbers to strings to ensure they are passed correctly
            identifier,
            difficulty,
            text_provider,
            image_provider,
            target_language
        ];

        // Spawn the Python process with arguments
        const pythonProcess = spawn('python', pythonArgs);

        let output = '';
        let errorOutput = '';

        // Capture data output from the script
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Capture any errors
        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        // Capture the script's exit event
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new Error(`Python script finished with code: ${code}\n${errorOutput}`));
            }
        });
    });
}

exports.getResponseFromAPI = getResponseFromAPI;
