var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var membersRouter = require('./routes/members');
var defaultRouter = require('./routes/default');
const {connectToDatabase} = require("./db");

var app = express();

connectToDatabase();

app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

const corsOptions = {
    origin: "https://member-form.onrender.com" // frontend URI (ReactJS)
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/members', membersRouter);
app.use('/health', defaultRouter);

module.exports = app;
