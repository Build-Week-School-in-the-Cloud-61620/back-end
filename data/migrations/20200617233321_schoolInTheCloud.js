exports.up = function (knex) {
  return knex.schema
    .createTable('admin', (tbl) => {
      tbl.increments()
      tbl.string('username', 128).notNullable().unique()
      tbl.string('name', 128)
      tbl.string('email', 128).notNullable().unique()
      tbl.string('role', 128).notNullable()
      tbl.string('password', 255).notNullable()
    })
    .createTable('volunteer', (tbl) => {
      tbl.increments()
      tbl.string('username', 128).notNullable().unique()
      tbl.string('name', 128)
      tbl.string('email', 128).notNullable().unique()
      tbl.string('role', 128).notNullable()
      tbl.string('location', 128).notNullable()
      tbl.string('password', 255).notNullable()
    })
    .createTable('student', (tbl) => {
      tbl.increments()
      tbl.string('username', 128).notNullable().unique()
      tbl.string('name', 128)
      tbl.string('email', 128).notNullable().unique()
      tbl.string('role', 128).notNullable()
      tbl.string('password', 255).notNullable()
    })
    .createTable('tasks', (tbl) => {
      tbl.increments()
      tbl.text('description').notNullable()
      tbl.boolean('completed').notNullable().default(0)
      tbl
        .integer('admin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('admin')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
    .createTable('volunteer_tasks', (tbl) => {
      tbl.increments()
      tbl
        .integer('volunteer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('volunteer')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      tbl
        .integer('tasks_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
    .createTable('time', (tbl) => {
      tbl.increments()
      tbl.text('day')
      tbl.string('start', 8)
      tbl.string('end', 8)
      tbl
        .integer('volunteerID')
        .unique()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('volunteer')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('time')
    .dropTableIfExists('volunteer_tasks')
    .dropTableIfExists('tasks')
    .dropTableIfExists('student')
    .dropTableIfExists('volunteer')
    .dropTableIfExists('admin')
}
