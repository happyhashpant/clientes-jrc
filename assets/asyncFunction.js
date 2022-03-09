var path = require("path");
var insertUser = require(path.join(__dirname, "../assets/insertNewUser.js"));
var loadUserTable = require(path.join(__dirname, "../assets/loadUserTable.js"));

const loadUser = require(path.join(__dirname, "../assets/loadUser.js"));
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
const loadActivity = require(path.join(__dirname, "../assets/loadActivity.js"));
var bodyParser = require("body-parser");
const { saveBusinessContractURL } = require("./saveBusiness");

async function loadBusinessSync(req, res) {
  var business = await loadBusiness.loadBusinessAsy(req.query.businessID);
  var user = await loadUser.loadUser(business[0].userID);
  var owner = await loadBusiness.loadOwners(business[0].businessID);
  var totalUsers = await loadUser.loadUserMenu();
  var totalActivity = await loadActivity.loadActivityMenu();
  var contact = await loadBusiness.loadContacts(business[0].businessID);
  var activity = await loadBusiness.loadActivity(business[0].businessID);
  var businessPictures = await loadBusiness.loadBusinessPictures(
    business[0].businessID
  );
  var businessContract = await loadBusiness.loadBusinessContract(
    business[0].businessID
  );
  res.render("loadBusiness", {
    business: business,
    user: user,
    activity: activity,
    owner: owner,
    contact: contact,
    totalUsers: totalUsers,
    totalActivity: totalActivity,
    businessPictures: businessPictures,
    businessContract: businessContract,
  });
}

function passwordResetEmail(req) {
  var date = new Date().toISOString().slice(0, 10);
  insertUser.tokenInsert(req.body.formData[0].value, date);
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
    to: req.body.formData[0].value,
    subject: "Se me olvido el PIN",
    text:
      "https://jrcclient.herokuapp.com/setNewPassword?userEmail=" +
      req.body.formData[0].value,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
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

async function saveAllBusinessOwners(req, res) {
  var ownerArray = [];
  formData = req.body;
  var businessID = formData.formData[0].value;
  tempOwnerObject = new Object();
  for (i = 0; i < formData.formData.length; i++) {
    switch (formData.formData[i].name) {
      case "currentBusinessOwnerName":
        tempOwnerObject.ownerName = formData.formData[i].value;
        break;
      case "currentBusinessOwnerID":
        tempOwnerObject.ownerID = formData.formData[i].value;
        break;
      case "currentOwnerIDExpDate":
        tempOwnerObject.IDExpDate = formData.formData[i].value;
        break;
      case "currentOwnerBirDate":
        tempOwnerObject.ownerBirthDate = formData.formData[i].value;
        break;
      case "currentOwnerAddress":
        tempOwnerObject.ownerAddress = formData.formData[i].value;
        ownerArray.push(tempOwnerObject);
        tempOwnerObject = new Object();
        break;
    }
  }
  saveBusiness.saveOwnerData(businessID, ownerArrayCurrent);
}

async function saveAllBusinessContacts(req, res) {
  var contactArray = [];
  formData = req.body;
  console.log(formData);
  var businessID = formData.formData[0].value;
  tempContactObject = new Object();
  for (i = 0; i < formData.formData.length; i++) {
    switch (formData.formData[i].name) {
      case "contactID":
        tempContactObject.contactID = formData.formData[i].value;
        break;
      case "contactName":
        tempContactObject.contactName = formData.formData[i].value;
        break;
      case "contactPhone":
        tempContactObject.contactPhone = formData.formData[i].value;
        break;
      case "contactEmail":
        tempContactObject.contactEmail = formData.formData[i].value;
        contactArray.push(tempContactObject);
        tempContactObject = new Object();
        break;
    }
  }
  saveBusiness.saveContactData(businessID, contactArray);
}

module.exports.saveAllBusinessContacts = saveAllBusinessContacts;
module.exports.saveAllBusinessOwners = saveAllBusinessOwners;
module.exports.login = login;
module.exports.tokenValidation = tokenValidation;
module.exports.loadUserEmail = loadUserEmail;
module.exports.addNewBusiness = addNewBusiness;
module.exports.addBusinessSync = addBusinessSync;
module.exports.checkSignIn = checkSignIn;
module.exports.passwordResetEmail = passwordResetEmail;
module.exports.loadBusinessSync = loadBusinessSync;
