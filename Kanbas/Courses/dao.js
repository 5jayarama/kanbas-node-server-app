import Database from "../Database/index.js";

export function findAllCourses() {
    return Database.courses || [];
}

export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;

    if (!courses.some((course) => course._id === courseId)) {
        throw new Error(`Course with ID ${courseId} not found.`);
    }

    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
    );

    return { success: true, message: `Course ${courseId} deleted successfully.` };
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    return courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)
    );
}

export function createCourse(course) {
    const newCourse = { ...course, _id: Date.now().toString() };
    Database.courses = [...Database.courses, newCourse];
    return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const courseIndex = courses.findIndex((course) => course._id === courseId);

    if (courseIndex === -1) {
        throw new Error(`Course with ID ${courseId} not found.`);
    }

    Database.courses[courseIndex] = { ...courses[courseIndex], ...courseUpdates };
    return Database.courses[courseIndex];
}
