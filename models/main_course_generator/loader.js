const { spawn } = require('child_process');

function getResponseFromAPI(data) {
    const pythonScriptPath = 'models/main_course_generator/script.py';
    
    // Ensure all values are properly assigned and avoid null values using the `||` operator
    let content = data.details?.title || '';
    let descriptions = data.details?.descriptions || '';
    let type = data.details?.type || 0;
    let language = data.details?.language || "English";
    let duration = data.details?.duration || 1;
    let identifier = data.details?.identifier || "Weeks";
    let difficulty = data.details?.difficulty || "Beginner";

    // Construct the arguments array for the Python script
    const pythonArgs = [
        pythonScriptPath,  // The path to the Python script
        content,
        descriptions,
        type.toString(),  // Convert numbers to strings to ensure they are passed correctly
        language,
        duration.toString(),  // Convert numbers to strings to ensure they are passed correctly
        identifier,
        difficulty
    ];

    // Spawn the Python process with arguments
    const pythonProcess = spawn('python', pythonArgs);

    // Capture data output from the script
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Output: ${data}`);
    });

    // Capture any errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Capture the script's exit event
    pythonProcess.on('close', (code) => {
        console.log(`Python script finished with code: ${code}`);
    });
}

exports.getResponseFromAPI = getResponseFromAPI;
