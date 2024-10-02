import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Course from "@/app/mongo/model/Course";

export async function GET(request) {
  try {
    mongoose.connect("mongodb+srv://CourseCreator:khOJyuy6rSdQGgrw@cluster0.8rvtn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const db = mongoose.connection;
    const projectsCollection = db.collection('projects');
    
    const _id = await request.json();

    console.log("Received data:", _id);

    const course = await Course.findById(_id);
    console.log("Course data:", course);

    return NextResponse.json(
      { message: "Search Successful", course: course },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Searching", error);
    return NextResponse.json(
      { message: "Error Searching", error: error.message },
      { status: 500 }
    );
  }
}
