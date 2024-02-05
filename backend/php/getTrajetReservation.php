<?php
session_start();

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true) {
    $user_id = $_SESSION["id"];

    if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["code_trajet"])) {
        require_once("./db_connect.php");

        // Sanitize the input to prevent SQL injection
        $code_trajet = mysqli_real_escape_string($conn, $_GET["code_trajet"]);

        // Query to retrieve reservations related to the specified code_trajet and user
        $sql = "SELECT r.date_reservation, r.nbr_place,
                u.nom, u.prenom, u.tel, u.matricule,u.tel
                FROM reservation r
                JOIN user u ON r.code_user = u.code_user
                JOIN trajet t ON r.code_trajet = t.code_trajet
                WHERE r.code_trajet = '$code_trajet'
                AND t.createur = '$user_id'";

        $result = $conn->query($sql);

        $reservations = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $reservations[] = $row;
            }
            $response = [
                'success' => true,
                'reservation' => $reservations
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'No reservations found for the specified trajet and user'
            ];
        }

        echo json_encode($response);
    }
}
?>
