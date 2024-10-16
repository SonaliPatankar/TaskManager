import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/slices/tasksSlice";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Tasks.css"; // Custom CSS file for additional styling

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  const [editTask, setEditTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending", // Default status set to Pending
    assignee: "",
  });
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("None");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (taskStatus === "idle") {
      dispatch(fetchTasks(token));
    }
  }, [taskStatus, dispatch]);

  const applyFiltersAndSorting = () => {
    let updatedTasks = [...tasks];

    if (filterStatus !== "All") {
      updatedTasks = updatedTasks.filter(
        (task) => task.status === filterStatus
      );
    }

    if (sortOption === "Priority") {
      updatedTasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (sortOption === "Due Date") {
      updatedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    return updatedTasks;
  };

  const filteredTasks = applyFiltersAndSorting();

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const taskData = { ...newTask, assignee: newTask.assignee.trim() };

    try {
      const result = await dispatch(createTask({ token, task: taskData }));
      if (result.meta.requestStatus === "fulfilled") {
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          status: "Pending", // Reset status after task creation
          assignee: "",
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEditTask = () => {
    const token = localStorage.getItem("token");
    dispatch(updateTask({ token, task: editTask }));
    setEditTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const token = localStorage.getItem("token");
    dispatch(deleteTask({ token, taskId }));
  };

  const handleViewTaskDetails = (task) => {
    navigate(`/tasks/${task._id}`);
  };

  return (
    <div className="tasks-container">
      <h2>Task List</h2>
      <form onSubmit={handleCreateTask}>
        {/* New Task Form */}
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          value={newTask.title}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          value={newTask.description}
          onChange={handleChange}
          required
        />
        <TextField
          name="dueDate"
          label="Due Date"
          type="date"
          variant="outlined"
          value={newTask.dueDate}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        <FormControl variant="outlined">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            label="Priority"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        {/* New Status Field */}
        <FormControl variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="assignee"
          label="Assignee"
          variant="outlined"
          value={newTask.assignee}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </form>

      {/* Filter and Sort Controls */}
      <FormControl variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Priority">Priority</MenuItem>
          <MenuItem value="Due Date">Due Date</MenuItem>
        </Select>
      </FormControl>

      {/* Task Columns */}
      <div className="task-columns">
        {["Pending", "In Progress", "Completed"].map((status) => (
          <div key={status} className="task-column">
            <h3>{status}</h3>
            {filteredTasks
              .filter((task) => task.status === status)
              .map((task) => (
                <Card key={task._id} className="task-card">
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography color="textSecondary">
                      {task.description}
                    </Typography>
                    <Typography variant="body2">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Priority: {task.priority}
                    </Typography>
                    <Typography variant="body2">
                      Status: {task.status} {/* Displaying task status */}
                    </Typography>
                    <Typography variant="body2">
                      Assignee:{" "}
                      {task.assignees && task.assignees.length > 0
                        ? task.assignees
                            .map((assignee) => assignee.email)
                        : "No Assignee"}
                    </Typography>
                  </CardContent>
                  <div className="card-actions">
                    <IconButton onClick={() => setEditTask(task)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTask(task._id)}>
                      <Delete />
                    </IconButton>
                  </div>
                </Card>
              ))}
          </div>
        ))}
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={!!editTask} onClose={() => setEditTask(null)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {editTask && (
            <>
              <TextField
                label="Title"
                variant="outlined"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
              />
              <TextField
                label="Description"
                variant="outlined"
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
              />
              <TextField
                label="Due Date"
                type="date"
                variant="outlined"
                value={editTask.dueDate.split("T")[0]}
                onChange={(e) =>
                  setEditTask({ ...editTask, dueDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <FormControl variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={editTask.priority}
                  onChange={(e) =>
                    setEditTask({ ...editTask, priority: e.target.value })
                  }
                  label="Priority"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={editTask.status}
                  onChange={(e) =>
                    setEditTask({ ...editTask, status: e.target.value })
                  }
                  label="Status"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Assignee"
                variant="outlined"
                value={editTask.assignee}
                onChange={(e) =>
                  setEditTask({ ...editTask, assignee: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTask(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tasks;
