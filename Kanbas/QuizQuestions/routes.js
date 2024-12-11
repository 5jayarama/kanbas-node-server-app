import * as questionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  // get all questions
  app.get("/api/questions", async (req, res) => {
    const questions = await questionsDao.findAllQuestions();
    res.json(questions);
  });

  // get questions related to a quiz
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionsDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  // create question
  app.post("/api/questions", async (req, res) => {
    const question = req.body;
    const createdQuestion = await questionsDao.createQuestion(question);
    res.status(201).json(createdQuestion);
  });

  // update question
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const updates = req.body;
    const status = await questionsDao.updateQuestion(questionId, updates);
    if (status.modifiedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  // delete question
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionsDao.deleteQuestion(questionId);
    if (status.deletedCount === 1) {
      res.json({ message: `Question ${questionId} has been deleted.` });
    } else {
      res.sendStatus(404);
    }
  });
}
