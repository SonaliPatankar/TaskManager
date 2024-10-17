import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const theme = useTheme();
  const taskStatuses = ["Pending", "In Progress", "Completed"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return theme.palette.error.main;
      case "In Progress":
        return theme.palette.secondary.main;
      case "Completed":
        return theme.palette.common.green;
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={3}>
      {taskStatuses.map((status) => (
        <Box key={status} width={{ xs: '100%', sm: '30%' }} className={`task-column task-column-${status.toLowerCase()}`}>
          <Typography variant="h5" gutterBottom color={getStatusColor(status)}>
            {status}
          </Typography>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <Card
                key={task._id}
                variant="outlined"
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': { boxShadow: 4 },
                  borderLeft: `4px solid ${getStatusColor(task.status)}`,
                }}
              >
                <CardContent>
                  <Typography variant="h6" color={theme.palette.primary.main}>
                    {task.title}
                  </Typography>
                  <Typography color={theme.palette.text.secondary}>
                    {task.description}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.text.primary}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.text.primary}>
                    Priority: {task.priority}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.text.primary}>
                    Status: {task.status}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.text.primary}>
                    Assignees: {task.assignees && task.assignees.length > 0
                      ? task.assignees.map((assignee) => assignee.email).join(", ")
                      : "No Assignees"}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <IconButton onClick={() => onEdit(task)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(task._id)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;
