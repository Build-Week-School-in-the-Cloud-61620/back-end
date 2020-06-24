const router = require('express').Router()
const db = require('./router-models')

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getStudentById(id)
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.get('/all', (req, res) => {
  db.getStudent()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/:id/volunteers', (req, res) => {
  db.getVolunteer()
    .then((volunteer) => {
      volunteer.map((volunteers) => {
        db.getTime(volunteers.id).then((time) => {
          res.status(200).json({ ...volunteers, available: time })
        })
          .catch(err => {
            res.status(500).json(err)
          })
      })
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

module.exports = router
