import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="task-columns">
      {["Pending", "In Progress", "Completed"].map((status) => (
        <div key={status} className="task-column">
          <h3>{status}</h3>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <Card
                key={task._id}
                className="task-card"
                // onClick={() => navigate(`/tasks/${task._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography color="textSecondary">{task.description}</Typography>
                  <Typography variant="body2">Due: {new Date(task.dueDate).toLocaleDateString()}</Typography>
                  <Typography variant="body2">Priority: {task.priority}</Typography>
                  <Typography variant="body2">Status: {task.status}</Typography>
                  <Typography variant="body2">
                    Assignees:{" "}
                    {task.assignees && task.assignees.length > 0
                      ? task.assignees.map((assignee) => assignee.email).join(", ")
                      : "No Assignees"}
                  </Typography>
                </CardContent>
                <div className="card-actions">
                  <IconButton onClick={() => onEdit(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(task._id)}>
                    <Delete />
                  </IconButton>
                </div>
              </Card>
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
