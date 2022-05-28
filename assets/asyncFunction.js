var path = require("path");
var insertUser = require(path.join(__dirname, "../assets/insertNewUser.js"));
const loadUser = require(path.join(__dirname, "../assets/loadUser.js"));
var saveBusiness = require(path.join(__dirname, "../assets/saveBusiness.js"));
var insertBusiness = require(path.join(
  __dirname,
  "../assets/insertNewBusiness.js"
));
var loadBusiness = require(path.join(__dirname, "../assets/loadBusiness.js"));
const loadActivity = require(path.join(__dirname, "../assets/loadActivity.js"));

async function loadBusinessSync(req, res) {
  var business = await loadBusiness.loadBusinessAsy(req.params.id);
  if (business.length == 0) return res.render("404");

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
  var businessD140 = await loadBusiness.loadBusinessD140(
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
    businessD140: businessD140,
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
    res.user = 1;
    next();
  } else {
    res.render("index");
  }
}

function checkRole(req, res, next) {
  if (req.session.role == 1) {
    next();
  } else {
    res.render("401");
  }
}

async function addBusinessSync(req, res) {
  1;
  var user = await loadUser.loadUserMenu();
  var activity = await loadActivity.loadActivityMenu();
  res.render("addBusiness", {
    user: user,
    activity: activity,
  });
}

async function addNewBusiness(req) {
  var formData = req.body;
  console.log(formData);
  var activityArray = [];
  var ownerArray = [];
  var contactArray = [];
  if (formData.businessOwnerName) {
    if (typeof formData.businessOwnerName !== "string") {
      i = 0;
      for (const owner in formData.businessOwnerName) {
        ownerArray[i] = new Object();
        ownerArray[i].ownerName = formData.businessOwnerName[owner];
        i++;
      }
      i = 0;
      for (const owner in formData.businessOwnerID) {
        ownerArray[i].ownerID = formData.businessOwnerID[owner];
        i++;
      }
      i = 0;
      for (const owner in formData.ownerIDExpDate) {
        ownerArray[i].ownerIDExpDate = formData.ownerIDExpDate[owner];
        i++;
      }
      i = 0;
      for (const owner in formData.ownerBirthDate) {
        ownerArray[i].ownerBirthDate = formData.ownerBirthDate[owner];
        i++;
      }
      i = 0;
      for (const owner in formData.ownerAddress) {
        ownerArray[i].ownerAddress = formData.ownerAddress[owner];
        i++;
      }
    } else {
      ownerArray[0] = new Object();
      ownerArray[0].ownerName = formData.businessOwnerName;
      ownerArray[0].ownerID = formData.businessOwnerID;
      ownerArray[0].ownerIDExpDate = formData.ownerIDExpDate;
      ownerArray[0].ownerBirthDate = formData.ownerBirthDate;
      ownerArray[0].ownerAddress = formData.ownerAddress;
    }
  }
  if (formData.businessActivity) {
    if (typeof formData.businessActivity !== "string") {
      i = 0;
      for (const activity in formData.businessActivity) {
        activityArray[i] = new Object();
        activityArray[i].activityID = formData.businessActivity[activity];
        i++;
      }
    } else {
      activityArray[0] = new Object();
      activityArray[0].businessActivity = formData.businessActivity;
    }
  }
  if (formData.contactName) {
    if (typeof formData.contactName !== "string") {
      i = 0;
      for (const contact in formData.contactName) {
        contactArray[i] = new Object();
        contactArray[i].contactName = formData.contactName[contact];
        i++;
      }
      i = 0;
      for (const contact in formData.contactPhone) {
        contactArray[i].contactPhone = formData.contactPhone[contact];
        i++;
      }
      i = 0;
      for (const contact in formData.contactEmail) {
        contactArray[i].contactEmail = formData.contactEmail[contact];
        i++;
      }
    } else {
      contactArray[0] = new Object();
      contactArray[0].contactName = formData.contactName;
      contactArray[0].contactPhone = formData.contactPhone;
      contactArray[0].contactEmail = formData.contactEmail;
    }
  }

  await insertBusiness.addBusiness(formData);
  setTimeout(async function () {
    await insertBusiness.addBusinessOwner(ownerArray, formData.businessID);
    await insertBusiness.addBusinessContact(contactArray, formData.businessID);
    await insertBusiness.addBusinessActivity(
      activityArray,
      formData.businessID
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
          req.session.user = password[0].id;
          console.log(password);
          req.session.role = password[0].userPermission;
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
  saveBusiness.saveOwnerData(businessID, ownerArray);
}

async function saveAllBusinessContacts(req, res) {
  var contactArray = [];
  formData = req.body;
  var businessID = formData.formData[0].value;
  tempContactObject = new Object();
  for (i = 0; i < formData.formData.length; i++) {
    switch (formData.formData[i].name) {
      case "currentContactPhone":
        tempContactObject.currentContactPhone = formData.formData[i].value;
        break;
      case "currentContactEmail":
        tempContactObject.currentContactEmail = formData.formData[i].value;
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

async function retrieveOwnerValidation(req, res) {
  var business = await loadBusiness.retrieveOwnerValidation(req.body.value);
  var value = business.length + "";
  res.status(200).send(value);
}

module.exports.retrieveOwnerValidation = retrieveOwnerValidation;
module.exports.checkRole = checkRole;
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
