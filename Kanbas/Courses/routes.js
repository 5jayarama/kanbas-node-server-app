import * as coursesDao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
    // Create a new module for a course
    app.post("/api/courses/:courseId/modules", (req, res) => {
        try {
            const { courseId } = req.params;
            const module = { ...req.body, course: courseId };
            const newModule = modulesDao.createModule(module);
            res.status(201).json(newModule);
        } catch (error) {
            console.error("Error creating module:", error);
            res.status(500).json({ error: "Failed to create module" });
        }
    });

    // Get modules for a specific course
    app.get("/api/courses/:courseId/modules", (req, res) => {
        try {
            const { courseId } = req.params;
            const modules = modulesDao.findModulesForCourse(courseId);
            if (!modules || modules.length === 0) {
                return res.status(404).json({ error: `No modules found for course ID ${courseId}` });
            }
            res.json(modules);
        } catch (error) {
            console.error("Error fetching modules:", error);
            res.status(500).json({ error: "Failed to fetch modules" });
        }
    });

    // Get all courses
    app.get("/api/courses", async (req, res) => {
        try {
            const courses = await coursesDao.findAllCourses();
            res.json(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
            res.status(500).json({ error: "Failed to fetch courses" });
        }
    });

    // Delete a course
    app.delete("/api/courses/:courseId", (req, res) => {
        try {
            const { courseId } = req.params;
            const status = coursesDao.deleteCourse(courseId);
            res.status(200).json(status);
        } catch (error) {
            console.error("Error deleting course:", error);
            res.status(404).json({ error: `Course with ID ${courseId} not found` });
        }
    });

    // Update a course
    app.put("/api/courses/:courseId", (req, res) => {
        try {
            const { courseId } = req.params;
            const courseUpdates = req.body;
            const updatedCourse = coursesDao.updateCourse(courseId, courseUpdates);
            res.status(200).json(updatedCourse);
        } catch (error) {
            console.error("Error updating course:", error);
            res.status(404).json({ error: `Course with ID ${courseId} not found` });
        }
    });
}
