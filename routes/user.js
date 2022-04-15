const express = require("express");
const router = express.Router();
const path = require("path");
const { checkRole } = require(path.join(
  __dirname,
  "../assets/asyncFunction.js"
));
const loadUserTable = require(path.join(
  __dirname,
  "../assets/loadUserTable.js"
));
const loadUser = require(path.join(__dirname, "../assets/loadUser.js"));

// get methods
router.get("/", (req, res) => {
  loadUserTable
    .loadUserTable()
    .then((result) => {
      objects = result;
    })
    .then((result) => {
      res.render("user");
    });
});

router.get("/new", checkRole, (req, res) => {
  res.render("addUser");
});

router.get("/:id", (req, res) => {
  loadUser
    .loadUser(req.params.id)
    .then((result) => {
      userInfo = result;
      if (userInfo.length == 0) return res.render("404");
      res.render("loadUser");
    })
    .catch((err) => alert(err));
});

// Post methods

router.post("/new", (req, res) => {
  insertUser.addUser(req);
  loadUserTable
    .loadUserTable()
    .then((result) => {
      objects = result;
      res.redirect("/user");
    })
    .catch((err) => alert(err));
});

router.post("/", (req, res) => {
  saveUser.saveUser(req);
  loadUserTable
    .loadUserTable()
    .then((result) => {
      objects = result;
      res.redirect("user");
    })
    .catch((err) => alert(err));
});

module.exports = router;
