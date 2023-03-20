require('dotenv').config()

const { Client } = require('pg');

const dbConfig = require('./db.config');
// create connection
const connection = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
//open the connection

connection.connect( error =>{
    if (error) throw error;
    console.log("successfuly conected to DB");
});

module.exports = connection;