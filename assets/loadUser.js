exports.loadUser = function (req, res) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = "SELECT * FROM user WHERE id=" + req;

    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });

    connect.end();
  });
};

exports.loadUserMenu = function (req, res) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = "SELECT * FROM user";
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });

    connect.end();
  });
};

exports.loadUserMenu2 = function loadUserMenu(req, res) {
  return new async(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = "SELECT * FROM user";
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });

    connect.end();
  });
};