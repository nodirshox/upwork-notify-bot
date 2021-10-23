require('dotenv').config();
const express = require('express');

const app = express();
const router = require('./router');

app.use(express.json());

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`Server has started on: http://localhost:${port}`);
});
