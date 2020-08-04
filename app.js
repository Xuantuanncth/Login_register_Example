const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require('mongoose');

const app = express();

//ejs
app.use(expressLayout);
app.set('view engine', 'ejs');

//Router
app.use('/', require("./routes/index"));
app.use('/users', require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server listen port: ", PORT));