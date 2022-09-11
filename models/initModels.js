const { User } = require('./users.model');
const { Task } = require('./tasks.model');


const initModels = () => {
	// 1 User <----> M Post
	User.hasMany(Task, { foreignKey: 'userId' });
	Task.belongsTo(User);


};

module.exports = { initModels };