import mongoose from 'mongoose';

// Define the course schema
const courseSchema = new Schema({
  user_id: {
    type: String,
    default: "", // Default value for an empty user_id field
  },
  content: {
    type: String,
    required: true, // Make it required if course content is mandatory
  },
  descriptions: {
    type: String,
    default: "", // Optional field with default value
  },
  type: {
    type: Number,
    required: true, // Assuming type is mandatory, e.g., 0 for free, 1 for paid, etc.
  },
  language: {
    type: String,
    default: "English", // Default to English if not specified
  },
  duration: {
    type: Number,
    required: true, // Duration in the unit specified by `identifier`
  },
  identifier: {
    type: String,
    default: "Days", // Default to "Days" as the time unit identifier
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // Define allowed difficulty levels
    default: "Beginner", // Default value
  },
  text_provider: {
    type: String,
    required: true, // Name of the text provider, e.g., "groq"
  },
  image_provider: {
    type: String,
    required: true, // Name of the image provider, e.g., "google"
  },
  course_content: {
    type: String,
    required: true, // Course content in markdown format or similar
  },
  images: {
    type: [String], // Array of image URLs or paths, empty by default
    default: [],
  },
  logs: {
    type: [String], // Array of log entries, empty by default
    default: [],
  },
  chat: {
    type: [String], // Array to store chat history, empty by default
    default: [],
  },
}, { timestamps: true }); // Add timestamps to track created and updated times

// Create the Course model

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema) ;

module.exports = Course;
