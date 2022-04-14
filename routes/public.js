const express = require("express");
const { builtinModules } = require("module");
const router = express.Router();
const path = require("path");
const {
  login,
  passwordResetEmail,
  tokenValidation,
  loadUserEmail,
} = require(path.join(__dirname, "../assets/asyncFunction.js"));
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("index");
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("user logged out.");
  });
  res.redirect("/login");
});

router.post("/resetPasswordEmail", (req, res) => {
  passwordResetEmail(req);
});

router.get("/setNewPassword", (req, res) => {
  var userEmail = req.query.userEmail;
  res.render("setNewPassword", { userEmail: userEmail });
});

router.post("/setNewPassword", (req, res) => {
  tokenValidation(req, res);
});

router.get("/forgetPassword", (req, res) => {
  loadUserEmail(req, res);
});

router.get("/navbar", (req, res) => {
  res.render("navBar");
});

module.exports = router;
