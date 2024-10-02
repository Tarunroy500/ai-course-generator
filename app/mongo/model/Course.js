import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  descriptions: { type: String, default: "" },
  type: { type: Number, default: 0 },
  language: { type: String, required: true },
  duration: { type: Number, required: true },
  identifier: { type: String, required: true },
  difficulty: { type: String, required: true },
  text_provider: { type: String, required: true },
  image_provider: { type: String, required: true },
  course_content: { type: String, required: true },
  images: { type: [String], default: [] },
  logs: { type: [String], default: [] },
  chat: { type: [String], default: [] }
});

// Check if the model is already compiled
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;

