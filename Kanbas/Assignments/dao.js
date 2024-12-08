import Database from "../Database/index.js";
import model from "./model.js";

export function findAllAssignments() {
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
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}
export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}
export function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
}