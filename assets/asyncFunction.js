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

async function addBusinessSync(req, res) {
  var user = await loadUser.loadUserMenu();
  var activity = await loadActivity.loadActivityMenu();
  res.render("addBusiness", {
    user: user,
    activity: activity,
  });
}

async function addNewBusiness(req) {
  var formData = req.body;
  var ownerArray = [];
  var businessArray = [];
  var contactArray = [];
  var activityArray = [];
  var p = 0;
  var j = 0;
  var i = 0;
  var z = 0;

  for (const property in formData) {
    if (`${property}` === "businessOwnerName") {
      ownerArray[i] = formData[property];
      i++;
    } else if (`${property}` === "businessOwnerID") {
      ownerArray[i] = formData[property];
      i++;
    } else if (`${property}` === "ownerIDExpDate") {
      ownerArray[i] = formData[property];
      i++;
    } else if (`${property}` === "ownerBirDate") {
      ownerArray[i] = formData[property];
      i++;
    } else if (`${property}` === "ownerAddress") {
      ownerArray[i] = formData[property];
      i++;
    } else if (`${property}` === "contactName") {
      contactArray[j] = formData[property];
      j++;
    } else if (`${property}` === "contactPhone") {
      contactArray[j] = formData[property];
      j++;
    } else if (`${property}` === "contactEmail") {
      contactArray[j] = formData[property];
      j++;
    } else if (`${property}` === "activity") {
      activityArray[p] = formData[property];
      p++;
    } else {
      businessArray[z] = formData[property];
      z++;
    }
  }
  await insertBusiness.addBusiness(businessArray, formData);
  setTimeout(async function () {
    businessID = await loadBusiness.loadMyBusiness(formData.inputBusinessID);
    await insertBusiness.addBusinessOwner(
      ownerArray,
      req.body.inputBusinessID,
      ownerArray[0].length
    );
    await insertBusiness.addBusinessContact(
      contactArray,
      req.body.inputBusinessID,
      contactArray[0].length
    );
    await insertBusiness.addBusinessActivity(
      activityArray,
      req.body.inputBusinessID,
      activityArray[0].length
    );
  }, 2000);
}

async function loadUserEmail(req, res) {
  var user = await loadUser.loadForgetEmailArray();
  res.render("forgetPassword", {
    user: user,
  });
}

async function tokenValidation(req, res) {
  const bcrypt = require("bcrypt");
  var token = await insertUser.verifiedToken(req.body.userEmail);
  token = new Date(token[0].token);
  var nowDate = new Date();
  if (nowDate - token > 86400000) {
    res.render("invalidToken");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
        insertUser.resetUserPassword(hash, req.body.userEmail);
      });
    });
    res.render("index");
  }
}

async function login(req, res) {
  const bcrypt = require("bcrypt");
  var trunkEmail = req.body.userEmail.replace(/\s+/g, "");
  trunkEmail = trunkEmail.toLowerCase();
  var password = await loadUser.loginUser(trunkEmail);
  if (password.length == 1) {
    await bcrypt
      .compare(req.body.userPassword, password[0].userPassword)
      .then((res) => {
        if (res) {
          req.session.user = password[0].userEmail;
        } else {
          res.redirect("/login");
        }
      })
      .catch((err) => console.error(err.message));
    res.redirect("/business");
  } else {
    res.redirect("/login");
  }
}

async function addNewActivities(req) {
  let formData = req.body;
  var newActivitiesArray = [];
  var oldActivitiesArray = [];
  tempActivity = new Object();
  for (i = 0; i < formData.formData.length; i++) {
    switch (formData.formData[i].name) {
      case "businessCurrentActivities":
        tempActivity.activityID = formData.formData[i].value;
        oldActivitiesArray.push(tempActivity);
        tempActivity = new Object();
        break;

      case "newBusinessActivity":
        tempActivity.activityID = formData.formData[i].value;
        newActivitiesArray.push(tempActivity);
        tempActivity = new Object();
        break;
    }
  }
  saveBusiness.saveBusinessActivity(
    formData.formData[0].value,
    newActivitiesArray
  );
}

async function addNewOwners(req, res) {
  var ownerArrayCurrent = [];
  var ownerArrayNew = [];
  formData = req.body;
  var businessID = formData.formData[0].value;
  tempOwnerArray = new Object();
  for (i = 0; i < formData.formData.length; i++) {
    switch (formData.formData[i].name) {
      case "currentBusinessOwnerName":
        tempOwnerArray.ownerName = formData.formData[i].value;
        break;
      case "currentBusinessOwnerID":
        tempOwnerArray.ownerID = formData.formData[i].value;
        break;
      case "currentOwnerIDExpDate":
        tempOwnerArray.IDExpDate = formData.formData[i].value;
        break;
      case "currentOwnerBirDate":
        tempOwnerArray.ownerBirthDate = formData.formData[i].value;
        break;
      case "currentOwnerAddress":
        tempOwnerArray.ownerAddress = formData.formData[i].value;
        ownerArrayCurrent.push(tempOwnerArray);
        tempOwnerArray = new Object();
        break;
      case "newBusinessOwner":
        tempOwnerArray.ownerName = formData.formData[i].value;
        break;
      case "newBusinessOwnerID":
        tempOwnerArray.ownerID = formData.formData[i].value;
        break;
      case "newOwnerIDExpDate":
        tempOwnerArray.IDExpDate = formData.formData[i].value;
        break;
      case "newOwnerBirDate":
        tempOwnerArray.ownerBirthDate = formData.formData[i].value;
        break;
      case "newOwnerAddress":
        tempOwnerArray.ownerAddress = formData.formData[i].value;
        ownerArrayNew.push(tempOwnerArray);
        tempOwnerArray = new Object();
        break;
    }
  }
  saveBusiness.saveOwnerData(businessID, ownerArrayCurrent, ownerArrayNew);
}

module.exports.addNewOwners = addNewOwners;
module.exports.addNewActivities = addNewActivities;
module.exports.login = login;
module.exports.tokenValidation = tokenValidation;
module.exports.loadUserEmail = loadUserEmail;
module.exports.addNewBusiness = addNewBusiness;
module.exports.addBusinessSync = addBusinessSync;
module.exports.checkSignIn = checkSignIn;
module.exports.passwordResetEmail = passwordResetEmail;
module.exports.loadBusinessSync = loadBusinessSync;
