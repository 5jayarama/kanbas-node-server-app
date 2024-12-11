import * as quizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  // get all quizzes
  app.get("/api/quizzes", async (req, res) => {
    const quizzes = await quizzesDao.findAllQuizzes();
    res.json(quizzes);
  });

  // get all quizzes for a specific course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await quizzesDao.findQuizzesByCourse(courseId);
    res.json(quizzes);
  });

  // Creates a new quiz
  app.post("/api/quizzes", async (req, res) => {
    const newQuiz = req.body;
    const createdQuiz = await quizzesDao.createQuiz(newQuiz);
    res.status(201).json({
      message: `Quiz: "${createdQuiz.title}" has been created`,
      quiz: createdQuiz,
    });
  });

  // Updates an existing quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    if (status.modifiedCount === 1) {
      res.status(200).json({ message: `Quiz "${quizId}" updated!` });
    } else {
      res.status(404).json({ message: `Quiz "${quizId}" can not found` });
    }
  });

  // Deletes a quiz by its ID
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: `Quiz ${quizId} not found` });
    }
    const status = await quizzesDao.deleteQuiz(quizId);
    if (status.deletedCount === 1) {
      res.status(200).json({ message: `Quiz: "${quiz.title}" deleted` });
    } else {
      res.status(500).json({ message: `Error delete Quiz ${quizId}` });
    }
  });

  // Fetches a specific quiz by its ID
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);
    if (quiz) {
      res.json(quiz);
    } else {
      res.sendStatus(404);
    }
  });
}
