import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TaskFormDialog = ({ open, onClose, task, setTask, users, handleSubmit }) => {
  const theme = useTheme();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md" // Increased width to "md"
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '400px', // Decrease form height
          padding: '20px',
          backgroundColor: theme.palette.background.default, // Use theme background color
        },
      }}
    >
      <DialogTitle sx={{ color: theme.palette.primary.main }}>
        {task._id ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={task.title}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.paper, // Use theme background for input
              '& label.Mui-focused': { color: theme.palette.primary.main }, // Focused label color
            }}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={task.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            minRows={4} // Increase height of description box
            sx={{
              backgroundColor: theme.palette.background.paper, // Use theme background for input
              '& label.Mui-focused': { color: theme.palette.primary.main }, // Focused label color
            }}
          />
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            variant="outlined"
            value={task.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.paper, // Use theme background for input
            }}
          />
          <FormControl variant="outlined" fullWidth sx={{ backgroundColor: theme.palette.background.paper }}>
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={task.priority} onChange={handleChange} label="Priority">
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ backgroundColor: theme.palette.background.paper }}>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={task.status} onChange={handleChange} label="Status">
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ backgroundColor: theme.palette.background.paper }}>
            <InputLabel>Assignees</InputLabel>
            <Select
              name="assignees"
              multiple
              value={task.assignees}
              onChange={handleChange}
              renderValue={(selected) => selected.map((user) => user.email).join(', ')}
              label="Assignees"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user}>
                  {user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.error.main }}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {task._id ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormDialog;
