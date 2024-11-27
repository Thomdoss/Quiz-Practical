/*Created by Thomas DOS SANTOS*/

// Require modules :
const express = require('express');
const mysql = require('mysql2');

const app = express();

// Define the port = 3000
const PORT = 3000;

// Create the connection 
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
});

// Connect to MySQL
connection.connect((err) => {
   if (err) {
      throw err;
   }
   console.log('Connected to MySQL!');
});

// Create the database if not exists
app.get('/db', (req, res) => {
   let sql = 'CREATE DATABASE IF NOT EXISTS my_DB';
   connection.query(sql, (error, result) => {
      if (error) {
         console.log(error.message);
         throw error;
      }
      console.log(result);
      res.send('A new database was successfully created!');
   });
});

// Reconnect to the newly created database
const Connection_db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'my_DB', // Make sure to specify the database here
});

// Connect to the database again
Connection_db.connect((err) => {
   if (err) {
      throw err;
   }
   console.log('Connected to my_DB database!');
});

// Create a table
app.get('/users', (req, res) => {
   const sql =
      'CREATE TABLE IF NOT EXISTS users(user_id INT AUTO_INCREMENT, name VARCHAR(50), email VARCHAR(70), PRIMARY KEY(user_id))';
   Connection_db.query(sql, (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
      res.send('Users table is created!');
   });
});

// Insert a user
app.get('/adduser', (req, res) => {
   let name = 'John';
   let email = 'johnson1@efrei.net';
   const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;

   // Creating queries
   Connection_db.query(sql, [name, email], (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
      res.send('One user was inserted');
   });
});

// Select all the users
app.get('/', (req, res) => {
   const sql = `SELECT * FROM users`;

   Connection_db.query(sql, (err, records) => {
      if (err) {
         throw err;
      }
      console.log(records);
      res.send('All users');
   });
});

// Select a user by their id
app.get('/select/:id', (req, res) => {
   const sql = `SELECT * FROM users WHERE user_id= ${req.params.id}`;
   Connection_db.query(sql, (err, record) => {
      if (err) {
         throw err;
      }
      console.log(record);
      res.send('One user');
   });
});

// Update User
app.get('/update/:id', (req, res) => {
   let name = 'Johnson';
   const sql = `UPDATE users SET name = '${name}' WHERE user_id= ${req.params.id}`;
   Connection_db.query(sql, (err, record) => {
      if (err) {
         throw err;
      }
      console.log(record);
      res.send('One record was updated');
   });
});

// Delete User
app.get('/delete/:id', (req, res) => {
   const sql = `DELETE FROM users WHERE user_id= ${req.params.id}`;
   Connection_db.query(sql, (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
      res.send('One record was deleted');
   });
});

app.get('/crud', (req, res) => {
   res.send('Hello world! Hello Efrei!');
});

app.listen(PORT, () => {
   console.log(`The local server URL: http://localhost:${PORT}/`);
});
