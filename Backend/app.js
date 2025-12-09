const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const corsOptions = {
    origin: "http://localhost:5173",   // your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("hellow world"); 
})

module.exports = app;