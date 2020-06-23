const router = require('express').Router()
const db = require('./router-models')

router.get('/', (req, res) => {
  db.getVolunteer()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getVolunteerById(id)
    .then((volunteer) => {
      db.getVolunteerTasks(volunteer.id)
        .then((tasks) => {
          db.getTime(volunteer.id)
            .then((time) => {
              res.status(200).json({ volunteer, time, tasks })
            })
            .catch((err) => {
              res.status(500).json(err)
            })
        })
        .catch((err) => {
          res.status(500).status(err)
        })
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params
  db.getVolunteerTasks(id)
    .then((get) => {
      res.status(201).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.put('/:id/time', (req, res) => {
  const { id } = req.params
  const times = req.body
  db.addTime({ ...times, volunteerID: id }, id)
    .then((get) => {
      res.status(201).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

module.exports = router
