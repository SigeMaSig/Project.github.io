const mysql = require('mysql2/promise');
const initMysql = require('./conn');

const readData = async (building) => {
  const conn = await initMysql();
  let build_rooms = '' 
  if(building === 'building1'){
      build_rooms = 'building1_rooms'
  }else{
      build_rooms = 'building2_rooms'
  }
  const [results] = await conn.query(`SELECT * FROM ${build_rooms}`);
  return results
};

module.exports = readData;
