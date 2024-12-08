import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    points: Number,
    dueDate: Date,
    availableDate: Date,
    availableUntilDate: Date,
  },
  { collection: "assignments" }
);
export default schema;