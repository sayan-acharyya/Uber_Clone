const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/user.route.js")
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const corsOptions = {
    origin: "http://localhost:5173",    // your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
};
connectToDb();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/users', userRoutes);

module.exports = app;