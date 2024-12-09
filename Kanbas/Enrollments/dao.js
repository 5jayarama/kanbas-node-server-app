import Database from "../Database/index.js";
import model from "./model.js";
export function deleteEnrollment(enrollmentId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment._id !== enrollmentId
    );
}
export async function findAllEnrollments() {
    const enrollments = await model.find();
    return enrollments;
}
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    const validEnrollments = enrollments.filter(enrollment => enrollment.course !== null);
    
    return validEnrollments.map(enrollment => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}