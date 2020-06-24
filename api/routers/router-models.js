const db = require('../../data/dbconfig')

function getAdmin () {
  return db('admin')
}

function getAdminByID (id) {
  return db('admin').where({ id }).first()
}
function getAdminBy (filter) {
  return db('admin').where(filter).orderBy('id')
}

function getTasks () {
  return db('tasks')
}

function getAdminTasks (id) {
  return db('tasks as t')
    .join('admin_tasks as at', 'at.tasks_id', 't.id')
    .join('admin as a', 'a.id', 'at.admin_id')
    .select('t.description', 't.completed')
    .where('t.id', id)
}

function getTasksById (id) {
  return db('tasks').where({ id }).first()
}

function getVolunteer () {
  return db('Volunteer')
}
function getVolunteerTasks (id) {
  return db('volunteer as v')
    .join('volunteer_tasks as vt', 'vt.volunteer_id', 'v.id')
    .join('tasks as t', 't.id', 'vt.volunteer_id')
    .select('t.description', 't.completed')
    .where('v.id', id)
}
function getTime (id) {
  return db('volunteer as v')
    .join('time as t', 't.volunteerID', 'v.id')
    .select('t.day', 't.start', 't.end')
    .where('v.id', id)
}

function getVolunteerById (id) {
  return db('volunteer').where({ id }).first()
}

function getVolunteerBy (filter) {
  return db('volunteer').where(filter).orderBy('id')
}

async function addAdmin (insert) {
  // eslint-disable-next-line no-useless-catch
  try {
    const [id] = await db('admin').insert(insert, 'id')
    return getAdminByID(id)
  } catch (err) { throw err }
}

function addTask (insert) {
  return db('tasks')
    .insert(insert)
    .then((id) => getTasksById(id[0]))
}
function asignTasks (insert) {
  return db('volunteer_tasks')
    .insert(insert)
    .then((id) => getId(id[0]))
}
function getId (id) {
  return db('volunteer_tasks').where({ id }).first()
}

function addVolunteer (insert) {
  return db('volunteer')
    .insert(insert)
    .then((id) => getVolunteerById(id[0]))
}

function removeVolunteer (id) {
  return db('volunteer').where('id', id).del()
}

function removeTasks (id) {
  return db('tasks').where('id', id).del()
}

function addStudent (insert) {
  return db('student')
    .insert(insert)
    .then((id) => getStudentById(id[0]))
}

function getStudentById (id) {
  return db('student').where({ id }).first()
}

function getStudentBy (filter) {
  return db('student').where(filter).orderBy('id')
}
function removeStudent (id) {
  return db('student').where('id', id).del()
}
function getStudent () {
  return db('student')
}
function addTime (insert, id) {
  return db('time').where({ volunteerID: id }).update(insert)
}

function updateTasks (insert, id) {
  return db('tasks').where({ id }).update(insert)
}

function remove (id) {
  return db('admin_tasks').where('tasks_id', id).del()
}

module.exports = {
  remove,
  updateTasks,
  addTime,
  getTime,
  getAdmin,
  getAdminByID,
  getAdminBy,
  getAdminTasks,
  getTasks,
  getTasksById,
  getVolunteer,
  getVolunteerById,
  getVolunteerBy,
  getVolunteerTasks,
  addAdmin,
  addTask,
  addVolunteer,
  removeVolunteer,
  removeTasks,
  addStudent,
  getStudent,
  getStudentById,
  removeStudent,
  getStudentBy,
  asignTasks,
  getId
}
