var express = require("express");
var session = require("express-session");
var todoController = require("./controllers/todoController");
var cookie = require("cookie-parser");
var app = express();


app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(express.static("./"));
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use(cookie());
var MemcachedStore = require("connect-memjs")(session);
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    resave: false,
  })
);

todoController(app);

app.listen(process.env.PORT || 3000);
