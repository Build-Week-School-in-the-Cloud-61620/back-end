exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('admin_tasks').insert([
    { admin_id: 1, tasks_id: 1 }
  ])
}
