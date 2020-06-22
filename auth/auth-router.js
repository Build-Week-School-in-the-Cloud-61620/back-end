//imports
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

const {isValid} = require('./valid-check');
// const Admin = require('../api/routers/admin-model');
// const Student = require('../api/routers/student-model');
// const Volunteer = require('../api/routers/volunteer-model');
const db = require('../api/routers/router-models');
//auth endpoints

router.post('/register', (req,res)=>{
    const creds = req.body;
    if(isValid(creds)){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(creds.password, rounds);
        creds.password = hash;

        if(creds.role == 'admin'){
            db.addAdmin(creds)
            .then(admin =>{
                res.status(201).json({data:admin})
            })
            .catch(err => res.status(500).json({message:'error in adding admin to database', reason:err.message}))
        }
        if(creds.role == 'student'){
            db.addStudent(creds)
            .then(student =>{
                res.status(201).json({data:student})
            })
            .catch(err => res.status(500).json({message:'error in adding student to database', reason:err.message}))
        }
        if(creds.role == 'volunteer'){
            db.addVolunteer(creds)
            .then(volunteer =>{
                res.status(201).json({data:volunteer})
            })
            .catch(err =>res.status(500).json({message:'error in adding volunteer to database', reason:err.message}))
        }

    }else{
        res.status(400).json({message:"please provide a valid username and password"})
    }

})

router.post("/login", (req, res) => {
	const { username, password } = req.body;
	if (req.body) {
		db.getAdminBy({ username: username })
			.then(([user]) => {
				if (user && bcrypt.compareSync(password, user.password)) {
					const token = generateToken(user);
					res.status(200).json({ message: "welcome", token });
				} else {
					res.status(401).json({ message: "Invalid credentials" });
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message: "please provide proper credentials",
		});
	}
});

// router.post('/login', (req,res)=>{
//     const {username, password} = req.body;
//     if(isValid(req.body)){
//         console.log(username)
//         db.getAdminBy({username:username})
//         .then(([admin])=>{
//             if(admin && bcrypt.compareSync(password, admin.password)){
//                 const token = generateToken(admin);
//                 res.status(200).json({message: `welcome ${admin.username}`,token})
//             }else{res.status(401).json({mesasge:'invalid credentials'})}
//         })
//         .catch(err=>{
//             res.status(500).json({message:'error in logging into server', reason: err.messasge})
//         })
//     }
//     if(isValid(req.body) && role == 'student'){
//         db.getStudentBy({username:username})
//         .then(([student])=>{
//             if(student && bcrypt.compareSync(password, student.password)){
//                 const token = generateToken(student);
//                 res.status(200).json({messasge:`welcome ${student.username}`,token})
//             }else{res.status(401).json({message:'invalid credentials'})}
//         })
//         .catch(err =>{
//             res.status(500).json({message:'error logging into server', reason:err.message})
//         })
//     }
//     if(isValid(req.body) && role == 'volunteer'){
//         db.getVolunteerBy({username:username})
//         .then(([volunteer])=>{
//             const token = generateToken(volunteer);
//             res.status(200).json({message:`welcome ${volunteer.username}`,token})
//         })
//         .catch(err =>{
//             res.status(500).json({message:'error in logging into server', reason:err.message})
//         })
//     }else{
//         res.status(400).json({message:'invalid username or password'})
//     }
// })





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