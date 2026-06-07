<?php
include "db.php";

$data=json_decode(file_get_contents("php://input"));

$id=$data->id;
$title=$data->title;
$description=$data->description;

$conn->query("UPDATE complaints
SET title='$title', description='$description'
WHERE id=$id");

echo json_encode(["success"=>true]);
?>