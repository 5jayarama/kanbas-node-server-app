import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.send(assignments);
    } catch (error) {
      console.error("Error fetching assignments for course:", error);
      res.status(500).json({ error: "Failed to fetch assignments for the course." });
    }
  });

  // Create a new assignment for a specific course
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = { ...req.body, course: courseId }; // Ensure the course ID is added to the assignment
      const newAssignment = await dao.createAssignment(assignment);
      res.status(201).send(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Failed to create assignment." });
    }
  });

  app.put("/api/courses/:courseId/assignments/:assignmentId", async (req, res) => {
    try {
        const { courseId, assignmentId } = req.params;
        const assignmentUpdates = req.body;
        if (!assignmentUpdates || typeof assignmentUpdates !== "object") {
            return res.status(400).json({ error: "Invalid assignment updates." });
        }
        const status = await dao.updateAssignment(assignmentId, assignmentUpdates);

        if (!status.modifiedCount) {
            return res.status(404).json({ error: `Assignment with ID ${assignmentId} not found.` });
        }
        console.info(`Assignment with ID ${assignmentId} for course ${courseId} updated successfully.`);
        res.status(200).json({ success: true, message: "Assignment updated successfully." });
    } catch (error) {
        console.error("Error updating assignment:", error);
        res.status(500).json({ error: "Failed to update assignment." });
    }
});

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const status = await dao.deleteAssignment(assignmentId);
      if (!status.deletedCount) {
        return res.status(404).json({ error: `Assignment with ID ${assignmentId} not found.` });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: "Failed to delete assignment." });
    }
  });

  // Get a specific assignment by ID for a specific course
  app.get("/api/courses/:courseId/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await dao.findAssignmentById(assignmentId);
      if (!assignment || assignment.course !== req.params.courseId) {
        return res.status(404).json({ error: `Assignment with ID ${assignmentId} not found in course ${req.params.courseId}.` });
      }
      res.send(assignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ error: "Failed to fetch the assignment." });
    }
  });
}
