exports.saveGeneralData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET businessName='" +
    req.body.businessName +
    "' WHERE businessID='" +
    req.body.businessID +
    "';";
  connect.query(query);
  console.log(query);
  connect.end();
};

exports.saveAccountsData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET atvUser='" +
    req.body.atvUser +
    "', atvPassword='" +
    req.body.atvPassword +
    "', billSystem='" +
    req.body.billSystem +
    "', billSystemUser='" +
    req.body.billSystemUser +
    "', billSystemPassword='" +
    req.body.billSystemPassword +
    "', billEmail='" +
    req.body.billEmail +
    "', billEmailPassword='" +
    req.body.billEmailPassword +
    "', traviUser='" +
    req.body.traviUser +
    "', traviPassword='" +
    req.body.traviPassword +
    "', ccssUser='" +
    req.body.ccssUser +
    "', ccssPassword='" +
    req.body.ccssPassword +
    "', insUser='" +
    req.body.insUser +
    "', insPassword='" +
    req.body.insPassword +
    "', userID='" +
    req.body.userCharge +
    "' WHERE businessID='" +
    req.body.businessID +
    "';";
  connect.query(query);
  console.log(query);
  connect.end();
};
exports.saveAccountsData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET atvUser='" +
    req.body.atvUser +
    "', atvPassword='" +
    req.body.atvPassword +
    "', billSystem='" +
    req.body.billSystem +
    "', billSystemUser='" +
    req.body.billSystemUser +
    "', billSystemPassword='" +
    req.body.billSystemPassword +
    "', billEmail='" +
    req.body.billEmail +
    "', billEmailPassword='" +
    req.body.billEmailPassword +
    "', traviUser='" +
    req.body.traviUser +
    "', traviPassword='" +
    req.body.traviPassword +
    "', ccssUser='" +
    req.body.ccssUser +
    "', ccssPassword='" +
    req.body.ccssPassword +
    "', insUser='" +
    req.body.insUser +
    "', insPassword='" +
    req.body.insPassword +
    "', userID='" +
    req.body.userCharge +
    "' WHERE businessID='" +
    req.body.businessID +
    "';";
  connect.query(query);
  console.log(query);
  connect.end();
};

exports.saveTIVData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET tiv='" +
    req.body.a +
    "/" +
    req.body.b +
    "/" +
    req.body.c +
    "/" +
    req.body.d +
    "/" +
    req.body.e +
    "/" +
    req.body.f +
    "/" +
    req.body.g +
    "/" +
    req.body.h +
    "/" +
    req.body.i +
    "/" +
    req.body.j +
    "/" +
    req.body.k +
    "/" +
    req.body.l +
    "/" +
    req.body.m +
    "/" +
    req.body.m +
    "/" +
    req.body.o +
    "' WHERE businessID='" +
    req.body.businessID +
    "';";
  connect.query(query);
  console.log(query);
  connect.end();
};

exports.saveBusinessActivity = function (businessId, newActivities) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  for (const property in newActivities[0]) {
      console.log(newActivities[0][property])
    var query =
      " INSERT into businesactivity (businessID, activityID) VALUES ('" +
      businessId +
      "','" +
      newActivities[0][property] +
      "')";
    console.log(query);
    connect.query(query);
  }

  connect.end();
};

exports.deleteBusinessActivity = function (businessId, activityID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "DELETE FROM businesactivity WHERE businessID= " +
    businessId +
    " AND activityID = " +
    activityID;
  connect.query(query);
  connect.end();
};
