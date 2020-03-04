const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require('morgan')("dev");
const connectDB = require("./config/db");

dotenv.config({path: "./config/config.env"});

connectDB();

const app = express();

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan)
}

//Import Routes
const authRoute = require('./routes/auth');

//Route Middleware
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 3500

app.listen(PORT, ()=> console.log(`Server running in mode ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))