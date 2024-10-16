import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';

const TaskDetails = () => {
  const { taskId } = useParams();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === taskId)
  );

  if (!task) {
    return <Typography variant="h6">Task not found</Typography>;
  }

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4">{task.title}</Typography>
      <Typography variant="body1">Description: {task.description}</Typography>
      <Typography variant="body1">Due Date: {new Date(task.dueDate).toLocaleDateString()}</Typography>
      <Typography variant="body1">Priority: {task.priority}</Typography>
      <Typography variant="body1">Status: {task.status}</Typography>
      <Typography variant="body1">Assignee: {task.assignee}</Typography>
    </Paper>
  );
};

export default TaskDetails;
