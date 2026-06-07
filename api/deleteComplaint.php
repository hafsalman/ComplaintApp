<?php
include "db.php";

$data=json_decode(file_get_contents("php://input"));

$id=$data->id;

$conn->query("DELETE FROM complaints WHERE id=$id");

echo json_encode(["success"=>true]);
?>