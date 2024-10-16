const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck"); // Import the roleCheck middleware

const router = express.Router();

// Create a new task
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignee } =
      req.body;

    console.log(assignee);
    const assigneeUser = await User.findOne({
      email: "ketaki241999@gmail.com",
    });
    console.log(assigneeUser);
    if (!assigneeUser) {
      return res.status(400).json({ message: "Assignee not found" });
    }
    // Create a new task with the assignees array and the user who created it
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      assignees: [assigneeUser._id], // Use the ObjectId for the assignees array
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Populate the 'assignees' field to get user data (like email and username)
    const tasks = await Task.find().populate("assignees", "email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Update a task
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete a task
router.delete("/delete/:id", authMiddleware, roleCheck(["admin"]), async (req, res) => {
    try {
      console.log(req.params)
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  });
  

module.exports = router;
