<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');

require '../assets/vendor/autoload.php';

use MongoDB\Client;
use Predis\Client as RedisClient;

$redis = new RedisClient();
$redis->connect('127.0.0.1', 6379);

// Connect to MongoDB
$client = new Client("mongodb://localhost:27017");
$collection = $client->guviDB->profile;

// Handle AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the raw POST data
    $rawData = file_get_contents('php://input');

    // Attempt to decode the JSON data
    $data = json_decode($rawData, true);

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
    $email = $_GET['email'];
    $userData = $redis->hgetall($email);
    if (!empty($userData)) {
        // Data found in cache, return it
        echo json_encode(['usedredis'=>true,'exists' => true, 'data' => $userData]);
    } else {
        // Data not found in cache, query MongoDB
        $result = $collection->findOne(['email' => $email]);

        // Prepare response data
        $responseData = ['exists' => false];
        if ($result) {
            $responseData['exists'] = true;
            $responseData['data'] = $result;

            $jsonString = json_encode($result);
            $resultArray = json_decode($jsonString, true);

            // Store data in Redis cache for future requests
            $redis->hmset($email, $resultArray);
            $redis->expire($email, 3600); // Cache for 1 hour (adjust as needed)
        }
        // Send JSON response
        echo json_encode($responseData);
    }
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>