import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    avail_date : Date,
    avail_time : String,
    due_date : Date,
    due_time : String,
    pts : Number,
    desc : String,
  },
  { collection: "assignments" }
);
export default schema;