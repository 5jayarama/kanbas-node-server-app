import Database from "../Database/index.js";
import model from "./model.js";

export function findAllAssignments() {
  return model.find(); // Fetch all assignments
}
export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId }); // Match `course` by string (e.g., "RS101")
}
export function createAssignment(assignment) {
  if (!assignment._id) {
    throw new Error("Assignment must have a valid `_id` (e.g., 'A101')");
  }
  return model.create(assignment);
}
export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne(
    { _id: assignmentId }, // Match by string `_id`
    { $set: assignmentUpdates }
  );
}
export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId }); // Match by string `_id`
}
export function findAssignmentById(assignmentId) {
  return model.findById(assignmentId); // Fetch assignment by string `_id`
}