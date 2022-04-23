const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Game Jam!');
});

app.listen(3030, () => {
    console.log('Server listening on port 3030!');
});