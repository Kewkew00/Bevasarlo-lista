const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'bevasarlolista'
});

app.use(cors());

app.get('/bevasarlolista_', (req, res) => {
  pool.query('SELECT * from bevasarlolista_', function (error, results) {
    if (error) {
      res.status(500).send(error);
    }else{
      res.status(200).send(results);
    }
 
  });
});

app.get('/hozzaad', (req, res) => {
  pool.query('SELECT * from hozzaad', function (error, results) {
    if (error) {
      res.status(500).send(error);
    }else{
      res.status(200).send(results);
    }
 
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});