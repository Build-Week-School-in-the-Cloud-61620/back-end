exports.seed = function (knex) {
  return knex("student").insert([
    {
      username: "student 5",
      name: "Sal",
      email: "sal@cloudschool.com",
      role: "student",
      password: "password to be hashed",
    },
  ]);
};
