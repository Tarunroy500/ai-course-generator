import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Course from "@/app/mongo/model/Course";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    // await mongoose.connect(process.env.MONGODB_URI);
    await client.connect();
    const database = client.db("course_database")
    const collection = database.collection("projects")

    const data = await request.json();
    console.log("Received data:", data._id);

    if (!data._id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const course = await collection.findOne({_id: new ObjectId(data._id)})
    console.log(course);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    console.log("Course data:", course.course_content);

    return NextResponse.json(
      { message: "Search Successful", course: course.course_content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Searching:", error);
    return NextResponse.json(
      { message: "Error Searching", error: error.message },
      { status: 500 }
    );
  }
}