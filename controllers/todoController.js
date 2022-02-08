const { use } = require("express/lib/application");
const { render } = require("express/lib/response");
const res = require("express/lib/response");
const { DATETIME } = require("mysql/lib/protocol/constants/types");
const { join } = require("path");
const { nextTick } = require("process");

var Users = [];
module.exports = function (app) {
  var path = require("path");
  var insertUser = require(path.join(__dirname, "../assets/insertNewUser.js"));
  var loadUserTable = require(path.join(
    __dirname,
    "../assets/loadUserTable.js"
  ));

  var loadUser = require(path.join(__dirname, "../assets/loadUser.js"));
  var saveUser = require(path.join(__dirname, "../assets/saveUser.js"));
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

  app.use(bodyParser.urlencoded({ extended: true }));

  function checkSignIn(req, res, next) {
    console.log(req.session.user);
    if (req.session.user) {
      console.log("made it");
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
      text: "https://jrcclient.herokuapp.com/setNewPassword?userEmail=" + req.body.email,
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
        res.render("business");
      })
      .catch((err) => alert(err));
  });

  app.get("/addBusiness", checkSignIn, function (req, res) {
    addBusinessSync(req, res);
  });

  app.get("/loadBusiness*", (req, res) => {
    console.log(req.session.user);
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
        res.render("user");
      })
      .catch((err) => alert(err));
  });

  app.post("/saveUser", function (req, res) {
    saveUser.saveUser(req);
    loadUserTable
      .loadUserTable()
      .then(function (result) {
        objects = result;
        res.render("user");
      })
      .catch((err) => alert(err));
  });

  app.get("*", function (req, res) {
    res.render("404");
  });

  app.delete("/todo", function (req, res) {});

  async function loadBusinessSync(req, res) {
    var business = await loadBusiness.loadBusinessAsy(req.query.businessID);
    var user = await loadUser.loadUser(business[0].userID);
    var owner = await loadBusiness.loadOwners(business[0].id);
    var contact = await loadBusiness.loadContacts(business[0].id);
    var activity = await loadBusiness.loadActivity(business[0].id);
    console.log(owner);
    console.log(business);
    console.log(contact);
    console.log(activity);
    res.render("loadBusiness", {
      business: business,
      user: user,
      activity: activity,
      owner: owner,
      contact: contact,
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
    formData = req.body;
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
        activityArray[j] = formData[property];
        p++;
      } else {
        businessArray[z] = formData[property];
        z++;
      }
    }
    console.log(businessArray);
    console.log(contactArray);
    console.log(activityArray);
    console.log(ownerArray);
    await insertBusiness.addBusiness(businessArray);
    var businessID = await insertBusiness.verifiedBusiness(req.body.businessID);
    console.log(ownerArray[0].length);
    await insertBusiness.addBusinessOwner(
      ownerArray,
      businessID[0].id,
      ownerArray[0].length
    );
    await insertBusiness.addBusinessContact(
      contactArray,
      businessID[0].id,
      contactArray[0].length
    );
    await insertBusiness.addBusinessActivity(
      activityArray,
      businessID[0].id,
      activityArray[0].length
    );
  }

  async function loadUserEmail(req, res) {
    var user = await loadUser.loadForgetEmailArray();
    // console.log(user);
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
    var password = await loadUser.loginUser(req.body.userEmail);
    if (password.length == 1) {
      await bcrypt
        .compare(req.body.userPassword, password[0].userPassword)
        .then((res) => {
          if (res) {
            req.session.user = password[0].userEmail;
            console.log(req.session.user);
          } else {
            res.redirect("/login");
          }
        })
        .catch((err) => console.error(err.message));
        console.log("asd");
      res.redirect("/business");
    } else {
      res.redirect("/login");
    }
  }
};
