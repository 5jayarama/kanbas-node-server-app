import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  // Get enrollments for a specific user
  app.get("/api/enrollments/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments for user:", error);
      res.status(500).json({ error: "Failed to fetch enrollments for user" });
    }
  });

  // Remove an enrollment (unenroll a user from a course)
  app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.status(204).json(status);
    } catch (error) {
      console.error("Error unenrolling user from course:", error);
      res.status(500).json({ error: "Failed to unenroll user from course" });
    }
  });

  // Get all enrollments
  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await enrollmentsDao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching all enrollments:", error);
      res.status(500).json({ error: "Failed to fetch all enrollments" });
    }
  });

  // Add a new enrollment (enroll a user in a course)
  app.post("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error enrolling user in course:", error);
      res.status(500).json({ error: "Failed to enroll user in course" });
    }
  });
}
