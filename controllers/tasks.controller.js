// Models

const { Task } = require('../models/tasks.model');
const { User } = require('../models/users.model');

const getAllTasks = async (req, res) => {
	try {
		const task = await Task.findAll({
			atributes:['id', 'userId', 'title', 'limitDate', 'startDate', 'finishDate', 'status'],
			include:[{model: User, atributes:['id', 'name']}]			
		});

		res.status(200).json({
			status: 'success',
			data: {
				task,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createTask = async (req, res) => {
	try {
		const { userId, title, startDate, limitDate  } = req.body;

		const newTask = await Task.create({ userId, title, startDate, limitDate });

		res.status(201).json({
			status: 'success',
			data: { newTask },
		});
	} catch (error) {
		console.log(error);
	}
};


getByStatus = async(req, res) =>{
	try{
		const { status } = req.params;

    	const statusValid = ['active', 'completed', 'cancelled', 'late'];

   	 	const isValid = statusValid.find(val => val === status)

    	if(!isValid){
        	return next(new AppError('The status is active, completed, late or cancellled', 400));
    	}

    	const tasks = await Task.findAll({ 
			where: {status},
			atributes:['id', 'userId', 'title', 'limitDate', 'startDate', 'finishDate', 'status'],
			include:[{model: User, atributes:['id', 'name']}]	

		});

    	res.status(200).json({
        	status: 'success',
        	tasks,
   	 });
	}catch(error){
		console.log(error);
	}
    
};

const updateTask = async (req, res) => {
	try{
		const { task } = req;
		const { finishDate } = req.body;
	
		const limitDateNum = new Date(task.limitDate).getTime();
		const finishDateNum = new Date(finishDate).getTime();
	  
		const remainingTime = limitDateNum - finishDateNum;
	  
		if (remainingTime > 0) {
		  await task.update({ finishDate, status: 'completed' });
		} else if (remainingTime < 0) {
		  await task.update({ finishDate, status: 'late' });
		}
	  
		res.status(200).json({
		  status: 'success',
		  task,
		});

	}catch(error){
		console.log(error);
	}
   
  };
  
  const deleteTask = async (req, res) => {
	try{
		const { task } = req;
  
		await task.update({ status: 'cancelled' });
	  
		res.status(200).json({
		  status: 'success',
		});

	}catch(error){
		console.log(error);
	}
   
  };
  

module.exports = {
	getAllTasks,
	createTask,
	getByStatus,
	updateTask,
	deleteTask,
};
