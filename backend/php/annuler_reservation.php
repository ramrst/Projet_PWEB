<?php 

session_start();

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true ) {
    // make connection to the database 
require_once ("./db_connect.php");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// check if the form is submitted using POST method
 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
   $code_trajet = $_POST['code_trajet'];
     
// remoe reservation from the 'reservation' table using the code_trajet
// prepare statement 
$stmt = $conn->prepare("DELETE FROM `reservation` WHERE code_trajet = ?");
$stmt->bind_param("i", $code_trajet);
    if ($stmt->execute()) {
        $stmt->close();
        echo "<script>alert('reservaion  removed successfully!')</script>";
        exit();

    }   else {
        echo "
        <script>
        alert('Error!');
        </script>";
        echo "Error: " . $stmt->error;
        exit();
    }

 }else{
    echo "<script>alert('Error!')</script>";
    exit();

 }
}
else{
    echo "<script>alert('You are not logged in!')</script>";
    exit();
}
?>