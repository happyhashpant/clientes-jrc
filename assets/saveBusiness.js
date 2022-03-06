exports.saveGeneralData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET businessName='" +
    req.body.formData[0].value +
    "' WHERE id='" +
    req.body.formData[1].value +
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
  connect.end();
};

exports.saveBusinessActivity = function (businessId, newActivitiesArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  newActivitiesArray.map((activity, i) => {
    query = `INSERT into businesactivity (businessID, activityID) VALUES (${businessId}, ${activity.activityID});`;
    console.log(query);
    connect.query(query);
  });
  connect.end();
};

exports.deleteBusinessActivity = function (businessId, newActivitiesArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "DELETE FROM businesactivity WHERE businessID= " +
    businessId +
    " AND businessActivityID = " +
    businesActivityID;
  connect.query(query);
  connect.end();
};

exports.saveNewOwnerData = function (formData) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var sql = `INSERT INTO legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES (${formData.formData[0].value},'${formData.formData[1].value}',${formData.formData[2].value}, '${formData.formData[3].value}','${formData.formData[4].value}','${formData.formData[5].value}');`;
  connect.query(sql);
  console.log(sql);
  connect.end();
};

exports.saveOwnerData = function (businessID, currentOwnerArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var sql = "";
  currentOwnerArray.map((owner, i) => {
    sql = `UPDATE legalbusinessrep SET nameLegal = '${owner.ownerName}', idLegal = ${owner.ownerID}, dateBirthLegal = '${owner.ownerBirthDate}', dateIdExpiration = '${owner.IDExpDate}', address = '${owner.ownerAddress}' WHERE businessID = ${businessID} AND idLegal = ${owner.ownerID};`;
    console.log(sql);
    connect.query(sql);
    sql = "";
  });
  connect.end();
};

exports.deleteBusinessOwner = function (businessId, businessOwerID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "DELETE FROM legalbusinessrep WHERE businessID= " +
    businessId +
    " AND idLegal = " +
    businessOwerID;
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.saveBusinessPictureURL = function (
  businessId,
  businessPictureURL,
  pictureShortName
) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `INSERT INTO businesspictures (businessID, pictureURL, shortName) VALUES (${businessId},'https://clientes-jrc.s3.amazonaws.com/logo/${businessPictureURL}', '${pictureShortName}');`;
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.saveBusinessContractURL = function (
  businessId,
  businessContractURL,
  contractShortName
) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `INSERT INTO businesscontract (businessID, contractURL, shortName) VALUES (${businessId},'https://clientes-jrc.s3.amazonaws.com/cotizacion/${businessContractURL}', '${contractShortName}');`;
  console.log(query);
  connect.query(query);
  connect.end();
};
