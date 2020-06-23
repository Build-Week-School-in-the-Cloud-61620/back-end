// imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
// router imports

const authRouter = require('../auth/auth-router')
const adminRouter = require('./routers/admin-router')
const studentRouter = require('./routers/student-router')
const volunteerRouter = require('./routers/volunteer-router')
const restricted = require('../auth/auth-middleware')
const roles = require('../auth/checkroles')

// security and data structure
server.use(helmet())
server.use(express.json())
server.use(cors())

// router calls
server.use('/api/auth', authRouter)
server.use('/api/admin', restricted, roles('admin'), adminRouter)
server.use('/api/students', restricted, roles('student'), studentRouter)
server.use('/api/volunteer', restricted, roles('volunteer'), volunteerRouter)

// get on server
server.get('/', (req, res) => {
  res.json({ api: 'server running' })
})

// export
module.exports = server
