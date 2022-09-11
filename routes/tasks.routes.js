const express = require('express');

// Controllers
const {
	getAllTasks,
	createTask,
	updateTask,
	deleteTask,
	getByStatus,
} = require('../controllers/tasks.controller');

// Middlewares
const { taskExists } = require('../middlewares/tasks.middlewares');
/*const {
	createTaskValidators,
} = require('../middlewares/validators.middlewares');*/

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTask);

tasksRouter.get('/:status', getByStatus);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
