const db = require('../../data/dbconfig');


function getAdmin() {
	return db("admin");
}

function getAdminByID(id) {
	return db("admin").where({ id }).first();
}

function getTasks() {
	return db("tasks");
}
function getAdminTasks(id) {
	return db("tasks as t")
		.join("admin as a", "a.id", "t.admin_id")
		.select("t.id", "t.description", "t.completed")
		.where("t.admin_id", id);
}

function getTasksById(id) {
	return db("tasks").where({ id }).first();
}

function getVolunteer() {
	return db("Volunteer");
}
function getVolunteerTasks(id) {
	return db("volunteer as v")
		.join("volunteer_tasks as vt", "vt.resource_id", "v.id")
		.join("tasks as t", "t.id", "vt.volunteer_id")
		.select("t.description", "t.completed")
		.where("v.id", id);
}

function getVolunteerById(id) {
	return db("volunteer").where({ id }).first();
}

function addAdmin(insert) {
	return db("admin")
		.insert(insert)
		.then((id) => getProjectsById(id[0]));
}

function addTask(insert) {
	return db("tasks")
		.insert(insert)
		.then((id) => getProjectsById(id[0]));
}

function addVolunteer(insert) {
	return db("volunteer")
		.insert(insert)
		.then((id) => getProjectsById(id[0]));
}

function removeVolunteer(id) {
	return db("volunteer").where("id", id).del();
}

function removeTasks(id) {
    return db("tasks").where("id", id).del();
}

function addStudent(insert) {
	return db("student")
		.insert(insert)
		.then((id) => getProjectsById(id[0]));
}

function getStudentById(id) {
	return db("student").where({ id }).first();
}
function removeStudent(id) {
	return db("student").where("id", id).del();
}
function getStudent() {
	return db("student");
}


module.exports = {
	getAdmin,
	getAdminByID,
	getAdminTasks,
	getTasks,
	getTasksById,
	getVolunteer,
	getVolunteerById,
	getVolunteerTasks,
	addAdmin,
	addTask,
	addVolunteer,
	removeVolunteer,
    removeTasks,
    addStudent,
    getStudent,
    getStudentById,
    removeStudent
};
