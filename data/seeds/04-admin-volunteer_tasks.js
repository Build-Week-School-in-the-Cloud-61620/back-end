exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('admin_volunteer_tasks').insert([
    {admin_id: 1, volunteer_id: 1, tasks_id: 1 }
  ])
}
