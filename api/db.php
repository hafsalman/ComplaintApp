<?php
$conn = new mysqli("localhost","root","","complaint_db",3306);

if($conn->connect_error){
    die("Connection failed");
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
?>