exports.addUser = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "INSERT into user (userName, userEmail, userPhone) VALUES ('" +
    req.body.userName +
    "','" +
    req.body.userEmail +
    "','" +
    req.body.inputPhone +
    "')";
  return new Promise(function (resolve, reject) {
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
    connect.end();
  });
};

exports.resetUserPassword = function (newPassword, userEmail) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE user SET userPassword= '" +
    newPassword +
    "' WHERE userEmail= '" +
    userEmail +
    "'";
  connect.query(query);
  connect.end();
};

exports.tokenInsert = function (userEmail, date) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE user SET token= '" +
    date +
    "' WHERE userEmail= '" +
    userEmail +
    "'";
  connect.query(query);
  connect.end();
};

exports.verifiedToken = function (userEmail) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  return new Promise(function (resolve, reject) {
    var query = 'SELECT token FROM user WHERE userEmail= "' + userEmail + '"';
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
    connect.end();
  });
};
