var express = require("express");
var todoController = require("./controllers/todoController");

var app = express();

app.set("view engine", "ejs");

app.use(express.static("./"));
app.use(express.json());

todoController(app);

app.listen(3000);
