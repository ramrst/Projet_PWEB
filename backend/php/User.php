<?php
 
$servername = "localhost";
$username = "admin1";
$password = "admin1";
$database = "pweb"; // Replace with your actual database name

// Create a connection

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Check if the form is submitted using POST method
// login and fetch data from the database
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $email = $_POST['email'];  // Adjusted variable name to match JavaScript
    echo $email;
    // Insert data into the 'user' table
    $sql = "SELECT * FROM `user` WHERE email='$email'";  // Adjusted variable name to match JavaScript
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch user data from the database
        $row = $result->fetch_assoc();
        session_start();
        // Assign session variables
        $_SESSION["loggedin"] = true;
        $_SESSION["id"] = $row['code_user'];
        $_SESSION["email"] = $row['email'];
        $_SESSION["nom"] = $row['nom'];
        $_SESSION["prenom"] = $row['prenom'];
        $_SESSION["matricule"] = $row['matricule'];
        $_SESSION["tel"] = $row['tel'];

        echo "<script>alert('Welcome " . $_SESSION['nom'] . " " . $_SESSION['prenom'] . "!');</script>";
        exit();
    } else {
        // Handle the case when the email is not found
        
        echo "<script>alert('Email is incorrect')</script>";
        exit();
    }
}
?>