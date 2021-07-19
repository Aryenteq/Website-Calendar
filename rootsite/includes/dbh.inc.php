<?php
// db = DataBase
$dbservername = "localhost"; // we are on local host, change later on
// ! MAYEB without db
$dbUsername = "root"; // default by XAMPP, change on online server
$dbPassword = ""; // default
$dbName = "loginsystem"; // name doesn't matter

// conn = connection, we connect to the system with this variable
$conn = mysqli_connect($dbservername, $dbUsername, $dbPassword, $dbName); // this is the order of the parameters

if(!$conn){
    die("Connection failed: ".mysqli_connect_error()); // nice name
}
?>