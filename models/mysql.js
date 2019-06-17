'use strict'

const mysql = require('mysql2/promise');
const config = require('./config');

const sqlPromise = mysql.createConnection(config.mysql);

(async () => {
  const sql = await sqlPromise;
  // handle unexpected errors by just logging them
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });
})();

module.exports.getUserDataByUsername = async (username) => {
  const sql = await sqlPromise;

  let query = 'SELECT * FROM admin WHERE user_name = ' + sql.escape(username);

  const [rows] = await sql.query(query);

  return rows.map((row) => {
    return {
      id: row.id,
      user_name: row.user_name,
      pass: row.password
    };
  });
};

module.exports.getSettings = async () => {
  const sql = await sqlPromise;

  let query = 'SELECT * FROM settings';

  const [rows] = await sql.query(query);

  return rows;
}

module.exports.setSetting = async (setting, value) => {
  const sql = await sqlPromise;

  let searchQuery = 'SELECT id FROM settings WHERE setting = ' + sql.escape(setting);

  const [searchRows] = await sql.query(searchQuery);

  if (searchRows.length) {
    const { id } = searchRows[0];
    const query = 'UPDATE settings SET value = ' + sql.escape(value)
      + 'WHERE id = ' + sql.escape(id);
    await sql.query(query);
  } else {
    const query = 'INSERT INTO settings (setting, value) VALUES ('
      + sql.escape(setting)
      + ', ' + sql.escape(value)
      + ')';
    await sql.query(query);
  }
}

module.exports.resetSettings = async() => {
  const sql = await sqlPromise;

  const query = 'UPDATE settings SET value = null';

  await sql.query(query);
}
