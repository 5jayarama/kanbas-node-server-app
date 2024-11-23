import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {

    // Retrieve all assignments for a specific course
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = Database.assignments.filter((a) => a.course === courseId);
        res.send(assignments);
    });

    // Create a new assignment for a specific course
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;

        const newAssignment = {
            ...req.body,
            course: courseId,
            _id: new Date().getTime().toString(), // Generate a unique ID based on timestamp
        };

        Database.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // Update an existing assignment by ID
    app.put("/api/assignments/:assignId", (req, res) => {
        const { assignId } = req.params;
        const assignmentUpdates = req.body;

        console.log("Updating assignment with data:", assignmentUpdates);

        const assignIndex = Database.assignments.findIndex((a) => a._id === assignId);

        if (assignIndex === -1) {
            return res.status(404).send({ error: "Assignment not found" });
        }

        const assignment = Database.assignments[assignIndex];
        Object.assign(assignment, assignmentUpdates); // Merge updates into the existing assignment
        res.send(assignment);
    });

    // Delete an assignment by ID
    app.delete("/api/assignments/:assignId", (req, res) => {
        const { assignId } = req.params;

        Database.assignments = Database.assignments.filter((a) => a._id !== assignId);
        console.log("Remaining assignments:", Database.assignments);

        res.sendStatus(204); // No content
    });

    // Retrieve a specific assignment by course ID and assignment ID
    app.get("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
        const { courseId, assignmentId } = req.params;

        const assignment = Database.assignments.find(
            (a) => a._id === assignmentId && a.course === courseId
        );

        if (!assignment) {
            return res.status(404).send({ error: "Assignment not found" });
        }

        res.send(assignment);
    });
}
