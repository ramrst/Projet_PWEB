<?php
session_start();

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true ) {
    // make connection to the database 
    $servername = "localhost";
    $username = "admin1";
    $password = "admin1";
    $database = "pweb";

    $conn = mysqli_connect($servername, $username, $password, $database);
    if (mysqli_connect_errno()) {
        die("Connection failed: " . mysqli_connect_error());
    }

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['code_trajet']) && isset($_POST['code_user']) && isset($_POST['date_reservation']) && isset($_POST['nombre_places'])) {
        $ride = $_POST['code_trajet'];
        $rider = $_POST['code_user'];
        $reservation_date = $_POST['date_reservation'];
        $reserved_seats = $_POST['nombre_places'];

        $sql = "INSERT INTO reservation ( code_user, code_trajet, nbr_place, date_reservation ) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        $stmt->bind_param("iiis", $rider, $ride, $reserved_seats, $reservation_date);
        if ($stmt->execute()) {
            echo "Reservation effectuée avec succès!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Invalid request!";
    }

    mysqli_close($conn);
}
?>
