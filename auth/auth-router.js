//imports
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

const {isValid} = require('./valid-check');
const Admin = require('../api/routers/admin-model');
const Student = require('../api/routers/student-model');
const Volunteer = require('../api/routers/volunteer-model');

//auth endpoints

router.post('/register', (req,res)=>{
    const creds = req.body;
    if({isValid(creds)}){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(creds.password, rounds);
        creds.password = hash;

        if(creds.role == 'admin'){
            Admin.add(creds)
            .then(admin =>{
                res.status(201).json({data:admin})
            })
            .catch(err => res.status(500).json({message:'error in adding admin to database', reason:err.message}))
        }
        if(creds.role == 'student'){
            Student.add(creds)
            .then(student =>{
                res.status(201).json({data:student})
            })
            .catch(err => res.status(500).json({message:'error in adding student to database', reason:err.message}))
        }
        if(creds.role == 'volunteer'){
            Volunteer.add(creds)
            .then(volunteer =>{
                res.status(201).json({data:volunteer})
            })
            .catch(err =>res.status(500).json({message:'error in adding volunteer to database', reason:err.message}))
        }

    }else{
        res.status(400).json({message:"please provide a valid username and password"})
    }

})

router.post('/login', (req,res)=>{

})



//token generation on login
function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };
    const options = {
        expiresIn:'2h'
    };
    return jwt.sign(payload, secret.jwtSecret, options)
}


module.exports = router;