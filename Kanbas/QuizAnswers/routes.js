import * as answersDao from "./dao.js";

export default function AnswerRoutes(app) {
    // Get answers by quiz
    app.get("/api/quizzes/:quizId/answers", async (req, res) => {
        const { quizId } = req.params;
        const answers = await answersDao.findAnswersForQuiz(quizId);
        res.send(answers);
    });

    // Create a new answer for a quiz
    app.post("/api/quizzes/:quizId/answers", async (req, res) => {
        const { quizId } = req.params;
        const newAnswer = req.body;
        const status = await answersDao.createAnswer(quizId, newAnswer);
        res.send(status);
    });

    // Get a specific answer by its ID
    app.get("/api/answers/:answerId", async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const status = await answersDao.updateQuestion(questionId, questionUpdates);
        res.send(status);
    });

    // Update a user's answer for a quiz
    app.put("/api/quizzes/:quizId/user/:userId/answers/update", async (req, res) => {
        const { quizId, userId } = req.params;
        console.log(req.body);
        const { updateAnswer } = req.body;
        console.log(updateAnswer);
        const status = await answersDao.updateAnswer(quizId, userId, updateAnswer);
        res.send(status);
    });

    // Mark a user's quiz attempt as finished
    app.put("/api/quizzes/:quizId/user/:userId/answers/finished", async (req, res) => {
        const { quizId, userId } = req.params;
        const status = await answersDao.addAttempt(quizId, userId);
        res.send(status);
    });

    // Add or update an answer for a specific question in a quiz
    app.put("/api/quizzes/:quizId/user/:userId/answer", async (req, res) => {
        const { quizId, userId } = req.params;
        const { questionId, updateAnswer } = req.body;
        const status = await answersDao.addAnswerToMap(quizId, userId, questionId, updateAnswer);
        res.send(status);
    });

    // Get a user's answers for a specific quiz
    app.get("/api/quizzes/:quizId/user/:userId/answers", async (req, res) => {
        const { quizId, userId } = req.params;
        const answers = await answersDao.findAnswersForUser(quizId, userId);
        res.send(answers);
    });

    // Create a new quiz attempt for a user
    app.post("/api/quizzes/:quizId/user/:userId/answers", async (req, res) => {
        const { quizId, userId } = req.params;
        const status = await answersDao.newAttempt(quizId, userId);
        res.send(status);
    });
}
