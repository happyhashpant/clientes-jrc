const { use } = require("express/lib/application");
const { render } = require("express/lib/response");
const res = require("express/lib/response");
const { DATETIME } = require("mysql/lib/protocol/constants/types");
const { loadavg } = require("os");
const { join } = require("path");
const { nextTick } = require("process");
var path = require("path");
const ownerObject = require(path.join(__dirname, "../assets/ownerObject.js"));
var insertUser = require(path.join(__dirname, "../assets/insertNewUser.js"));
var loadUserTable = require(path.join(__dirname, "../assets/loadUserTable.js"));

var loadUser = require(path.join(__dirname, "../assets/loadUser.js"));
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

var loadActivity = require(path.join(__dirname, "../assets/loadActivity.js"));
var bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));

  function checkSignIn(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      var err = new Error("Not logged in!");
      res.render("index");
    }
  }

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", function (req, res) {
    res.render("index");
  });

  app.get("/index", function (req, res) {
    res.render("index");
  });

  app.post("/login", function (req, res) {
    login(req, res);
  });

  app.get("/logout", checkSignIn, function (req, res) {
    req.session.destroy(function () {
      console.log("user logged out.");
    });
    res.redirect("/login");
  });

  app.post("/resetPasswordEmail", function (req, res) {
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
  });

  app.get("/setNewPassword", function (req, res) {
    var userEmail = req.query.userEmail;
    res.render("setNewPassword", { userEmail: userEmail });
  });

  app.post("/setNewPassword", function (req, res) {
    tokenValidation(req, res);
  });

  app.get("/forgetPassword", function (req, res) {
    loadUserEmail(req, res);
  });

  app.get("/business", checkSignIn, function (req, res) {
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.render("business");
      })
      .catch((err) => alert(err));
  });

  app.post("/addBusiness", function (req, res) {
    addNewBusiness(req);
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.redirect("business");
      })
      .catch((err) => alert(err));
  });

  app.get("/addBusiness", checkSignIn, function (req, res) {
    addBusinessSync(req, res);
  });

  app.get("/loadBusiness*", (req, res) => {
    loadBusinessSync(req, res);
  });

  app.get("/user", checkSignIn, function (req, res) {
    loadUserTable
      .loadUserTable()
      .then(function (result) {
        objects = result;
      })
      .then(function (result) {
        res.render("user");
      });
  });

  app.get("/loadUser*", checkSignIn, function (req, res) {
    loadUser
      .loadUser(req.query.userID)
      .then(function (result) {
        userInfo = result;
        res.render("loadUser");
      })
      .catch((err) => alert(err));
  });

  app.post("/addUser", function (req, res) {
    insertUser.addUser(req);
    loadUserTable
      .loadUserTable()
      .then(function (result) {
        objects = result;
        res.redirect("/user");
      })
      .catch((err) => alert(err));
  });

  app.post("/saveUser", function (req, res) {
    saveUser.saveUser(req);
    loadUserTable
      .loadUserTable()
      .then(function (result) {
        objects = result;
        res.redirect("user");
      })
      .catch((err) => alert(err));
  });

  app.get("*", function (req, res) {
    res.render("navBar");
  });

  app.delete("/todo", function (req, res) {});

  ////////////////////////////////////////// edit Business Post Handling/////////////////////////////////////////
  app.post("/saveGeneralData", function (req, res) {
    saveBusiness.saveGeneralData(req);
    res.send("Success");
  });

  app.post("/saveAccountsData", function (req, res) {
    saveBusiness.saveAccountsData(req);
    res.send("Success");
  });

  app.post("/saveTivData", function (req, res) {
    saveBusiness.saveTIVData(req);
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.redirect(req.get("referer"));
      })
      .catch((err) => alert(err));
  });

  app.post("/saveBusinessActivity", function (req, res) {
    addNewActivities(req);
    res.redirect(req.get("referer"));
  });

  app.post("/saveBusinessOwner", function (req, res) {
    addNewOwners(req, res);
    res.send("Success");
  });

  // ------------------------------------------------------------------ Delete-------------------------

  app.post("/deleteActivity", function (req, res) {
    saveBusiness.deleteBusinessActivity(
      req.body.businessID,
      req.body.businessActivityID
    );
    res.send("Success");
  });
  app.post("/deleteOwner", function (req, res) {
    saveBusiness.deleteBusinessOwner(
      req.body.businessID,
      req.body.businesOwnerID
    );
    res.send("Success");
  });
  app.post("/deleteContact", function (req, res) {
    res.send("Success");
  });

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
    console.log(trunkEmail)
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
    console.log(formData);
    var k = 0;
    var j = 0;
    for (i = 0; i < formData.formData.length; i++) {
      switch (formData.formData[i].name) {
        case "businessCurrentActivities":
          tempActivity.activityID = formData.formData[i].value;
          break;
      }
      if (formData.formData[i].name == "businessNewActivities") {
        newActivitiesArray[k] = formData.formData[i].value;
        k++;
      } else if (formData.formData[i].name == "businessCurrentActivitiesID") {
        oldActivitiesArray[j] = formData.formData[i].value;
        j++;
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
};
