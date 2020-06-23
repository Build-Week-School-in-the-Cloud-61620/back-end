exports.seed = function (knex) {
  // Deletes ALL existing entries

  return knex('volunteer').insert([
    {
      username: 'professor_volunteer',
      name: 'Lea',
      email: 'lea@cloudschool.com',
      role: 'volunteer',
      location: 'earth',
      password: 'password to be hashed'
    }
  ])
}
