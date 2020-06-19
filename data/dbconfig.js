<<<<<<< HEAD
const knex = require("knex");

const knexfile = require("../knexfile.js");
const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexfile[environment]);
=======
const knex = require('knex');

const knexConfig  = require('../knexfile.js')
module.exports = knex(knexConfig.development)
>>>>>>> a5ae9dc2ec16f7be8f52a98cf776907631005555
