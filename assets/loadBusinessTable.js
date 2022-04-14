exports.loadBusinessTable = function (user, role) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    if (role == 1) {
      var query = `SELECT * FROM business;`;
    } else {
      var query = `SELECT * FROM business WHERE userID = ${user} OR userID = 4;`;
    }
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });

    connect.end();
  });
};
