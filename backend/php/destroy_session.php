<?php 
// destroy the session 
session_start();
if (isset($_SESSION['id'])) {
    session_destroy();
    unset($_SESSION['id']);
    unset($_SESSION['nom']);
    unset($_SESSION['prenom']);
    unset($_SESSION['email']);
    unset($_SESSION['matricule']);
    unset($_SESSION['tel']);

    echo "Vous êtes déconnecté";

     // delete the session variable
}else 
    echo "Vous n'êtes pas connecté";
    ?>




// destroy the session
