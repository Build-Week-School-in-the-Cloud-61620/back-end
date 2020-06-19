exports.seed = function (knex) {
	return knex("admin").insert([
		{
			username: "professor_admin",
			name: "Charles",
			email: "charles@cloudschool.com",
			role: "admin",
			password: "password to be hashed",
		},
	]);
};
