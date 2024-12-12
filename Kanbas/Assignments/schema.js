import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    points: Number,
    availableDate: String,
    dueDate: String,
    availableUntilDate: String,
  },
  { collection: "assignments" }
);
export default schema;