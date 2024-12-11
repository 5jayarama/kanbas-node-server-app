import model from "./model.js";
export function findAllQuestions() {
    return model.find();
}
export function findQuizzesForCourse(C) {
  return model.find();
}
export function findQuestionsForQuiz(quizId) {
  return model.find({ quiz: quizId });
}
export function createQuestion(question) {
  return model.create(question);
}
export function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, questionUpdates);
}
export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}
