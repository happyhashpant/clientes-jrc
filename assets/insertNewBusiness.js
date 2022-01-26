exports.addBusiness = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "INSERT into business (businessName, businessID, atvUser, atvPassword, billSystem, billSystemUser, billSystemPassword, billEmail, billEmailPassword, traviUser, traviPassword, ccssUser, ccssPassword, insUser, insPassword, activity, userID, TIV) VALUES ('" +
    req.body.businessName +
    "','" +
    req.body.businessID +
    "','" +
    req.body.atvUser +
    "','" +
    req.body.atvPassword +
    "','" +
    req.body.billSystem +
    "','" +
    req.body.billSystemUser +
    "','" +
    req.body.billSystemPassword +
    "','" +
    req.body.billEmail +
    "','" +
    req.body.billEmailPassword +
    "','" +
    req.body.traviUser +
    "','" +
    req.body.traviPassword +
    "','" +
    req.body.ccssUser +
    "','" +
    req.body.ccssPassword +
    "','" +
    req.body.insUser +
    "','" +
    req.body.insPassword +
    "','" +
    req.body.activity +
    "','" +
    req.body.userCharge +
    "','" +
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
    req.body.n +
    "/" +
    req.body.o +
    "')";

  connect.query(query);
  connect.end();
};

exports.addBusinesss = function (req, id) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query = "req.body.businessOwnerName1";
  var test = query;
  console.log(test);
  // for (let int of id) {
  //   query =
  //     "INSERT INTO legalbusinessrep (businessID, nameLegal, idLegal, dateBirthLegal, dateIdExpiration, address) VALUES('"+
  //     req.body.businessName +
  //   "','" +
  //   req.body.o +
  //   "')";
  // }
};

function addBusinessss(req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
   var formData = JSON.stringify($("#businessForm").serializeArray());
   console.log(formData);
  formData = JSON.parse(formData);
  console.log(formData);
  var query =
  "INSERT into business (businessName, businessID, atvUser, atvPassword, billSystem, billSystemUser, billSystemPassword, billEmail, billEmailPassword, traviUser, traviPassword, ccssUser, ccssPassword, insUser, insPassword, activity, userID, TIV) VALUES ('" +
  formData[0].value +
  "','" +
  req.body.businessID +
  "','" +
  req.body.atvUser +
  "','" +
  req.body.atvPassword +
  "','" +
  req.body.billSystem +
  "','" +
  req.body.billSystemUser +
  "','" +
  req.body.billSystemPassword +
  "','" +
  req.body.billEmail +
  "','" +
  req.body.billEmailPassword +
  "','" +
  req.body.traviUser +
  "','" +
  req.body.traviPassword +
  "','" +
  req.body.ccssUser +
  "','" +
  req.body.ccssPassword +
  "','" +
  req.body.insUser +
  "','" +
  req.body.insPassword +
  "','" +
  req.body.activity +
  "','" +
  req.body.userCharge +
  "','" +
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
  req.body.n +
  "/" +
  req.body.o +
  "')";
  console.log(query);
  return formData;
}
