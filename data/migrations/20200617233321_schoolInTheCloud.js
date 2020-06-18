
exports.up = function(knex) {
  return knex.schema
  .createTable('admin', tbl => {
   tbl.increments()
   tbl.string('username', 128).notNullable().unique()
   tbl.string('name', 128)
   tbl.string('email', 128).notNullable().unique()
   tbl.string('role', 128).notNullable()
   tbl.string('password', 255).notNullable()
  })
  .createTable('volunteer', tbl => {
   tbl.increments()
   tbl.string('username', 128).notNullable().unique()
   tbl.string('name', 128)
   tbl.string('email', 128).notNullable().unique()
   tbl.string('role', 128).notNullable()
   tbl.string('location', 128).notNullable()
   tbl.string('time', 128).notNullable()
   tbl.string('password', 255).notNullable()
  })
  .createTable('volunteer', tbl => {
   tbl.increments();
   tbl.string( 'username', 128 ).notNullable().unique();
   tbl.string( 'name', 128 );
   tbl.string( 'email', 128 ).notNullable().unique();
   tbl.string( 'role', 128 ).notNullable();
   tbl.string( 'password', 255 ).notNullable()
  })
  .createTable('tasks', tbl => {
   tbl.increments()
   tbl.text('tasks').notNullable()
   tbl.boolean('completed').notNullable().default(0)
   tbl.integer('admin_id')
   .unsigned()
   .notNullable()
   .reference('id')
   .inTable('admin')
   .onDelete('RESTRICT')
   .onUpdate('CASCADE')
  })
  .createTable('volunteer_tasks', tbl => {
   tbl.increments()
   tbl.integer('volunteer_id')
    .unsigned()
    .notNullable()
    .reference( 'id' )
    .inTable( 'volunteer' )
    .onDelete( 'RESTRICT' )
    .onUpdate( 'CASCADE' )
   tbl.integer('tasks_id')
    .unsigned()
    .notNullable()
    .reference( 'id' )
    .inTable( 'tasks' )
    .onDelete( 'RESTRICT' )
    .onUpdate( 'CASCADE' )
  })
};

exports.down = function(knex) {
  
};
