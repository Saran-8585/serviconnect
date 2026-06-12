require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, process.env.DATABASE_PATH || './data/serviconnect.db'),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.pragma('journal_mode = WAL');
        conn.pragma('foreign_keys = ON');
        conn.pragma('busy_timeout = 5000');
        cb();
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
    },
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, process.env.DATABASE_PATH || './data/serviconnect.db'),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.pragma('journal_mode = WAL');
        conn.pragma('foreign_keys = ON');
        conn.pragma('busy_timeout = 5000');
        cb();
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
    },
  },
};
