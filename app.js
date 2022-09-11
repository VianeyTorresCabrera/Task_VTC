const express = require('express');

// Routers

const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/task', tasksRouter);

module.exports = { app };