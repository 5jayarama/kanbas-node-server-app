import model from "./model.js";

export function findAllAssignments() {
  // Fetch all assignments from the database
  return model.find();
}

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export async function createAssignment(assignment) {
    if (!assignment._id) {
      assignment._id = new mongoose.Types.ObjectId().toString(); // Generate a unique string ID if none is provided
    }
    return await model.create(assignment);
  }

export function updateAssignment(assignmentId, assignmentUpdates) {
  // Update an existing assignment by ID
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
