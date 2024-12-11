import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
    description: { type: String, default: "" },
    type: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    point: { type: Number, default: 100 },
    status: { type: String, enum: ["Published", "Unpublished"], default: "Unpublished" },
    assignmentGroup: { type: String, enum: ["Quizzes", "Exams", "Assignments", "Project"], default: "Quizzes" },
    shuffleAnswer: { type: String, enum: ["Yes", "No"], default: "Yes" },
    timeLimit: { type: Number, default: 20 }, // in minutes
    multipleAttempts: { type: String, enum: ["Yes", "No"], default: "No" },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, enum: ["Immediately", "After Deadline", "Never"], default: "Immediately" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: String, enum: ["Yes", "No"], default: "Yes" },
    webcamRequired: { type: String, enum: ["Yes", "No"], default: "No" },
    lockQuestionsAfterAnswering: { type: String, enum: ["Yes", "No"], default: "No" },
    dueDate: { type: Date, required: true },
    availableDate: { type: Date, required: true },
    untilDate: { type: Date, required: true }
  },
  { collection: "quizzes", timestamps: true }
);

export default schema;