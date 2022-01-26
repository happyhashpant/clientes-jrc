const { use } = require("express/lib/application");
const res = require("express/lib/response");
const user = {
  id: null,
  name: "",
  phone: "",
  email: "",
  status: null
};
const business= {
  id: null,
  name: "",
};
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

  app.get("/", function (req, res) {
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.render("index");
      })
      .catch((err) => alert(err));
  });

  app.get("/index", function (req, res) {
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.render("index");
      })
      .catch((err) => alert(err));
  });

  app.post("/addBusiness", function (req, res) {
    // insertBusiness.addBusinesss(req);

    formData = req.body;
    // var newBusiness =  Object.create(business);
    var i = 0;
    var j = 0;
    var ownerArray = [];
    // newBusiness.name = formData.businessName;
    for (const property in formData) {
      // console.log(`${property}: ${formData[property]}`);
      console.log(`${property}`);
      ownerArray[i] = formData[property];
      i++;
    }
    console.log(ownerArray);

    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.render("index");
      })
      .catch((err) => alert(err));
  });

  app.get("/addBusiness", function (req, res) {
    addBusinessSync(req, res);
  });

  app.get("/loadBusiness*", (req, res) => {
    loadBusinessSync(req, res);
  });

  app.get("/user", function (req, res) {
    loadUserTable
      .loadUserTable()
      .then(function (result) {
        objects = result;
      })
      .then(function (result) {
        res.render("user");
      });
  });

  app.get("/loadUser*", function (req, res) {
    loadUser
      .loadUser(req.query.userID)
      .then(function (result) {
        user = result;
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
    var user = await loadUser.loadUser(24);
    var activity = await loadActivity.loadActivityMenu();
    res.render("loadBusiness", {
      business: business,
      user: user,
      activity: activity,
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
};
