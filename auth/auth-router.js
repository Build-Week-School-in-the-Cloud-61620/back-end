//imports
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secrets');

const {isValid} = require('./valid-check');

//auth endpoints

router.post('/register', (req,res)=>{

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