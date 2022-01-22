<?php
/*
* Change the value of $password if you have set a password on the root userid
* Change NULL to port number to use DBMS other than the default using port 3306
*
*/
$user = 'root';
$password = ''; //To be completed if you have set a password to root
$database = 'jrcclientcontrol'; //To be completed to connect to a database. The database must exist.
$port = NULL; //Default must be NULL to use default port
$mysqli = new mysqli('127.0.0.1', $user, $password, $database, $port);

if ($mysqli->connect_error) {
  die('Connect Error (' . $mysqli->connect_errno . ') '
    . $mysqli->connect_error);
}

$sql = "SELECT * FROM user";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo utf8_encode("<td>" . $row["firstName"] . "</td>");
    echo utf8_encode("<td>" . $row["phone"] . "</td>");
    echo utf8_encode("<td>" . $row["email"] . "</td>");
    echo "</tr>";
  }
} else {
  echo "0 results";
}
echo '</div>';

$mysqli->close();
