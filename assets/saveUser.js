exports.saveUser = function (req) {
  var credentials = require("./connection");
  var mysql = require("mysql2");
  var connect = mysql.createConnection(credentials);
  var query =
    "UPDATE user SET userName='"+req.body.inputUserName+"', userEmail='"+req.body.inputUserEmail +"', userPhone='"+req.body.inputPhone +"' WHERE id='"+req.body.userID+"';";
 connect.query(query);
 connect.end();
};
