exports.seed = function (knex) {
  return knex("student").insert([
    {
      username: "professor_volunteer",
      name: "Sal",
      email: "sal@cloudschool.com",
      role: "student",
      password: "password to be hashed",
    },
  ]);
};
