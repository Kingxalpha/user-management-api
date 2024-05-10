require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const connection = require('./db/connect')
const PORT = process.env.PORT || 5000
const router = require('./routes/handler')



const app = express();
app.use(bodyParser.json());



app.use('/', router);



// // Protected endpoints
// app.get('/users', authenticateToken, (req, res) => {
//   // Fetch all users from database
//   connection.query('SELECT * FROM users', (error, results) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error fetching users');
//     } else {
//       res.json(results);
//     }
//   });
// });




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
