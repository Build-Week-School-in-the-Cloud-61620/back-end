const db = require('../../data/dbconfig');


module.exports = {
	add,
	find,
	findBy,
	findById,
};

function find() {
	return db("student").select("id", "username").orderBy("id");
}

function findBy(filter) {
	return db("student").where(filter).orderBy("id");
}

function findById(id) {
	return db("student").where({ id }).first();
}

async function add(student) {
	try {
		const [id] = await db("student").insert(student, "id");
		return findById(id);
	} catch (err) {
		throw error;
	}
}
