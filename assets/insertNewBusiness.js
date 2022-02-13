exports.addBusiness = function (businessArray) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "INSERT into business (businessName, businessID, atvUser, atvPassword, billSystem, billSystemUser, billSystemPassword, billEmail, billEmailPassword, traviUser, traviPassword, ccssUser, ccssPassword, insUser, insPassword, userID, TIV) VALUES ('" +
    businessArray[0] +
    "','" +
    businessArray[1] +
    "','" +
    businessArray[2] +
    "','" +
    businessArray[3] +
    "','" +
    businessArray[4] +
    "','" +
    businessArray[5] +
    "','" +
    businessArray[6] +
    "','" +
    businessArray[7] +
    "','" +
    businessArray[8] +
    "','" +
    businessArray[9] +
    "','" +
    businessArray[10] +
    "','" +
    businessArray[11] +
    "','" +
    businessArray[12] +
    "','" +
    businessArray[13] +
    "','" +
    businessArray[14] +
    "','" +
    businessArray[15] +
    "','" +
    businessArray[16] +
    "/" +
    businessArray[17] +
    "/" +
    businessArray[18] +
    "/" +
    businessArray[19] +
    "/" +
    businessArray[20] +
    "/" +
    businessArray[21] +
    "/" +
    businessArray[22] +
    "/" +
    businessArray[23] +
    "/" +
    businessArray[24] +
    "/" +
    businessArray[25] +
    "/" +
    businessArray[26] +
    "/" +
    businessArray[27] +
    "/" +
    businessArray[28] +
    "/" +
    businessArray[29] +
    "/" +
    businessArray[30] +
    "')";
console.log(query);
  connect.query(query);
  return new Promise(function (resolve, reject) {
    query = "SELECT id FROM business WHERE businessID= 0";
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
    connect.end();
  });
};

exports.verifiedBusiness = (businessID) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  console.log("espero");
  var connect = mysql.createConnection(credentials);
  return new Promise(function (resolve, reject) {
    var query = "SELECT id FROM business WHERE businessID = '" + businessID+"'";
    console.log(query);
    connect.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
        
      }
      console.log(result);
      return resolve(result);
      
    });
    connect.end();
  });
};

exports.addBusinessOwner = (ownerArray, businessID, ownerAmount) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  console.log(ownerArray[0]);
  if (ownerAmount === 5) {
    var query =
      "INSERT into legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES ('" +
      businessID +
      "','" +
      ownerArray[0] +
      "','" +
      ownerArray[1] +
      "','" +
      ownerArray[2] +
      "','" +
      ownerArray[3] +
      "','" +
      ownerArray[4] +
      "')";
      console.log(query);
    connect.query(query);
  } else {
    for (let i = 0; i < ownerAmount; i++) {
      var query =
        "INSERT into legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES ('" +
        businessID +
        "','" +
        ownerArray[0][i] +
        "','" +
        ownerArray[1][i] +
        "','" +
        ownerArray[2][i] +
        "','" +
        ownerArray[3][i] +
        "','" +
        ownerArray[4][i] +
        "')";
        console.log(query);
      connect.query(query);
    }
  }
  connect.end();
};

exports.addBusinessContact = (contactArray, businessID, contactAmount) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
console.log(contactAmount);
  if (contactAmount === 3) {
    var query =
      "INSERT into businessContact (businessID, contactName, contactPhone, contactEmail) VALUES ('" +
      businessID +
      "','" +
      contactArray[0] +
      "','" +
      contactArray[1] +
      "','" +
      contactArray[2] +
      "')";
      console.log(query);
    connect.query(query);
  } else {
    for (let i = 0; i < contactAmount; i++) {
      var query =
        "INSERT into businessContact (businessID, contactName, contactPhone, contactEmail) VALUES ('" +
        businessID +
        "','" +
        contactArray[0][i] +
        "','" +
        contactArray[1][i] +
        "','" +
        contactArray[2][i] +
        "')";
      connect.query(query);
      console.log(query);
    }
  }
  connect.end();
};

exports.addBusinessActivity = (activityArray, businessID, activityAmount) => {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);

  if (activityAmount === 1) {
    var query =
      "INSERT into businesactivity (businessID, activityID) VALUES ('" +
      businessID +
      "','" +
      activityArray[0] +
      "')";
    connect.query(query);
  } else {
    for (let i = 0; i < activityAmount; i++) {
      var query =
        "INSERT into businesactivity (businessID, activityID) VALUES ('" +
        businessID +
        "','" +
        activityArray[0][i] +
        "')";
      connect.query(query);
    }
  }
  connect.end();
};
