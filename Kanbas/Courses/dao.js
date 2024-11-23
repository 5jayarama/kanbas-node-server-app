import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;

  // Check if the course exists
  const courseExists = courses.some((course) => course._id === courseId);
  if (!courseExists) {
    throw new Error(`Course with ID ${courseId} not found.`);
  }

  // Filter out the course and its enrollments
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );

  return { success: true, message: `Course ${courseId} deleted successfully.` };
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;

  // Ensure the user has enrollments
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );

  if (enrolledCourses.length === 0) {
    throw new Error(`No enrolled courses found for user ${userId}.`);
  }

  return enrolledCourses;
}

export function createCourse(course) {
  const newCourse = { ...course, _id: Date.now().toString() };

  // Add the new course to the database
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;

  // Find the course
  const course = courses.find((course) => course._id === courseId);
  if (!course) {
    throw new Error(`Course with ID ${courseId} not found.`);
  }

  // Update the course
  const updatedCourse = { ...course, ...courseUpdates };
  Database.courses = courses.map((c) =>
    c._id === courseId ? updatedCourse : c
  );

  return updatedCourse;
}
