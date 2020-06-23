const db = require("../../data/dbconfig");

module.exports = {
	add,
	find,
	findBy,
	findById,
	addTask,
};

function find() {
	return db("admin").select("id", "username").orderBy("id");
}

function findBy(filter) {
	return db("admin").where(filter).orderBy("id");
}

function findById(id) {
	return db("admin").where({ id }).first();
}

async function add(admin) {
	try {
		const [id] = await db("admin").insert(admin, "id");
		return findById(id);
	} catch (err) {
		throw error;
	}
}

function addTask(newTask, id) {
	return db("admin")
		.join("tasks", "tasks.id", "tasks.admin_id")
		.insert(newTask)
		.where({ admin_id: id });
}
