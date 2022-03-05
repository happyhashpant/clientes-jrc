var path = require("path");
const APIFunction = require(path.join(__dirname, "../assets/asyncFunction.js"));
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
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const aws = require("aws-sdk");
aws.config.update({
  accessKeyId: "AKIAZ5BJL3XRTVQYHUTE",
  secretAccessKey: "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",
});
const s3 = new aws.S3({ apiVersion: "2006-03-01" });

const uploadPicture = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clientes-jrc/logo",
    metadata: (req, file, cb) => cb(null, { filename: file.fieldname }),
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      var fileName = `${uuid()}.${req.body.businessID}.${file.originalname}`;
      var shortName = `${file.originalname}`;
      saveBusiness.saveBusinessPictureURL(req.body.businessID, fileName, shortName);
      cb(null, fileName);
    },
  }),
});

const uploadContract = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clientes-jrc/cotizacion",
    metadata: (req, file, cb) => cb(null, { filename: file.fieldname }),
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      var fileName = `${uuid()}.${req.body.businessID}.${file.originalname}`;
      var shortName = `${file.originalname}`;
      saveBusiness.saveBusinessContractURL(req.body.businessID, fileName, shortName);
      cb(null, fileName);
    },
  }),
});

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));

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
    APIFunction.login(req, res);
  });

  app.get("/logout", APIFunction.checkSignIn, function (req, res) {
    req.session.destroy(function () {
      console.log("user logged out.");
    });
    res.redirect("/login");
  });

  app.post("/resetPasswordEmail", function (req, res) {
    APIFunction.passwordResetEmail(req, res);
  });

  app.get("/setNewPassword", function (req, res) {
    var userEmail = req.query.userEmail;
    res.render("setNewPassword", { userEmail: userEmail });
  });

  app.post("/setNewPassword", function (req, res) {
    APIFunction.tokenValidation(req, res);
  });

  app.get("/forgetPassword", function (req, res) {
    APIFunction.loadUserEmail(req, res);
  });

  app.get("/business", APIFunction.checkSignIn, function (req, res) {
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.render("business");
      })
      .catch((err) => alert(err));
  });

  app.post("/addBusiness", function (req, res) {
    APIFunction.addNewBusiness(req);
    loadBusinessTable
      .loadBusinessTable()
      .then(function (result) {
        objects = result;
        res.redirect("business");
      })
      .catch((err) => alert(err));
  });

  app.get("/addBusiness", APIFunction.checkSignIn, function (req, res) {
    APIFunction.addBusinessSync(req, res);
  });

  app.get("/loadBusiness*", (req, res) => {
    APIFunction.loadBusinessSync(req, res);
  });

  app.get("/user", APIFunction.checkSignIn, function (req, res) {
    loadUserTable
      .loadUserTable()
      .then(function (result) {
        objects = result;
      })
      .then(function (result) {
        res.render("user");
      });
  });

  app.get("/loadUser*", APIFunction.checkSignIn, function (req, res) {
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
    APIFunction.addNewActivities(req);
    res.redirect(req.get("referer"));
  });

  app.post("/saveBusinessOwner", function (req, res) {
    APIFunction.addNewOwners(req, res);
    res.send("Success");
  });

  app.post("/saveNewOwner", function (req, res) {
    saveBusiness.saveNewOwnerData(req.body);
    res.send("Success");
  });

  app.get("/validateOwner", function (req, res) {
    loadBusiness.validateNewOwner();
    res.send("Success");
  });

  app.post(
    "/saveBusinessPicture",
    uploadPicture.single("businessPicture"),
    function (req, res) {
      res.redirect(req.get("referer"));
    }
  );

  app.post(
    "/saveBusinessContract",
    uploadContract.single("businessContract"),
    function (req, res) {
      res.redirect(req.get("referer"));
    }
  );

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
};
