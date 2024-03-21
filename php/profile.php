<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');

require '../assets/vendor/autoload.php';

use MongoDB\Client;

// Connect to MongoDB
$client = new Client("mongodb://localhost:27017");
$collection = $client->guviDB->profile;

// Handle AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the raw POST data
    $rawData = file_get_contents('php://input');
    echo $rawData;
    // Attempt to decode the JSON data
    $data = json_decode($rawData, true);
    echo $data;
    // Check if JSON decoding was successful
    if ($data === null) {
        echo json_encode(['success' => false, 'message' => 'Failed to decode JSON data']);
        exit;
    }

    // Insert data into MongoDB
    $result = $collection->insertOne($data);

    if ($result->getInsertedCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to insert data']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve the username from the GET data
    $username = $_GET['username'];

    // Query MongoDB
    $result = $collection->findOne(['username' => $username]);

    // Prepare response data
    $responseData = ['exists' => false];
    if ($result) {
        $responseData['exists'] = true;
        $responseData['data'] = $result;
    }

    // Send JSON response
    echo json_encode($responseData);
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>