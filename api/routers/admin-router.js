const router = require('express').Router();
const restricted = require('../../auth/auth-middleware');
const db = require('./router-models')

router.get("/", (req, res) => {
	db.getAdmin()
		.then((get) => {
			res.status(200).json(get);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
    const {id} = req.params
	db.getAdminByID(id)
		.then((get) => {
			res.status(200).json(get);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

router.get("/:id/tasks", (req, res) => {
	const { id } = req.params;
	db.getAdminTasks(id)
		.then((get) => {
			res.status(201).json(get);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

router.post("/", (req, res) => {
	const { body } = req;
	db.addAdmin(body)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

router.post("/:id/tasks", (req, res) => {
	const { body } = req;
	const {id} = req.params
	db.addTask({...body, })
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

module.exports = router;