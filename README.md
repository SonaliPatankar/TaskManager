# React Task Management App

A React-based task management application that allows users to create, edit, delete, and manage tasks. The app uses JWT authentication and provides features like filtering, sorting, and assigning tasks to users.

## Features
- User authentication with JWT
- Create, update, and delete tasks
- Task filtering and sorting
- Assign tasks to multiple users
- Responsive design using Material-UI

## Prerequisites
Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Getting Started
Follow these instructions to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/SonaliPatankar/TaskManager.git
cd task-manager-frontend
npm install
npm start
cd task-manager-backend
npm install
npm run dev
Create a .env file in the root directory of the project and add the following variables:
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_BASE_URL: Base URL for the backend API (change this based on your server configuration).
