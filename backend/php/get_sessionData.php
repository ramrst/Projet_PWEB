
<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // send not allowed
    

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true) {
    // prepare data to be sent to JavaScript
    $sessionData = [
        'id' => $_SESSION['id'],
        'email' => $_SESSION['email'],
        'nom' => $_SESSION['nom'],
        'prenom' => $_SESSION['prenom'],
        'matricule' => $_SESSION['matricule'],
        'tel' => $_SESSION['tel'],
    ];
    $response = [
        'success' => true,
        'data' => $sessionData,
    ];
    // send data as JSON string
    echo json_encode($response);
} else {
    // send no user is logged in
    echo json_encode(['success' => false]);
}
} else {
    echo json_encode(['success'=> false]);
}

?>