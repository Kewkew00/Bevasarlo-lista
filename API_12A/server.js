const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.get('/hozzaad_', (req, res) => {
  pool.query('SELECT * from hozzaad_', function (error, results) {
    if (error) {
      res.status(500).send(error);
    }else{
      res.status(200).send(results);
    }
 
  });
});
app.post('/hozzaad_', (req, res) => {
  const { category, productname, quantity, unitprice, price } = req.body;

  // Ellenőrzés: validáció, adatok érvényességének ellenőrzése, stb.
  if (!category || !productname || !quantity || !unitprice || !price) {
    return res.status(400).send('Hiányzó vagy érvénytelen adatok');
  }

  // Először töröljük az összes meglévő rekordot az adatbázisból
  pool.query('DELETE FROM hozzaad_', function (deleteError, deleteResults) {
    if (deleteError) {
      return res.status(500).send(deleteError);
    }

    // Most frissíthetjük az adatbázist az új adatokkal
    pool.query('INSERT INTO hozzaad_ (category, productname, quantity, unitprice, price) VALUES (?, ?, ?, ?, ?)',
      [category, productname, quantity, unitprice, price], function (insertError, insertResults) {
        if (insertError) {
          res.status(500).send(insertError);
        } else {
          res.status(200).send('Adatok sikeresen frissítve az adatbázisban');
        }
      });
  });
});
app.delete('/torles_', (req, res) => {
  pool.query('DELETE FROM hozzaad_', function (error, results) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('Az összes adat sikeresen törölve az adatbázisból');
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});