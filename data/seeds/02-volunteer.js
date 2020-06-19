exports.seed = function (knex) {
	// Deletes ALL existing entries

	return knex("volunteer").insert([
		{
			username: "professor_volunteer",
			name: "Lea",
			email: "lea@cloudschool.com",
			role: "volunteer",
			location: "earth",
			time: "mon-sat 9 to 5",
			password: "password to be hashed",
		},
	]);
};
