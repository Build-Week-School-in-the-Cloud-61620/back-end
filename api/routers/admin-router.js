const router = require('express').Router();
const Admin = require('./admin-model');
const restricted = require('../../auth/auth-middleware');

router.get('/', restricted, (req,res)=>{
    Admin.find()
    .then(admin =>{
        res.status(200).json(admin)
    })
    .catch(err=> res.status(500).json({message:"error in getting admin data", reason:err.message}))
})

router.get('/:id', restricted, (req,res)=>{
    const {id} = req.params;
    Admin.findById(id)
    .then(admin=>{
        res.status(200).json(admin)
    })
})

module.exports = router;