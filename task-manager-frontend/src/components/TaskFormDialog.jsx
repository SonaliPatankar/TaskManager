import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TaskFormDialog = ({ open, onClose, task, setTask, users, handleSubmit }) => {
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task._id ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={task.title}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={task.description}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            variant="outlined"
            value={task.dueDate.split("T")[0]} // Correctly format the date
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Assignees</InputLabel>
            <Select
              name="assignees"
              multiple
              value={task.assignees || []}
              onChange={(e) => setTask({ ...task, assignees: e.target.value })}
              label="Assignees"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={task.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">{task._id ? 'Save' : 'Create Task'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
