exports.loadActivityMenu = function (req, res) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = "SELECT * FROM activity";
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });

    connect.end();
  });
};

exports.validateActivity = function (activityID, splitActivityName, res) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = `SELECT id FROM activity WHERE id = ${activityID}`;
    connect.query(query, function (err, result, fields) {
      if (err) {
        return res.sendStatus(400);
      }
      if (result.length == 1)
        return res.status(200).send(splitActivityName);
      res.sendStatus(400);
    });

    connect.end();
  });
};
