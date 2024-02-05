*

*
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
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $Firstname = $_POST['nom'];
        $Lastname = $_POST['prenom'];
        $Phone_Number =  $_POST['telephone'];
        $Student_ID = $_POST['matricule'];
        $Email = $_POST['email'];
        $Password = $_POST['password'];
        $ConfirmPassword = $_POST['confirm_password'];
    echo $Firstname;
    echo '' ;
    echo $Lastname;
    echo'' ;
    echo $Phone_Number;
    echo '';
    echo $Student_ID;
    echo '';
    echo $Email;
    echo '';
    echo $Password;
    echo '';
    echo $ConfirmPassword;


    // Check if all required fields are present
    if (
        isset($Firstname) && isset($Lastname)
         && isset($Phone_Number) && isset($Student_ID) 
         && isset($Email) && isset($Password) && isset($ConfirmPassword) 

        
    ) {
       

        // Perform password validation (check if Password and ConfirmPassword match)
        if ($Password != $ConfirmPassword) {
            // Passwords do not match
            echo "<script>alert('Password and Confirm Password do not match')</script>";
        } else {
            // Hash the password for security
           

            // Insert data into the 'user' table using prepared statement
            $stmt = $conn->prepare("INSERT INTO `user` (nom, prenom, email, matricule, tel) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $Firstname, $Lastname, $Email, $Student_ID, $Phone_Number);
            if ($stmt->execute()) {
                // Record inserted successfully
                echo "<script>alert('Record inserted successfully')</script>";

            } else {
                // Error inserting record
                echo "Error: " . $stmt->error;
                header('Location: loginpage.html');
            }
            // Close the statement
            $stmt->close();
        }
    } else {
        // Required fields are missing
        echo "<script>alert('All fields are required')</script>";
    }
}
// Close the connection
$conn->close();
?>