import model from "./model.js";

export function findAllAssignments() {
  // Fetch all assignments from the database
  return model.find();
}

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createAssignment(assignment) {
  delete assignment._id;
  return model.create(assignment);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  if (!assignmentId || !assignmentUpdates || typeof assignmentUpdates !== "object") {
      throw new Error("Invalid arguments: assignmentId and assignmentUpdates are required.");
  }
  return model.updateOne(
      { _id: assignmentId }, // Match the assignment by its unique ID
      { $set: assignmentUpdates }
  );
}

export function deleteAssignment(assignmentId) {
  // Delete an assignment by ID
  return model.deleteOne({ _id: assignmentId });
}

export function findAssignmentById(assignmentId) {
  // Fetch a specific assignment by ID
  return model.findById(assignmentId);
}
