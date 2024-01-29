-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2023 at 04:48 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `code_user` int NOT NULL,
  `code_trajet` int NOT NULL,
  `nbr_place` int DEFAULT NULL,
  `date_reservation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`code_user`, `code_trajet`, `nbr_place`, `date_reservation`) VALUES
(47, 20, 2, '2023-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `trajet`
--

CREATE TABLE `trajet` (
  `code_trajet` int NOT NULL,
  `lieu_depart` varchar(255) DEFAULT NULL,
  `date_depart` date DEFAULT NULL,
  `heure_depart` time DEFAULT NULL,
  `createur` int DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `places_libre` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trajet`
--

INSERT INTO `trajet` (`code_trajet`, `lieu_depart`, `date_depart`, `heure_depart`, `createur`, `prix`, `destination`, `places_libre`) VALUES
(1, 'Skikda, Algeria', '2024-12-12', '05:22:00', 45, 100.00, 'Collo, Collo District, Skikda, Algeria', 2),
(2, 'Skikda, Algeria', '2024-12-12', '05:22:00', 45, 100.00, 'Collo, Collo District, Skikda, Algeria', 2),
(3, 'Skikda, Algeria', '2024-12-29', '17:29:00', 45, 100.00, 'Collo, Collo District, Skikda, Algeria', 2),
(4, 'Skikda, Skikda District, Skikda, Algeria', '2024-12-29', '17:35:00', 45, 100.00, 'Collo, Collo District, Skikda, 21200, Algeria', 2),
(5, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', '2024-12-29', '20:08:00', 45, 500.00, 'Hydra, Bir Mourad Rais District, Algiers, Algeria', 2),
(6, 'New, Owen County, Kentucky, United States', '2023-12-29', '18:34:00', 47, 500.00, 'New York, United States', 2),
(7, 'New, Owen County, Kentucky, United States', '2023-12-29', '18:36:00', 47, 100.00, 'New York, United States', 5),
(8, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', '2023-12-29', '18:38:00', 45, 500.00, 'Hydra, Bir Mourad Rais District, Algiers, Algeria', 2),
(9, 'New, Owen County, Kentucky, United States', '2023-12-29', '18:44:00', 47, 100.00, 'New York, United States', 1),
(10, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', '2023-12-29', '18:45:00', 45, 500.00, 'Hydra, Bir Mourad Rais District, Algiers, Algeria', 2),
(11, 'New, Owen County, Kentucky, United States', '2023-12-29', '18:47:00', 47, 100.00, 'New York, United States', 15),
(12, 'New, Owen County, Kentucky, United States', '2023-12-29', '18:48:00', 47, 100.00, 'New York, United States', 18),
(13, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', '2023-12-29', '18:52:00', 45, 500.00, 'Hydra, Bir Mourad Rais District, Algiers, Algeria', 20),
(14, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', '2023-12-29', '07:01:00', 45, 500.00, 'Hydra, Bir Mourad Rais District, Algiers, Algeria', 200),
(18, 'DDDD, Łąkoszyńska, Łąkoszyn, Kutno, Kutno County, Łódzkie Voivodship, 99-301, Poland', '2024-01-02', '05:10:00', 45, 444.00, 'ddd, wangchan, Chon Buri Province, Thailand', 55),
(19, 'Skikda, Skikda District, Skikda, Algeria', '2023-12-13', '20:02:00', 45, 1500.00, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', 4),
(20, 'Dar El Beïda, Dar el-Beida District, Algiers, Algeria', '2024-12-30', '20:04:00', 45, 1000.00, 'Bab Ezzouar, Dar el-Beida District, Algiers, Algeria', 4),
(21, 'Dar El Beïda, Dar el-Beida District, Algiers, Algeria', '2023-12-30', '10:36:00', 47, 10.00, 'New York, United States', 4),
(22, 'Dar El Beïda, Dar el-Beida District, Algiers, Algeria', '2024-01-03', '22:40:00', 47, 440.00, 'New York, United States', 5),
(23, 'Setif, Setif District, Setif, 19000, Algeria', '2024-01-05', '13:23:00', 45, 15.00, 'Algiers, Alger-Centre, Sidi M\'Hamed District, Algiers, 16007, Algeria', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `code_user` int NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `matricule` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`code_user`, `nom`, `prenom`, `email`, `matricule`, `tel`) VALUES
(39, 'ramssi', 'bacshsagha', 'aaasdss@gmail.com', '111ss1s44', '555ssss5'),
(41, 'ramssssi', 'bazzcshsagha', 'aaaaaasdss@gmail.com', '111ssdd1s44', '555ssddss5'),
(45, 'rami', 'bachagha', 'aaa@gmail.com', '202036001666', '0666320941'),
(46, 'ahmed ', 'beliid ', 'assaa@gmail.com', '2023599144', '05548663'),
(47, 'ahmed ', 'fethi ', 'ahmed@gmail.com', '202036555555', '0123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`code_user`,`code_trajet`),
  ADD KEY `code_trajet` (`code_trajet`);

--
-- Indexes for table `trajet`
--
ALTER TABLE `trajet`
  ADD PRIMARY KEY (`code_trajet`),
  ADD KEY `createur` (`createur`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`code_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `trajet`
--
ALTER TABLE `trajet`
  MODIFY `code_trajet` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `code_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`code_user`) REFERENCES `user` (`code_user`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`code_trajet`) REFERENCES `trajet` (`code_trajet`);

--
-- Constraints for table `trajet`
--
ALTER TABLE `trajet`
  ADD CONSTRAINT `trajet_ibfk_1` FOREIGN KEY (`createur`) REFERENCES `user` (`code_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
