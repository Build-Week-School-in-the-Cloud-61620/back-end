const router = require('express').Router()
const db = require('./router-models')

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
  db.addTask(body)
    .then((post) => {
      db.asignTasks({
        volunteer_id: volunteerId,
        tasks_id: post.id,
        admin_id: id
      })
        .then((posting) => {
          res.status(200).json({post, posting})
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

router.get('/students/all', (req, res) => {
  db.getStudent()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/volunteer/all', (req, res) => {
  db.getVolunteer()
    .then((get) => {
      res.status(200).json(get)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/volunteer/:id', (req, res) => {
  const { id } = req.params
  db.getVolunteerById(id)
    .then((get) => {
      res.status(201).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})

router.get('/volunteer/:id/tasks', (req, res) => {
  const { id } = req.params
  db.getVolunteerTasks(id)
    .then((get) => {
      res.status(201).json(get)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
})
module.exports = router
