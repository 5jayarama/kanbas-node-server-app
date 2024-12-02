import Database from "../Database/index.js";

export function addEnrollment(userId, courseId) {
    const { enrollments } = Database;
    const newEnrollment = {
        _id: Date.now().toString(),
        user: userId,
        course: courseId,
    };
    enrollments.push(newEnrollment);
}
export function removeEnrollment(enrollmentId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment._id !== enrollmentId
    );
}
export function getAllEnrollments() {
    return Database.enrollments;
}