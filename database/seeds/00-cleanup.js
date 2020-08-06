const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
 return cleaner.clear(knex, {
   mode: 'truncate',
   restartIdentity: true,
   ignoreTable: ['knex_migrations', 'knex_migrations_lock'],
 })
 .then(() => console.log(`Tables truncated, ready to seed`));
};
