const express = require('express');
const app = express();
const routes = require('./routes');
const pool = require('./db');
const cors=require('cors')
const bodyParser = require('body-parser')
const redisClient=require('./redis')

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully!');
        connection.release();
    }
});

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.use("/api", routes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})