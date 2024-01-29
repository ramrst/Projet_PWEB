<?php
session_start();

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true) {
    // make connection to the database
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_POST['latitude']) && isset($_POST['longitude'])) {
            $_SESSION['user_location_lat'] = $_POST['latitude'];
            $_SESSION['user_location_lng'] = $_POST['longitude'];
            echo "<script>alert('Location saved! {$_POST['latitude']}')</script>";
        } else {
            echo "<script>alert('Error: Latitude and longitude not received')</script>";
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_SESSION['user_location_lat']) && isset($_SESSION['user_location_lng'])) {
            $response = [
                'success' => true,
                'data' => [
                    'latitude' => $_SESSION['user_location_lat'],
                    'longitude' => $_SESSION['user_location_lng'],
                ],
            ];
            echo json_encode($response);
        } else {
            echo json_encode(['success' => false, 'message' => 'User location not available']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
?>