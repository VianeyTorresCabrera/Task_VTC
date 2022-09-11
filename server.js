const { app } = require('./app');

// Utils
const { initModels } = require('./models/initModels');
const { db } = require('./utils/database');

const startServer = async () => {
	try {
		// Database authenticated
		await db.authenticate();

		// Establish models relations
		initModels();

		// Database synced
		await db.sync();

		// Spin up server
		const PORT = process.env.PORT || 4005;
		app.listen(PORT, () => {
			console.log(`Express app running on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
