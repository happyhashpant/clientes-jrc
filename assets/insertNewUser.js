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

  connect.query(query);
  connect.end();
};
