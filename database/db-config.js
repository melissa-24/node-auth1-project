require('dotenv').config
const knex = require("knex");

const knexfile = require("../knexfile.js");

module.exports = knex(config[process.env.NODE_ENV || 'development']);