var express = require("express");
var session = require("express-session");
var todoController = require("./controllers/todoController");
var cookie = require("cookie-parser");
var app = express();

app.set("view engine", "ejs");

app.use(express.static("./"));
app.use(express.json());
app.use(cookie());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

todoController(app);

app.listen(process.env.PORT || 5000);
