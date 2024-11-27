/** Created by Thomas DOS SANTOS */

// Require modules :
const express = require('express');
const mysql = require('mysql2');

const app = express();

// Define the port = 3306
const PORT = 3306;

// Create the connection
const Connection_db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'my_db',
});

Connection_db.connect((err) => {
   if (err) {
      throw err;
   }
   console.log('Connection to the MySQL database !');
});

// Create the get() request :
app.get('/db', (req, res) => {
   let sql = 'CREATE DATABASE if not exists my_DB';
   Connection_db.query(sql, (error, result) => {
      if (error) {
         console.log(error.message);
         throw error;
      }
      console.log(result);
      res.send('A new database was successfully created !');
   });
});

// Create a table
app.get('/users', (req, res) => {
   const sql =
      'CREATE TABLE users(user_id INT AUTO_INCREMENT, name VARCHAR(50), email VARCHAR(70), PRIMARY KEY(user_id))';
   Connection_db.query(sql, (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
      res.send('users table is created!');
   });
});

// Insert a user:
app.get('/adduser', (req, res) => {
   let name = 'John';
   let email = 'johnson1@efrei.net';
   const sql = `INSERT INTO users (name,  email) VALUES (?, ?);`;

   // Creating queries
   Connection_db.query(sql, [name, email], (err, result) => {
      if (err) {
         throw err;
      }
      console.log(result);
      res.send('One user was inserted');
   });
});

// Select all the user :
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

// Select an user by their id :
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

// Update User:
app.get('/update/:id', (req, res) => {
   res.send('One record was updated');
   let name = 'Johnson';
   const sql = `UPDATE users SET name = '${name}' WHERE user_id= ${req.params.id}`;
   Connection_db.query(sql, (err, record) => {
      if (err) {
         throw err;
      }
      console.log(record);
   });
});

// Delete User:
app.get('/delete/:id', (req, res) => {
   res.send('One record was deleted');
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
   res.send('Hello world ! Hello Efrei !');
});

app.listen(PORT, () => {
   console.log(`The local server URL: http://localhost:${PORT}/`);
});
