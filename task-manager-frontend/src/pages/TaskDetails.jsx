import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3),
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[8],
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(3),
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <AssignmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography variant="h4" component="div" sx={{ ml: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
              {task.title}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: theme.spacing(2), color: theme.palette.text.primary }}>
            {task.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box display="flex" alignItems="center">
              <DateRangeIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
              <Typography variant="body2">
                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <PriorityHighIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
              <Typography variant="body2">
                <strong>Priority:</strong> {task.priority}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
              <Typography variant="body2">
                <strong>Status:</strong> {task.status}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="body2">
                <strong>Assignees:</strong> {task.assignees && task.assignees.length > 0
                  ? task.assignees.map((assignee) => assignee.email).join(', ')
                  : 'No Assignees'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskDetail;
