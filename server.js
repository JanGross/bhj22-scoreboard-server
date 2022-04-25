require('dotenv').config(); 
const mysql = require('mysql2');
const express = require('express');
const { response } = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }))
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
    let { username, score, additional_data } = req.body;
    console.log(username, score, additional_data);
    if (!additional_data) {
        additional_data = null;
    }
    let sql = 'INSERT INTO `scoreboard`.`scores` (`username`, `score`, `additional_data`) VALUES (?, ?, ?)';
    let values = [username, score, additional_data];
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
setInterval(function () {
    connection.query('SELECT 1');
}, 5000);
