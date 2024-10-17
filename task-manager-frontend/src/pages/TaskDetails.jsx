import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardContent, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TaskDetail = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const [task, setTask] = useState(null);
  const theme = useTheme(); // Access the theme for colors, spacing, etc.

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data); // Set the task data
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[4],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(3),
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            marginBottom: theme.spacing(2),
          }}
        >
          {task.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            marginBottom: theme.spacing(2),
            color: theme.palette.text.primary,
          }}
        >
          {task.description}
        </Typography>

        {/* Due Date */}
        <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
          <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </Typography>

        {/* Priority */}
        <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
          <strong>Priority:</strong> {task.priority}
        </Typography>

        {/* Status */}
        <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
          <strong>Status:</strong> {task.status}
        </Typography>

        {/* Assignees */}
        <Typography variant="body2">
          <strong>Assignees:</strong> {task.assignees && task.assignees.length > 0
            ? task.assignees.map((assignee) => assignee.email).join(', ')
            : 'No Assignees'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskDetail;
