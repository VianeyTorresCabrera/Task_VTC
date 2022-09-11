const express = require('express');


// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	getUserActive,
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
	createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/', getUserActive);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
