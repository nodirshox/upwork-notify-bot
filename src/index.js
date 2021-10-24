require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const config = require('./config');

// Connection with Database
console.log("Connecting to db " + config.mongoURL);

mongoose.connect(config.mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log("There is an error in connecting db (" + config.mongoURL + "): " + err.message);
            process.exit(1);
        }
    }
);

mongoose.connection.once("open", function () {
    console.log("Connected to the database");
});

const app = express();
const router = require('./router');

app.use(express.json());

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`Server has started on: http://localhost:${port}`);
});
