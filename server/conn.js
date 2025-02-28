const mysql = require('mysql2/promise');

const initMysql = async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'granhotel',
    port: 3306
  });
  return conn;
};

module.exports = initMysql;