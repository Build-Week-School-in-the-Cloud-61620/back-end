exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('time').insert([
    {
      day: '[monday, tuesday, friday]',
      start: '9am',
      end: '3pm',
      volunteerID: 1
    }
  ])
}
