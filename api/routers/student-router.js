const router = require('express').Router();
const db = require('./router-models')

router.get("/", (req, res) => {
    db.getStudent()
    .then((get) => {
        res.status(200).json(get);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    const { body } = req;
    db.addStudent(body)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((err) => {
            res.status(500).json(err.message);
        });
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	db.getStudentById(id)
		.then((get) => {
			res.status(200).json(get);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

router.get("/:id/volunteers", (req, res) => {
	db.getVolunteer()
		.then((get) => {
			res.status(201).json(get);
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});

module.exports = router;
