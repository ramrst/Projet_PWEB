
<?php

session_start();
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true ) {
    // make connection to the database 
$servername = "localhost";
$username = "admin1";
$password = "admin1";
$database = "pweb"; // Replace with your actual database name

// Create a connection

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$session_id = $_SESSION["id"];
// just make asql query to get all the rides from the table trajet
$sql = "SELECT t.*, 
               COALESCE(SUM(r.	nbr_place), 0) AS total_reserved_seats,
               u.nom, u.prenom ,u.tel
        FROM trajet t
        LEFT JOIN reservation r ON t.code_trajet = r.code_trajet
        LEFT JOIN user u ON t.createur = u.code_user
        WHERE (t.createur<> $session_id
                 AND (t.date_depart > CURDATE() 
              OR (t.date_depart = CURDATE() AND t.heure_depart >= CURTIME())
              )
              )
        GROUP BY t.code_trajet 
        HAVING  t.places_libre > CAST(total_reserved_seats AS UNSIGNED)
        ";
$result = $conn->query($sql);
// check if the result is not empty
if ($result->num_rows > 0) {
    // output data of each row
    $rides = [];
    while($row = $result->fetch_assoc()) {
        $row['places_libre'] -= $row['total_reserved_seats'];
        $rides[] = $row;
    }
    $response = [
        'success' => true,
        'data' => $rides,
    ];
    
    echo json_encode( $response );
} else {
    echo json_encode( ['success'=>false ] );
}
$conn->close();
}
else{
    echo json_encode( ['error'=>"you're not logged in" ] );
    exit();

}
?>