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
  console.log(req.body.formData[15].value);
  var query =
    "UPDATE business SET tiv='" +
    req.body.formData[1].value +
    "/" +
    req.body.formData[2].value +
    "/" +
    req.body.formData[3].value +
    "/" +
    req.body.formData[4].value +
    "/" +
    req.body.formData[5].value +
    "/" +
    req.body.formData[6].value +
    "/" +
    req.body.formData[7].value +
    "/" +
    req.body.formData[8].value +
    "/" +
    req.body.formData[9].value +
    "/" +
    req.body.formData[10].value +
    "/" +
    req.body.formData[11].value +
    "/" +
    req.body.formData[12].value +
    "/" +
    req.body.formData[13].value +
    "/" +
    req.body.formData[14].value +
    "/" +
    req.body.formData[15].value +
    "' WHERE businessID='" +
    req.body.formData[0].value +
    "';";
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.saveBusinessActivity = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  query = `INSERT into businesactivity (businessID, activityID) VALUES (${req.body.formData[0].value}, ${req.body.formData[1].value});`;
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.deleteBusinessActivity = function (businessId, activityID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `DELETE FROM businesactivity WHERE businessID= ${businessId} AND activityID = ${activityID};`;
  connect.query(query);
  console.log(query);
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
  var query = `DELETE FROM legalbusinessrep WHERE businessID = ${businessId} AND idLegal = ${businessOwerID}`;
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

exports.deleteBusinessPicture = function (businessID, pictureID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `UPDATE businesspictures SET status=0 WHERE businessID = ${businessID} AND pictureID = ${pictureID};`;
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.deleteBusinessContract = function (businessID, contractID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `UPDATE businesscontract SET status=0 WHERE businessID = ${businessID} AND contractID = ${contractID};`;
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.saveBusinessNewContact = function (formData) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `INSERT INTO businesscontact (businessID, contactName, contactPhone, contactEmail) VALUES (${formData.body.formData[0].value}, '${formData.body.formData[1].value}', ${formData.body.formData[2].value}, '${formData.body.formData[3].value}');`;
  console.log(query);
  connect.query(query);
  connect.end();
};

exports.saveContactData = function (businessID, contactArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var sql = "";
  contactArray.map((contact, i) => {
    sql = `UPDATE businesscontact SET contactName = '${contact.contactName}', contactPhone = ${contact.contactPhone}, contactEmail = '${contact.contactEmail}' WHERE businessID = ${businessID} AND id = ${contact.contactID};`;
    console.log(sql);
    connect.query(sql);
    sql = "";
  });
  connect.end();
};

exports.deleteBusinessContact = function (businessID, contractID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `DELETE FROM businesscontact WHERE businessID = ${businessID} AND contactPhone = ${contractID}`;
  console.log(query);
  connect.query(query);
  connect.end();
};
