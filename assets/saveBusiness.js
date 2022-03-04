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

exports.saveAccountsData = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE business SET atvUser='" +
    req.body.formData[1].value +
    "', atvPassword='" +
    req.body.formData[2].value +
    "', billSystem='" +
    req.body.formData[3].value +
    "', billSystemUser='" +
    req.body.formData[4].value +
    "', billSystemPassword='" +
    req.body.formData[5].value +
    "', billEmail='" +
    req.body.formData[6].value +
    "', billEmailPassword='" +
    req.body.formData[7].value +
    "', traviUser='" +
    req.body.formData[8].value +
    "', traviPassword='" +
    req.body.formData[9].value +
    "', ccssUser='" +
    req.body.formData[10].value +
    "', ccssPassword='" +
    req.body.formData[11].value +
    "', insUser='" +
    req.body.formData[12].value +
    "', insPassword='" +
    req.body.formData[13].value +
    "', userID='" +
    req.body.formData[14].value +
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
  console.log(query);
  connect.end();
};

exports.saveBusinessActivity = function (businessId, newActivities) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  for (const property in newActivities) {
    console.log(newActivities[property]);
    var query =
      " INSERT into businesactivity (businessID, activityID) VALUES ('" +
      businessId +
      "','" +
      newActivities[property] +
      "')";
    connect.query(query);
  }

  connect.end();
};

exports.deleteBusinessActivity = function (businessId, businesActivityID) {
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

exports.saveOwnerData = function (
  businessID,
  currentOwnerArray,
  newOwnerArray
) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var newInsert =
    "INSERT INTO legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES";
  var sql = "";
  currentOwnerArray.map((owner, i) => {
    sql = `UPDATE legalbusinessrep SET nameLegal = '${owner.ownerName}', idLegal = ${owner.ownerID}, dateBirthLegal = '${owner.ownerBirthDate}', dateIdExpiration = '${owner.IDExpDate}', address = '${owner.ownerAddress}' WHERE businessID = ${businessID} AND idLegal = ${owner.ownerID};`;
    console.log(sql);
    connect.query(sql);
    sql = "";
  });

  newOwnerArray.map((owner, i) => {
    sql = `(${businessID},'${owner.ownerName}', ${owner.ownerID}, '${owner.IDExpDate}', '${owner.ownerBirthDate}', '${owner.ownerAddress}');`;
    newInsert = newInsert + sql;
    console.log(newInsert);
    connect.query(newInsert);
    newInsert =
      "INSERT INTO legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES";
    sql = " ";
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
