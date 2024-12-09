import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    _id: String, // Explicitly define `_id` as a string to match "RS101"
    name: String,
    number: String,
    credits: Number,
    description: String,
    startDate: Date, // Include these fields if they're part of the course data
    endDate: Date,
    department: String,
  },
  { collection: "courses" }
);

export default courseSchema;
