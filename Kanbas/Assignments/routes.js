import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get all assignments
  app.get("/api/assignments", async (req, res) => {
    try {
      const assignments = await dao.findAllAssignments();
      res.send(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments." });
    }
  });

  // Create a new assignment
  app.post("/api/assignments", async (req, res) => {
    try {
      const assignment = req.body;
      const newAssignment = await dao.createAssignment(assignment);
      res.status(201).send(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Failed to create assignment." });
    }
  });

  // Update an assignment by ID
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
      if (!status.modifiedCount) {
        return res.status(404).json({ error: `Assignment with ID ${assignmentId} not found.` });
      }
      res.status(200).send({ success: true });
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: "Failed to update assignment." });
    }
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await dao.deleteAssignment(assignmentId);
      if (status.deletedCount === 0) {
        return res.status(404).json({ error: `Assignment with ID ${assignmentId} not found.` });
      }
      res.status(200).send({ success: true });
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: "Failed to delete assignment." });
    }
  });

  // Get a specific assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await dao.findAssignmentById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ error: `Assignment with ID ${assignmentId} not found.` });
      }
      res.send(assignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ error: "Failed to fetch the assignment." });
    }
  });
}
