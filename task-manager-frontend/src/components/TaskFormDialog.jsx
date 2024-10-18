import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CalendarToday, Person, Description, PriorityHigh } from '@mui/icons-material';

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
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '500px',
          padding: '30px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: 'bold', fontSize: '2rem', borderBottom: `2px solid ${theme.palette.primary.main}` }}>
        {task._id ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" paddingTop="15px" flexDirection="column" gap={3}>
          <TextField
            name="title"
            label="Task Title"
            variant="outlined"
            value={task.title}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
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
            minRows={4}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday color="primary" />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              '&:hover .MuiOutlinedInput-root fieldset': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={task.priority} onChange={handleChange} label="Priority">
              <MenuItem value="Low">
                <PriorityHigh color="primary" /> Low
              </MenuItem>
              <MenuItem value="Medium">
                <PriorityHigh color="primary" /> Medium
              </MenuItem>
              <MenuItem value="High">
                <PriorityHigh color="primary" /> High
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              '&:hover .MuiOutlinedInput-root fieldset': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select name="status" value={task.status} onChange={handleChange} label="Status">
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              '&:hover .MuiOutlinedInput-root fieldset': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <InputLabel>Assignees</InputLabel>
            <Select
              name="assignees"
              multiple
              value={task.assignees}
              onChange={handleChange}
              renderValue={(selected) => selected.map((user) => user.email).join(', ')}
              label="Assignees"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
              }}
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
        <Button onClick={onClose} sx={{ color: theme.palette.error.main, fontWeight: 'bold', '&:hover': { backgroundColor: theme.palette.error.light } }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: '25px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {task._id ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormDialog;
