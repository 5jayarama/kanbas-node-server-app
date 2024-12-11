import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        attempt: Number,
        score: Number,
        answers: [
            {
              questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
              answer: { type: String, required: true },
              isCorrect: { type: Boolean, required: true },
              pointsEarned: { type: Number, required: true },
            },
        ],
        finished: Boolean,
        date: { type: Date, default: Date.now }
    },
    { collection: "answers" }
);
export default schema;