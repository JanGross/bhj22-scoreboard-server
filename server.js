require('dotenv').config(); 
const mysql = require('mysql2');
const express = require('express');
const { response } = require('express');
const app = express();
app.use(express.urlencoded())
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

app.get('/', (req, res) => {
    res.send('Hello Game Jam!');
});


//get scores
app.get('/scores', (req, res) => {
    let scores = connection.execute(
        'SELECT `username`,`score` FROM `scoreboard`.`scores` ORDER BY `score` DESC LIMIT 10',
        function(err, results, fields) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(results);
            }
        }
    );
});

//add score
app.post('/scores', (req, res) => {
    let { username, score } = req.body;
    console.log(req.body);
    let sql = 'INSERT INTO `scoreboard`.`scores` (`username`, `score`) VALUES (?, ?)';
    let values = [username, score];
    connection.execute(sql, values, function(err, results, fields) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});


app.listen(3030, () => {
    console.log('Server listening on port 3030!');
});