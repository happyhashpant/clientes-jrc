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

exports.loadOwners = function loadOnwers(businessID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = "SELECT * FROM legalbusinessrep WHERE businessID=" + businessID;

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

exports.loadContacts = function loadContact(businessID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  
  var query = "SELECT * FROM businessContact WHERE businessID=" + businessID;

  return new Promise((resolve, reject) => {
    connect.query(query, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      console.log(result);
      console.log(query);
      return resolve(result);
      
    });
    connect.end();
  });
};

exports.loadActivity = function loadActivity(businessID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = "SELECT activityID, activityName FROM activity LEFT JOIN businesactivity ON activity.id = businesactivity.activityID WHERE businesactivity.businessID = " + businessID;
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
