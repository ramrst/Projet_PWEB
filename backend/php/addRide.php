
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
// check if the form is submitted using POST method
 if($_SERVER['REQUEST_METHOD'] == 'POST'){
     // get form data
     $depart = $_POST['departureInput'];
     $destination = $_POST['arrivalInput'];
     $date = $_POST['date_depart'];
     $heure = $_POST['time_depart'];
     $prix = $_POST['price'];
     $nbplace = $_POST['nbre_passager'];
     $code_user = $_SESSION['id'];
     // insert data into the 'ride' table

     // bind type of date is date = 
    $stmt = $conn->prepare("INSERT INTO `trajet` (lieu_depart,  date_depart, heure_depart, createur ,prix, destination,places_libre) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiisi", $depart,  $date, $heure, $code_user, $prix, $destination,$nbplace);
    if ($stmt->execute()) {
        $stmt->close();
        echo "<script>alert('Ride added successfully!')</script>";
        header("location: ../../Ridespage/ridespage.html");





        
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
