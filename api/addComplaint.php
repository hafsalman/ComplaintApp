<?php
include "db.php";

$data=json_decode(file_get_contents("php://input"));

$title=$data->title;
$description=$data->description;

$conn->query("INSERT INTO complaints(title,description,user_id)
VALUES('$title','$description',1)");

echo json_encode(["success"=>true]);
?>