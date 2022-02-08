var express = require("express");
var session = require("express-session");
var todoController = require("./controllers/todoController");
var cookie = require("cookie-parser");
var app = express();

app.set("view engine", "ejs");
app.set("trust proxy", true);

app.use(express.static("./"));
app.use(express.json());
app.use(cookie());
var MemcachedStore = require('connect-memjs')(session);
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekey",
    saveUninitialized: false,
    cookie: { maxAge: oneDay, secure: true },
    resave: false,
    store: new MemcachedStore({
        servers: [process.env.MEMCACHIER_SERVERS],
        prefix: '_session_'
      })
  })
);

todoController(app);

app.listen(process.env.PORT || 5000);
