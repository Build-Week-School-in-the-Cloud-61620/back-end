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
    const {id} = req.body
	db.getAdminByID(id)
		.then((get) => {
			res.status(200).json(get);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;