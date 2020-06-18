
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex( 'volunteer_tasks' ).insert( [
    {
      volunteer_id: 1, tasks_id: 1
    }
  ] )
}
