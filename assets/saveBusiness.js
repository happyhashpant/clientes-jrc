exports.saveGeneralData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET businessName='" +
    req.body.formData[0].value +
    "', statusBusiness='" +
    req.body.formData[2].value +
    "' WHERE businessID=" +
    req.body.formData[1].value +
    ";";
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
    req.body.formData[1].value +
    "', atvPassword='" +
    req.body.formData[2].value +
    "', billEmail='" +
    req.body.formData[3].value +
    "', billEmailPassword='" +
    req.body.formData[4].value +
    "', billSystemUser='" +
    req.body.formData[5].value +
    "', billSystemPassword='" +
    req.body.formData[6].value +
    "', billSystem='" +
    req.body.formData[7].value +
    "', traviUser='" +
    req.body.formData[8].value +
    "', traviPassword='" +
    req.body.formData[9].value +
    "', traviEmail='" +
    req.body.formData[10].value +
    "', ccssUser='" +
    req.body.formData[11].value +
    "', ccssPassword='" +
    req.body.formData[12].value +
    "', ccssEmail='" +
    req.body.formData[13].value +
    "', insUser='" +
    req.body.formData[14].value +
    "', insPassword='" +
    req.body.formData[15].value +
    "', insEmail='" +
    req.body.formData[16].value +
    "', userID='" +
    req.body.formData[17].value +
    "', businessRegimen='" +
    req.body.formData[18].value +
    "' WHERE businessID='" +
    req.body.formData[0].value +
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
  connect.query(query);
  connect.end();
};

exports.saveBusinessActivity = function (req, res) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  query = `INSERT into businesactivity (businessID, activityID) VALUES (${req.body.formData[0].value}, ${req.body.formData[1].value});`;
  connect.query(query, function (err) {
    if (err) {
      res.status(400).send("error");
    } else {
      res.status(200).send("success");
    }
  });
  connect.end();
};

exports.deleteBusinessActivity = function (businessId, activityID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `DELETE FROM businesactivity WHERE businessID= ${businessId} AND activityID = ${activityID};`;
  connect.query(query);
  connect.end();
};

exports.saveNewOwnerData = function (formData) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var sql = `INSERT INTO legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES (${formData.formData[0].value},'${formData.formData[1].value}',${formData.formData[2].value}, '${formData.formData[3].value}','${formData.formData[4].value}','${formData.formData[5].value}');`;
  connect.query(sql);
  connect.end();
};

exports.saveOwnerData = function (businessID, currentOwnerArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var sql = "";
  currentOwnerArray.map((owner, i) => {
    sql = `UPDATE legalbusinessrep SET nameLegal = '${owner.ownerName}', idLegal = ${owner.ownerID}, dateBirthLegal = '${owner.ownerBirthDate}', dateIdExpiration = '${owner.IDExpDate}', address = '${owner.ownerAddress}' WHERE businessID = ${businessID} AND idLegal = ${owner.ownerID};`;
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
  // connect.query(query);
  console.log(query);
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
  // connect.query(query);
  console.log(query);
  connect.end();
};

exports.saveBusinessD140URL = function (
  businessId,
  businessD140URL,
  d140ShortName
) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `INSERT INTO businessd140 (businessID,d140URL, shortName) VALUES (${businessId},'https://clientes-jrc.s3.amazonaws.com/d140/${businessD140URL}', '${d140ShortName}');`;
  connect.query(query);
  connect.end();
};

exports.deleteBusinessD140 = function (businessID, d140ID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `UPDATE businessd140 SET status=0 WHERE businessID = ${businessID} AND d140ID = ${d140ID};`;
  connect.query(query);
  connect.end();
};

exports.deleteBusinessPicture = function (businessID, pictureID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `UPDATE businesspictures SET status=0 WHERE businessID = ${businessID} AND pictureID = ${pictureID};`;
  connect.query(query);
  connect.end();
};

exports.deleteBusinessContract = function (businessID, contractID) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `UPDATE businesscontract SET status=0 WHERE businessID = ${businessID} AND contractID = ${contractID};`;
  connect.query(query);
  connect.end();
};

exports.saveBusinessNewContact = function (formData) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `INSERT INTO businesscontact (businessID, contactName, contactPhone, contactEmail) VALUES (${formData.body.formData[0].value}, '${formData.body.formData[3].value}', ${formData.body.formData[4].value}, '${formData.body.formData[5].value}');`;
  connect.query(query);
  connect.end();
};

exports.saveContactData = function (businessID, contactArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var sql = "";
  contactArray.map((contact, i) => {
    sql = `UPDATE businesscontact SET contactName = '${contact.contactName}', contactPhone = ${contact.contactPhone}, contactEmail = '${contact.contactEmail}' WHERE businessID = ${businessID} AND contactPhone = ${contact.currentContactPhone} AND contactEmail = '${contact.currentContactEmail}';`;
    connect.query(sql);
    sql = "";
  });
  connect.end();
};

exports.deleteBusinessContact = function (
  businessID,
  contactPhone,
  contactEmail
) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `DELETE FROM businesscontact WHERE businessID = ${businessID} AND contactPhone = ${contactPhone} AND contactEmail = '${contactEmail}'`;
  connect.query(query);
  connect.end();
};

exports.validateOwner = function (businessID, ownerID, res) {
  return new Promise(function (resolve, reject) {
    var credentials = require("./connection");
    var mysql = require("mysql2");
    var connect = mysql.createConnection(credentials);
    var query = `SELECT id FROM legalbusinessrep WHERE idLegal = ${ownerID} AND businessID= ${businessID}`;
    console.log(query);
    connect.query(query, function (err, result, fields) {
      if (err) {
        return res.sendStatus(400);
      }
      if (result.length == 1) return res.sendStatus(400);
      res.sendStatus(200);
    });

    connect.end();
  });
};
