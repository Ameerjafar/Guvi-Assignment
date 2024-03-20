<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guvidb";

$name = $_POST['name'];
$email = $_POST['email'];
$UserPassword = $_POST['password'];

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$statement = $connection->prepare("INSERT INTO Users(name, email, password) VALUES (?, ?, ?)");
$statement->bind_param("sss", $name, $email, $UserPassword);
if($statement->execute() === TRUE) {
    echo "Registration successful";
} else {
    echo "Something went wrong: " . $connection->error;
}

$statement->close();
$connection->close();
?>
