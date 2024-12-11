import { findQuestionsForQuiz } from "../Questions/dao.js";
import model from "./model.js";
import quizModel from "../Quizzes/model.js";

// Find all finished answers for a specific quiz
export async function findAnswersForQuiz(quizId) {
  return model.find({ quiz: quizId, finished: true });
}

// Find a user's answer for a specific quiz
export async function findAnswersForUser(quizId, userId) {
  return model.findOne({ quiz: quizId, user: userId });
}

// Create a new answer for a quiz
export async function createAnswer(quizId, answer) {
  return model.create({ quizId, attempt: 1, finished: false, ...answer });
}

// Delete an answer by its ID
export async function deleteAnswer(answerId) {
  return model.deleteOne({ _id: answerId });
}

// Add or update an answer for a specific question
export async function addAnswerToMap(quizId, userId, questionId, newAnswer) {
  const answer = await model.findOne({ quiz: quizId, user: userId });
  if (answer) {
    answer.answers.set(questionId, newAnswer);
    return answer.save();
  }
  return model.create({
    quiz: quizId,
    user: userId,
    attempt: 1,
    answers: { [questionId]: newAnswer },
    finished: false,
  });
}

// Increment the attempt count and calculate the score
export async function addAttempt(quizId, userId) {
  const answer = await model.findOne({ quiz: quizId, user: userId });
  if (answer) {
    answer.attempt++;
    answer.finished = true;
    answer.score = 0;

    const questions = await findQuestionsForQuiz(quizId);
    questions.forEach((question) => {
      const userAnswer = answer.answers.get(question._id);
      if (
        (question.type === "Fill-in-the-Blank" && question.choices.includes(userAnswer)) ||
        (question.answer === userAnswer)
      ) {
        answer.score += question.points;
      }
    });
    return answer.save();
  }
  return false;
}

// Start a new attempt for a quiz
export async function newAttempt(quizId, userId) {
  const quiz = await quizModel.findById(quizId);
  const answer = await model.findOne({ quiz: quizId, user: userId });

  const withinDateRange =
    new Date(quiz.until) > new Date() &&
    new Date(quiz.available) < new Date() &&
    new Date(quiz.due) > new Date();

  if (answer) {
    if ((quiz.number_of_attempts > answer.attempt || quiz.number_of_attempts === 0) && withinDateRange) {
      answer.answers = {};
      answer.finished = false;
      return answer.save();
    }
    return false;
  }

  return model.create({
    quiz: quizId,
    user: userId,
    attempt: 1,
    answers: {},
    finished: false,
  });
}

// Update an existing answer
export async function updateAnswer(quizId, userId, newAnswer) {
  return model.updateOne({ quiz: quizId, user: userId }, { $set: newAnswer });
}
