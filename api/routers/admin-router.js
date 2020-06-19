const router = require('express').Router();
const Admin = require('./admin-model');
const restricted = require('../../auth/auth-middleware');
const db = require('./router-models');

router.get('/', restricted, (req,res)=>{
    db.getAdmin()
    .then(admin =>{
        res.status(200).json(admin)
    })
    .catch(err=> res.status(500).json({message:"error in getting admin data", reason:err.message}))
})

router.get('/:id', restricted, (req,res)=>{
    const {id} = req.params;
    db.getAdminByID(id)
    .then(admin=>{
        res.status(200).json(admin)
    })
})


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