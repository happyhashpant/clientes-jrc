const express = require("express");
const session = require("express-session");
const todoController = require("./controllers/todoController");
const cookie = require("cookie-parser");
const app = express();
const { checkSignIn } = require("./assets/asyncFunction");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./"));
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use(cookie());
app.use(
  session({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    resave: false,
  })
);

const publicRouter = require("./routes/public");
app.use("/", publicRouter);

app.use(checkSignIn);


const userRouter = require("./routes/user");

app.use("/user", userRouter);

const businessRouter = require("./routes/business");

app.use("/business", businessRouter);
todoController(app);

app.listen(process.env.PORT || 3000);
