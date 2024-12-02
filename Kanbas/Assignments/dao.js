import Database from "../Database/index.js";

// Retrieve all assignments for a specific course
export function findAssignmentsByCourse(courseId) {
    return Database.assignments.filter((assignment) => assignment.course === courseId);
}

// Create a new assignment for a specific course
export function createAssignment(courseId, assignmentData) {
    const newAssignment = {
        ...assignmentData,
        course: courseId,
        _id: Date.now().toString(), // Generate a unique ID based on the timestamp
    };
    Database.assignments.push(newAssignment);
    return newAssignment;
}

// Update an existing assignment by ID
export function updateAssignment(assignId, assignmentUpdates) {
    const assignIndex = Database.assignments.findIndex((assignment) => assignment._id === assignId);

    if (assignIndex === -1) {
        throw new Error(`Assignment with ID ${assignId} not found.`);
    }

    const assignment = Database.assignments[assignIndex];
    Object.assign(assignment, assignmentUpdates); // Merge updates into the existing assignment
    return assignment;
}

// Delete an assignment by ID
export function deleteAssignment(assignId) {
    const assignmentsBefore = Database.assignments.length;
    Database.assignments = Database.assignments.filter((assignment) => assignment._id !== assignId);

    if (Database.assignments.length === assignmentsBefore) {
        throw new Error(`Assignment with ID ${assignId} not found.`);
    }

    return { success: true, message: `Assignment with ID ${assignId} deleted successfully.` };
}

// Retrieve a specific assignment by course ID and assignment ID
export function findAssignmentById(courseId, assignmentId) {
    const assignment = Database.assignments.find(
        (assignment) => assignment._id === assignmentId && assignment.course === courseId
    );

    if (!assignment) {
        throw new Error(`Assignment with ID ${assignmentId} not found for course ${courseId}.`);
    }

    return assignment;
}
