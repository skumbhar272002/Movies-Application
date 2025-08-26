const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2002',
  database: 'moivedatabase'
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert = "INSERT INTO movie_reviews (moviename, moviereview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      res.status(500).send({ error: 'Database insert failed', details: err });
    } else {
      console.log('Insert result:', result);
      res.send({ message: 'Values Inserted', result });
    }
  });
});
app.delete("/api/delete", (req, res) => {
  const name = req.body.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE moviename = ?";
  db.query(sqlDelete, [name], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      res.status(500).send({ error: 'Database delete failed', details: err });
    } else {
      console.log('Delete result:', result);
      res.send({ message: 'Values Deleted', result });
    }
  });
});
app.put("/api/update", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlUpdate = "UPDATE movie_reviews SET moviereview = ? WHERE moviename = ?";
  db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      res.status(500).send({ error: 'Database update failed', details: err });
    } else {
      console.log('Update result:', result);
      res.send({ message: 'Values Updated', result });
    }
  });
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


