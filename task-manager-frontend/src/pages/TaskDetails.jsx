import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardContent } from '@mui/material';

const TaskDetail = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      try {
        console.log(id)
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
    return <Typography>Loading task details...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography color="textSecondary">{task.description}</Typography>
        <Typography variant="body2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</Typography>
        <Typography variant="body2">Priority: {task.priority}</Typography>
        <Typography variant="body2">Status: {task.status}</Typography>
        <Typography variant="body2">
          Assignees: {task.assignees ? task.assignees.map((assignee) => assignee.email).join(', ') : 'No Assignees'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskDetail;
