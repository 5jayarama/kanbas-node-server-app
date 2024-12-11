import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    type: { type: String, enum: ["True/False", "Multiple Choice", "Fill in the Blank"], required: true },
    title: { type: String, required: true },
    points: { type: Number, required: true },
    description: { type: String },
    options: [{ text: String, isCorrect: Boolean }], // multiple choice
    correctAnswers: { type: [String], default: [], }, // fill the blanks
    correctAnswer: Boolean, //true or false
  },
  { collection: "questions" }
);

export default questionSchema;