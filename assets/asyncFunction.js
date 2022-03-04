var path = require("path");
var insertUser = require(path.join(__dirname, "../assets/insertNewUser.js"));
var loadUserTable = require(path.join(__dirname, "../assets/loadUserTable.js"));

const loadUser = require("/NodejsApp/assets/loadUser.js");
var saveUser = require(path.join(__dirname, "../assets/saveUser.js"));
var saveBusiness = require(path.join(__dirname, "../assets/saveBusiness.js"));
var insertBusiness = require(path.join(
  __dirname,
  "../assets/insertNewBusiness.js"
));
var loadBusinessTable = require(path.join(
  __dirname,
  "../assets/loadBusinessTable.js"
));
var loadBusiness = require(path.join(__dirname, "../assets/loadBusiness.js"));
const loadActivity = require(path.join("/NodejsApp/assets/loadActivity.js"));
var bodyParser = require("body-parser");

async function loadBusinessSync(req, res) {
  var business = await loadBusiness.loadBusinessAsy(req.query.businessID);
  var user = await loadUser.loadUser(business[0].userID);
  var owner = await loadBusiness.loadOwners(business[0].businessID);
  var totalUsers = await loadUser.loadUserMenu();
  var totalActivity = await loadActivity.loadActivityMenu();
  var contact = await loadBusiness.loadContacts(business[0].businessID);
  var activity = await loadBusiness.loadActivity(business[0].businessID);
  console.log(business[0].businessID);
  res.render("loadBusiness", {
    business: business,
    user: user,
    activity: activity,
    owner: owner,
    contact: contact,
    totalUsers: totalUsers,
    totalActivity: totalActivity,
  });
}

function passwordResetEmail(req, res) {
  var date = new Date().toISOString().slice(0, 10);
  insertUser.tokenInsert(req.body.email, date);
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ihangcf64@gmail.com",
      pass: "apehihthlmidjbhf",
    },
  });

  var mailOptions = {
    from: "ihangcf64@gmail.com",
    to: req.body.email,
    subject: "Se me olvido la contrasenha",
    text:
      "https://jrcclient.herokuapp.com/setNewPassword?userEmail=" +
      req.body.email,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.redirect("back");
}

function checkSignIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    var err = new Error("Not logged in!");
    res.render("index");
  }
}

module.exports.checkSignIn = checkSignIn;
module.exports.passwordResetEmail = passwordResetEmail;
module.exports.loadBusinessSync = loadBusinessSync;
