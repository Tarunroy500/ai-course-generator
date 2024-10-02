import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Course from "@/app/mongo/model/Course";

export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const data = await request.json();
    console.log("Received data:", data._id);
    const id = String(data._id);

    if (!data._id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const course = await Course.findById(id);
    console.log(course);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    console.log("Course data:", course);

    return NextResponse.json(
      { message: "Search Successful", course: course },
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