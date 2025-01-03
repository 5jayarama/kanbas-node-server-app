import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        enrollmentsDao.addEnrollment(userId, courseId);
        res.status(201).end();
    });
    app.delete("/api/enrollments/:enrollmentId", (req, res) => {
        const { enrollmentId } = req.params;
        enrollmentsDao.removeEnrollment(enrollmentId);
        res.status(204).end();
    });
    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.getAllEnrollments();
        res.json(enrollments);
    });
}
