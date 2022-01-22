exports.loadBusiness = function (req, res) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = "SELECT * FROM business WHERE id=" + req;

    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });

    connect.end();
  });
};

exports.loadBusinessAsy = function loadBusinessAsy(req, res) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = "SELECT * FROM business WHERE id=" + req;

  return new Promise((resolve, reject) => {
    connect.query(query, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
    connect.end();
  });
};
