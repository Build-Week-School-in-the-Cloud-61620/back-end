/* eslint-disable no-undef */
const db = require('../data/dbconfig')
const Router = require('../api/routers/router-models')

describe('router-model', () => {
  // ****** admin functions *****

  describe('admin functions', () => {
    beforeEach(async () => { await db('admin').truncate() })
    const admin = { username: 'admin001', name: 'admin001', email: 'admin001@mail.com', password: 'password', role: 'admin' }
    const admin2 = { username: 'admin002', name: 'admin002', email: 'admin002@mail.com', password: 'password', role: 'admin' }

    it('addAdmin should add admin into database', async () => {
      await Router.addAdmin(admin)
      await Router.addAdmin(admin2)
      const admins = await db('admin')
      expect(admins).toHaveLength(2)
    })
    it('addAdmin should return what was inserted', async () => {
      const adminReturn = await Router.addAdmin(admin)
      expect(adminReturn.name).toBe('admin001')
    })
    it('getAdmin should return db admin', async () => {
      await Router.addAdmin(admin)
      const admins = await db('admin')
      expect(admins).toHaveLength(1)
    })
    it('getAdminById should return admin with id', async () => {
      const adminId = 1
      await Router.addAdmin(admin)
      const adminGet = await Router.getAdminByID(adminId)
      expect(adminGet.name).toBe(admin.name)
    })

    it('getAdminBy should return admin with filter', async () => {
      await Router.addAdmin(admin)
      await Router.addAdmin(admin2)
      const adminGet = await Router.getAdminBy({ username: 'admin002' })
      expect(adminGet[0].username).toBe('admin002')
    })
  })

  // ***** student functions *****

  describe('student functions', () => {
    beforeEach(async () => { await db('student').truncate() })
    const student = { username: 'student001', name: 'student001', email: 'student001@mail.com', password: 'password', role: 'student' }
    const student2 = { username: 'student002', name: 'student002', email: 'student002@mail.com', password: 'password', role: 'student' }

    it('should addStudent', async () => {
      await Router.addStudent(student)
      await Router.addStudent(student2)
      const students = await db('student')
      expect(students).toHaveLength(2)
    })

    it('should return student object on addStudent', async () => {
      const studentReturn = await Router.addStudent(student)
      expect(studentReturn.username).toBe('student001')
    })

    it('should return students with getStudents', async () => {
      await Router.addStudent(student)
      await Router.addStudent(student2)
      const students = await db('student')
      expect(students[1]).toHaveProperty('username')
    })

    it('should return student object using getStudentBy(filter)', async () => {
      await Router.addStudent(student)
      await Router.addStudent(student2)
      const studentGet = await Router.getStudentBy({ email: 'student002@mail.com' })
      expect(studentGet[0].name).toBe('student002')
    })

    it('should return student by id', async () => {
      const studentId = 1
      await Router.addStudent(student)
      const studentGet = await Router.getStudentById(studentId)
      expect(studentGet.name).toBe(student.name)
    })

    it('should remove student with id', async () => {
      await Router.addStudent(student)
      await Router.addStudent(student2)
      await Router.removeStudent(1)
      const students = await db('student')
      expect(students).toHaveLength(1)
      expect(students[0].name).toBe('student002')
    })
  })

  // ***** volunteer functions *****

  describe('volunteer functions', () => {
    beforeEach(async () => { await db('volunteer').truncate() })
    const volunteer = { username: 'volunteer001', name: 'volunteer001', email: 'volunteer001@mail.com', password: 'password', location: 'earth', role: 'volunteer' }
    const volunteer2 = { username: 'volunteer002', name: 'volunteer002', email: 'volunteer002@mail.com', password: 'password', location: 'outer space', role: 'volunteer' }

    it('adds volunteers to table', async () => {
      await Router.addVolunteer(volunteer)
      await Router.addVolunteer(volunteer2)
      const volunteers = await db('volunteer')
      expect(volunteers).toHaveLength(2)
    })

    it('gets volunteers array with getVolunteer', async () => {
      await Router.addVolunteer(volunteer)
      await Router.addVolunteer(volunteer2)
      const volunteers = await Router.getVolunteer()
      expect(volunteers).toHaveLength(2)
    })

    it('getVolunteerById', async () => {
      const volunteerId = 2
      await Router.addVolunteer(volunteer)
      await Router.addVolunteer(volunteer2)
      const volunteerReturn = await Router.getVolunteerById(volunteerId)
      expect(volunteerReturn.name).toBe('volunteer002')
    })
    it('getVolunteerBy(filter)', async () => {
      const filter = { location: 'outer space' }
      await Router.addVolunteer(volunteer)
      await Router.addVolunteer(volunteer2)
      const volunteerGet = await Router.getVolunteerBy(filter)
      expect(volunteerGet[0].name).toBe('volunteer002')
    })

    it('removesVolunteer by id', async () => {
      await Router.addVolunteer(volunteer)
      await Router.addVolunteer(volunteer2)
      await Router.removeVolunteer(2)
      const volunteers = await db('volunteer')
      expect(volunteers).toHaveLength(1)
      expect(volunteers[0].name).toBe('volunteer001')
    })
  })

  // ***** task functions *****

  describe('task functions', () => {
    const admin = { username: 'admin001', name: 'admin001', email: 'admin001@mail.com', password: 'password', role: 'admin' }
    const volunteer = { username: 'volunteer001', name: 'volunteer001', email: 'volunteer001@mail.com', password: 'password', location: 'earth', role: 'volunteer' }
    const task = { description: 'do the thing', completed: false }
    const task2 = { description: 'do another thing', completed: true }
    const avt = { admin_id: 1, volunteer_id: 1, tasks_id: 1 }
    const avt2 = { admin_id: 1, volunteer_id: 1, tasks_id: 2 }

    beforeEach(async () => {
      await db('admin').truncate()
      await db('volunteer').truncate()
      await db('tasks').truncate()
      await db('admin_volunteer_tasks').truncate()
      await db('admin').insert(admin)
      await db('volunteer').insert(volunteer)
      await db('tasks').insert(task)
      await db('admin_volunteer_tasks').insert(avt)
    })

    it('addTask to database', async () => {
      await Router.addTask(task2)
      const tasks = await db('tasks')
      expect(tasks).toHaveLength(2)
    })

    it('getTasks', async () => {
      const tasks = await Router.getTasks()
      expect(tasks).toHaveLength(1)
    })

    it('gets taks by id', async () => {
      await Router.addTask(task2)
      const taskReturn = await Router.getTasksById(2)
      expect(taskReturn.description).toBe('do another thing')
    })

    it('upsates tasks with an update', async () => {
      await Router.addTask(task2)
      const updateTaskTruthy = await Router.updateTasks({ completed: true }, 1)
      expect(updateTaskTruthy).toBe(1)
    })

    it('removesTask by id', async () => {
      await Router.addTask(task2)
      await Router.removeTasks(1)
      const taskRemaining = await db('tasks')
      expect(taskRemaining).toHaveLength(1)
      expect(taskRemaining[0].completed).toBe(1)
    })

    it('gets admin-volunteer-tasks', async () => {
      const tasks = await Router.getAdminTasks(1)
      expect(tasks).toHaveLength(1)
    })

    it('asigns tasks', async () => {
      await Router.addTask(task2)
      const tasks = await Router.asignTasks(avt)
      expect(tasks.id).toBe(2)
    })

    it('gets volunteer tasks', async () => {
      const taskReturn = await Router.getVolunteerTasks(1)
      expect(taskReturn).toHaveLength(1)
      expect(taskReturn[0].description).toBe('do the thing')
    })

    it('removes volunteer tasks', async () => {
      await Router.addTask(task2)
      await Router.asignTasks(avt2)
      const taskReturn = await Router.removeVolunteerTask(1)
      const avtTasks = await db('admin_volunteer_tasks')
      expect(taskReturn).toBe(1)
      expect(avtTasks).toHaveLength(1)
      expect(avtTasks[0].tasks_id).toBe(2)
    })

    it('gets admin_volunteer_tasks by id', async () => {
      await Router.addTask(task2)
      await Router.asignTasks(avt2)
      const taskReturn = await Router.getId(1)
      expect(taskReturn.id).toBe(1)
    })
  })

  // ***** time functions *****

  describe('time functions', () => {
    const time = { day: '[monday, tuesday, friday]', start: '9am', end: '3pm', volunteerID: 1 }
    const time2 = { day: '[wednesday, saturday, sunday]', start: '1am', end: '1pm', volunteerID: 1 }
    const volunteer = { username: 'volunteer001', name: 'volunteer001', email: 'volunteer001@mail.com', password: 'password', location: 'earth', role: 'volunteer' }

    beforeEach(async () => {
      await db('volunteer').truncate()
      await db('time').truncate()
      await db('volunteer').insert(volunteer)
      await db('time').insert(time)
    })

    it('gets time', async () => {
        const timeRes = await Router.getTime(1)
        expect(timeRes).toHaveLength(1)
    })

    it('updates time', async () => {
        await Router.addTime(time2, 1)
        const times = await db('time')
        expect(times[0].start).toBe('1am')
    })
  })
})
