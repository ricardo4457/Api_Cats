'use strict'

module.exports = {
  development: {
    username: 'root',
    password: 'admin123',
    database: 'cat_search_db',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'cat_search_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'cat_search_prod',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
}
