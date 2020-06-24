const router = require('express').Router()
const db = require('./router-models')

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getAdminByID(id).then((admin) => {
    res.status(200).json(admin)
  })
})

router.get('/', (req, res) => {
  db.getAdmin()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.getAdminByID(id)
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params
  console.log(req.decodedToken)
  db.getAdminTasks(id)
    .then((get) => {
      res.status(201).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.post('/:id/tasks/:volunteer_id', (req, res) => {
  const { body } = req
  const { id } = req.params
  const volunteerId = req.params.volunteer_id
  db.addTask({ ...body, admin_id: id })
    .then((post) => {
      db.asignTasks({ volunteer_id: volunteerId, tasks_id: post.id })
        .then((posting) => {
          res.status(200).json({ post, posting })
        })
        .catch((err) => {
          res.status(500).json(err.message)
        })
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.put('/:id/tasks/', (req, res) => {
  const { body } = req
  const { id } = req.params
  db.updateTasks(body, id)
    .then(update => {
      res.status(200).json(update)
    }).catch(err => {
      res.status(500).json(err)
    })
})

router.delete('/:id/tasks/', (req, res) => {
  const { id } = req.params
  db.remove(id)
    .then(del => {
      res.status(200).json(del)
    })
    .catch(err => {
      res.status(500).json({ failed: err.message })
    })
})

// admin pervilaages

router.get('/students', (req, res) => {
  db.getStudent()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/volunteer', (req, res) => {
  db.getVolunteer()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/:id/volunteers', (req, res) => {
  db.getVolunteer()
    .then((get) => {
      res.status(201).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})
module.exports = router
