// conn.js
const  MongoClient  = require('mongodb');

const uri = 'mongodb+srv://sigema:root@grandhotel.gjoja.mongodb.net/?retryWrites=true&w=majority&appName=grandhotel';

const client = new MongoClient(uri);

const initMysql = async () => {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const database = client.db('grandhotel'); 
    return database; 
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = initMysql;
