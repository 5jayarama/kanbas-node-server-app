import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
 };
const deleteUser = (req, res) => {
    const userId = req.params.userId;
    dao.deleteUser(userId);
    res.sendStatus(204);
 };
const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
};
const findUserById = (req, res) => {
    const userId = req.params.userId;
    const user = dao.findUserById(userId);
    res.json(user);
 };

    const updateUser = (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.updateUser(userId, userUpdates);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signup = (req, res) => {
        const user = dao.findUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json({ message: "Username already in use" });
        }
        const currentUser = dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signin = (req, res) => {
        const { username, password } = req.body;
        const currentUser = dao.findUserByCredentials(username, password);
        if (!currentUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signout = (req, res) => {
        req.session["currentUser"] = null;
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = (req, res) => {
      // Check if a session exists and has a "currentUser"
      const currentUser = req.session?.currentUser;
      if (!currentUser) {
          return res.status(401).json({ message: "Unauthorized: No user logged in" });
      }
      // Return the current user
      res.json(currentUser);
  };
  

const findCoursesForEnrolledUser = async (req, res) => {
    try {
        let { userId } = req.params; // Extract `userId` from URL

        // Handle 'current' as a special case
        if (userId === "current") {
            const currentUser = req.session?.currentUser; // Check session
            if (!currentUser) {
                return res.status(401).json({ message: "Unauthorized: No user logged in" });
            }
            userId = currentUser._id; // Use the logged-in user's ID
        }

        // Fetch courses for the given `userId`
        const courses = await courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };

    app.post("/api/users/current/courses", createCourse);
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}
