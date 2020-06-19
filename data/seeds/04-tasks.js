exports.seed = function ( knex )
{
  // Deletes ALL existing entries
  return knex( "tasks" ).insert( [
    {
      description: "teach about programming",
      completed: false,
      admin_id: 1,
    },
  ] );
};
