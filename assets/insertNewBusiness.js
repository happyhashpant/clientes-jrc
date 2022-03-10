exports.addBusiness = function (formData) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = `INSERT into business (businessName, businessID, atvUser, atvPassword, billSystem, billSystemUser, billSystemPassword, billEmail, billEmailPassword, traviUser, traviPassword, ccssUser, ccssPassword, insUser, insPassword, userID, TIV) VALUES ('${formData.businessName}',${formData.businessID}, '${formData.atvUser}','${formData.atvPassword}','${formData.billSystem}','${formData.billSystemUser}','${formData.billSystemPassword}','${formData.billEmail}','${formData.billEmailPassword}','${formData.traviUser}','${formData.traviPassword}','${formData.ccssUser}','${formData.ccssPassword}','${formData.insUser}','${formData.insPassword}','${formData.userCharge}','${formData.a}/${formData.b}/${formData.c}/${formData.d}/${formData.e}/${formData.f}/${formData.g}/${formData.h}/${formData.i}/${formData.j}/${formData.k}/${formData.l}/${formData.m}/${formData.n}/${formData.o}');`;
  connect.query(query);
  console.log(query);
  connect.end();
};

exports.addBusinessOwner = (ownerArray, businessID) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  ownerArray.map((owner, i) => {
    sql = `INSERT INTO legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES (${businessID},'${owner.ownerName}', ${owner.ownerID}, '${owner.ownerIDExpDate}', '${owner.ownerBirthDate}', '${owner.ownerAddress}');`;
    console.log(sql);
    connect.query(sql);
    sql = "";
  });
  connect.end();
};

exports.addBusinessContact = (contactArray, businessID) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  contactArray.map((contact, i) => {
    sql = `INSERT into businesscontact (businessID, contactName, contactPhone, contactEmail) VALUES (${businessID}, '${contact.contactName}', ${contact.contactPhone}, '${contact.contactEmail}');`;
    console.log(sql);
    connect.query(sql);
    sql = "";
  });
  connect.end();
};

exports.addBusinessActivity = (activityArray, businessID) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  activityArray.map((activity, i) => {
    sql = `INSERT into businesActivity (businessID, activityID) VALUES (${businessID},${activity.businessActivity});`;
    console.log(sql);
    connect.query(sql);
    sql = "";
  });
  connect.end();
};
