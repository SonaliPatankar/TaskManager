const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck"); // Import the roleCheck middleware

const router = express.Router();

// Create a new task
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignees } = req.body;

    console.log(assignees)
    // Find users based on their emails (or other identifier) to get their IDs
    // const assigneeUsers = await User.find({ email: { $in: assignees } });
    // if (assigneeUsers.length === 0) {
    //   return res.status(400).json({ message: "No valid assignees found" });
    // }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      assignees: assignees.map(user => user), // Use the ObjectIds of assignees
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
    const userId = req.user; // assuming req.user contains the user ID after auth middleware
    const user = await User.findById(userId);

    let tasks;
    if (user.role === "admin") {
      // Admin sees all tasks
      tasks = await Task.find().populate("assignees", "email");
    } else {
      // Regular user sees only their assigned tasks
      tasks = await Task.find({ assignees: userId }).populate("assignees", "email");
    }
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
  
  router.get('/:id', authMiddleware, async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId).populate('assignees', 'email');
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error fetching task details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
