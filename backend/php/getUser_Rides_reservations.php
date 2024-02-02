<?php

    session_start();
    if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"]== true ) { 
    
        $user_id = $_SESSION["id"];
        
        if($_SERVER["REQUEST_METHOD"] == "GET"){
                require_once ("./db_connect.php");
                $sql = "SELECT
              t.* , 
              COALESCE(SUM(r.nbr_place), 0) AS total_reserved_places
            FROM
                trajet t
            LEFT JOIN
                reservation r ON t.code_trajet = r.code_trajet 
            WHERE
                t.createur = $user_id 
            GROUP BY
                t.code_trajet 

            ;

                
                "; 
               $sql1 = "SELECT r.date_reservation, t.*, u.nom , u.prenom , u.tel , u.matricule 
         FROM reservation r 
         JOIN trajet t ON r.code_trajet = t.code_trajet
         JOIN user u ON t.createur = u.code_user
         WHERE r.code_user = $user_id";

                $result = $conn-> query($sql);
                
              
                $result1 = $conn-> query($sql1);
                $reservations = [] ; 
                $trajet = []; 
                if($result->num_rows > 0){
                    while ($row = $result->fetch_assoc()){
                    $trajet[] = $row; 
                 
                    }
                    $Trajet = [
                        'success' => true,
                        'trajet'=> $trajet
                    ];
                }
                else {
                    $Trajet = [
                        'success' => false,
                        'message' => 'No rides found'
                    ]; 
                }
            
                if($result1->num_rows > 0){
                    while ($row = $result1->fetch_assoc()){
                        $reservations[] = $row;
                    }; 
                    $Reservation = [
                        'success' => true,
                        'reservation'=> $reservations
                    ]; 
                }else {
                    $Reservation = [
                        'success' => false,
                        'message' => 'No reservations found'
                    ]; 

                
                }
                $response = [
                    
                    
                    'trajet' => $Trajet,
                    'reservation' => $Reservation
                ];
                echo json_encode($response);
            
            
            
                
            
            }
    }

     
?>
