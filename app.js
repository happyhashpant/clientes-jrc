var express = require("express");
var session = require('express-session');
var todoController = require("./controllers/todoController");

var app = express();

app.set("view engine", "ejs");

app.use(express.static("./"));
app.use(express.json());
app.use(session({secret: "Your secret key"}));

todoController(app);

app.listen(3000);
