import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../redux/slices/tasksSlice';
import TaskList from '../components/TaskList';
import TaskFormDialog from '../components/TaskFormDialog';
import FilterSortControls from '../components/FilterSortControls';
import { Button } from '@mui/material';
import axios from 'axios';
import './Tasks.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  const [editTask, setEditTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    assignees: [],
  });
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("None");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (taskStatus === 'idle') {
      dispatch(fetchTasks(token));
    }
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [taskStatus, dispatch]);

  const filteredTasks = tasks.filter(task => filterStatus === "All" || task.status === filterStatus);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await dispatch(createTask({ token, task: newTask }));
    dispatch(fetchTasks(token));
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "Pending",
      assignees: [],
    });
    setOpenDialog(false);
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteTask({ token, taskId }));
    dispatch(fetchTasks(token)); // Refresh the list of tasks after deletion
  };
  const handleEditTask = async () => {
    const token = localStorage.getItem("token");
    try {
      await dispatch(updateTask({ token, task: editTask }));
      setEditTask(null); // Close the edit dialog after saving changes
      dispatch(fetchTasks(token)); // Refresh the task list to reflect the update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  return (
    <div className="tasks-container">
      <h2>Task List</h2>
      <FilterSortControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
        Add Task
      </Button>
      <TaskList tasks={filteredTasks} onEdit={setEditTask} onDelete={handleDeleteTask} />
      <TaskFormDialog open={openDialog} onClose={() => setOpenDialog(false)} task={newTask} setTask={setNewTask} users={users} handleSubmit={handleCreateTask} />
      {editTask && <TaskFormDialog open={!!editTask} onClose={() => setEditTask(null)} task={editTask} setTask={setEditTask} users={users} handleSubmit={handleEditTask} />}
    </div>
  );
};

export default Tasks;
