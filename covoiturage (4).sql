-- phpMyAdmin SQL Dump
-- version 5.2.1deb1ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 17, 2024 at 09:28 PM
-- Server version: 8.0.36-0ubuntu0.23.10.1
-- PHP Version: 8.2.10-2ubuntu2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covoiturage`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int NOT NULL,
  `ride_id` int NOT NULL,
  `passenger_id` int NOT NULL,
  `booking_status` varchar(20) NOT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `ride_id`, `passenger_id`, `booking_status`, `booking_date`) VALUES
(1, 1, 2, 'pending', '2024-04-21 14:20:13'),
(2, 1, 9, 'pending', '2024-04-21 14:23:24'),
(3, 4, 2, 'pending', '2024-04-21 16:50:07'),
(4, 5, 9, 'pending', '2024-04-24 17:47:43'),
(5, 8, 9, 'pending', '2024-04-25 15:11:18'),
(6, 9, 2, 'pending', '2024-05-09 18:06:57');

-- --------------------------------------------------------

--
-- Table structure for table `city_locations`
--

CREATE TABLE `city_locations` (
  `location_id` int NOT NULL,
  `location_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `city_locations`
--

INSERT INTO `city_locations` (`location_id`, `location_name`) VALUES
(1, 'Point de départ 1'),
(2, 'Point de départ 2'),
(3, 'Point de départ 3'),
(4, 'Point d\'arrivée 1'),
(5, 'Point d\'arrivée 2'),
(6, 'Point d\'arrivée 3');

-- --------------------------------------------------------

--
-- Table structure for table `personne`
--

CREATE TABLE `personne` (
  `personneId` int NOT NULL,
  `origin` varchar(255) NOT NULL,
  `destination` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `seats` int NOT NULL,
  `heure` time NOT NULL,
  `prix` int NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `departure_datetime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `personne`
--

INSERT INTO `personne` (`personneId`, `origin`, `destination`, `seats`, `heure`, `prix`, `creationDate`, `user_id`, `departure_datetime`) VALUES
(11, 'Paris', 'Lyon', 3, '09:00:00', 5000, '2024-05-15 12:01:21', 9, '2024-06-25'),
(12, 'Lyon', 'Marseille', 2, '11:30:00', 4500, '2024-05-15 12:01:21', 12, '2024-06-05'),
(13, 'Marseille', 'Nice', 4, '13:45:00', 3500, '2024-05-15 12:01:21', 9, '2024-05-17'),
(14, 'Nice', 'Toulouse', 3, '16:20:00', 6000, '2024-05-15 12:01:21', 10, '2024-05-18'),
(15, 'Toulouse', 'Bordeaux', 2, '19:00:00', 40500, '2024-05-15 12:01:21', 11, '2024-05-19'),
(16, 'Point de départ 3', 'Point de départ 2', 3, '06:55:00', 25000, '2024-05-17 00:41:55', 12, '2024-05-28');

-- --------------------------------------------------------

--
-- Table structure for table `ridefeedback`
--

CREATE TABLE `ridefeedback` (
  `feedback_id` int NOT NULL,
  `ride_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `feedback_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rideoffer`
--

CREATE TABLE `rideoffer` (
  `offer_id` int NOT NULL,
  `user_id` int NOT NULL,
  `origin` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `departure_datetime` date NOT NULL,
  `available_seats` int NOT NULL,
  `car_details` text,
  `preferences` text,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `heure` time NOT NULL,
  `prix` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rideoffer`
--

INSERT INTO `rideoffer` (`offer_id`, `user_id`, `origin`, `destination`, `departure_datetime`, `available_seats`, `car_details`, `preferences`, `creation_date`, `heure`, `prix`) VALUES
(1, 2, 'A', 'B', '2024-04-22', 3, 'QDFQ', 'QSFQ', '2024-04-20 21:08:05', '00:00:00', 5000),
(2, 2, 'B', 'A', '2024-04-22', 4, 'sqdfs', 'qsdgqsg', '2024-04-21 07:05:58', '00:00:00', 4500),
(3, 2, 'Point de départ 2', 'Point d\'arrivée 2', '2024-04-22', 4, 'azerty', 'aucun', '2024-04-21 08:35:47', '00:00:00', 5000),
(4, 2, 'Point d\'arrivée 2', 'Point de départ 2', '2024-04-23', 2, 'peugeot', 'aucun', '2024-04-21 08:37:07', '00:00:00', 3500),
(5, 2, 'Point d\'arrivée 2', 'Point de départ 3', '2024-04-21', 2, 'aucun', 'aucun', '2024-04-21 12:13:16', '03:06:00', 4000),
(6, 2, 'Point de départ 3', 'Point de départ 2', '2024-04-21', 2, 'aucun', 'aucun', '2024-04-21 12:15:37', '04:56:00', 50000),
(7, 8, 'Point de départ 2', 'Point de départ 3', '2024-04-22', 3, 'aucun', 'aucun', '2024-04-21 12:17:43', '16:55:00', 60000),
(8, 2, 'Point d\'arrivée 1', 'Point d\'arrivée 2', '2024-04-25', 4, 'Aucun', 'Aucun', '2024-04-24 14:20:07', '19:15:00', 7000),
(9, 12, 'Point de départ 2', 'Point d\'arrivée 2', '2024-05-07', 4, 'Aucun', 'Aucun', '2024-05-06 18:35:31', '08:45:00', 5000),
(10, 12, 'Point de départ 2', 'Point de départ 3', '2024-05-16', 4, 'Aucun', 'Aucun', '2024-05-15 15:07:50', '00:00:00', 25000),
(11, 2, 'Point de départ 2', 'Point d\'arrivée 2', '2024-05-20', 4, 'Aucun', 'Aucun', '2024-05-16 20:14:04', '16:55:00', 25000),
(12, 2, 'Point d\'arrivée 2', 'Point de départ 2', '2024-05-23', 4, 'Aucun', 'Aucun', '2024-05-16 21:25:10', '07:07:00', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `riderequest`
--

CREATE TABLE `riderequest` (
  `request_id` int NOT NULL,
  `ride_id` int NOT NULL,
  `user_id` int NOT NULL,
  `request_status` varchar(20) NOT NULL,
  `request_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` int NOT NULL,
  `user_id` int NOT NULL,
  `data` text,
  `expires` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `user_id`, `data`, `expires`) VALUES
(8, 12, '{\"username\":\"projetIHM\"}', '2024-05-16 23:10:58'),
(2830, 2, '{\"username\":\"qw\"}', '2024-05-17 21:37:21'),
(4216, 2, '{\"username\":\"qw\"}', '2024-05-18 19:44:32'),
(4686, 2, '{\"username\":\"qw\"}', '2024-05-17 21:42:09'),
(5629, 2, '{\"username\":\"qw\"}', '2024-05-16 23:24:32'),
(9867, 2, '{\"username\":\"qw\"}', '2024-05-16 21:52:10'),
(9942, 12, '{\"username\":\"projetIHM\"}', '2024-05-16 21:42:01');

-- --------------------------------------------------------

--
-- Table structure for table `usercocovoiturage`
--

CREATE TABLE `usercocovoiturage` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usercocovoiturage`
--

INSERT INTO `usercocovoiturage` (`user_id`, `username`, `password`, `phone_number`, `is_admin`, `registration_date`) VALUES
(2, 'qw', '12', '12', 0, '2024-04-15 16:14:37'),
(8, 'as', 'zx', '12', 0, '2024-04-15 23:06:35'),
(9, 'az', 'az', '034568910', 0, '2024-04-18 13:06:08'),
(10, 'Azerty', 'az', '0334567890', 0, '2024-04-18 13:47:28'),
(11, 'a', 'q', '032145689', 0, '2024-04-22 09:27:46'),
(12, 'projetIHM', '12', '0389012345', 0, '2024-05-06 18:17:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `ride_id` (`ride_id`),
  ADD KEY `passenger_id` (`passenger_id`);

--
-- Indexes for table `city_locations`
--
ALTER TABLE `city_locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `personne`
--
ALTER TABLE `personne`
  ADD PRIMARY KEY (`personneId`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ridefeedback`
--
ALTER TABLE `ridefeedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `ride_id` (`ride_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rideoffer`
--
ALTER TABLE `rideoffer`
  ADD PRIMARY KEY (`offer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `riderequest`
--
ALTER TABLE `riderequest`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `ride_id` (`ride_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `usercocovoiturage`
--
ALTER TABLE `usercocovoiturage`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `city_locations`
--
ALTER TABLE `city_locations`
  MODIFY `location_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personne`
--
ALTER TABLE `personne`
  MODIFY `personneId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ridefeedback`
--
ALTER TABLE `ridefeedback`
  MODIFY `feedback_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rideoffer`
--
ALTER TABLE `rideoffer`
  MODIFY `offer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `riderequest`
--
ALTER TABLE `riderequest`
  MODIFY `request_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usercocovoiturage`
--
ALTER TABLE `usercocovoiturage`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rideoffer` (`offer_id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`passenger_id`) REFERENCES `usercocovoiturage` (`user_id`);

--
-- Constraints for table `personne`
--
ALTER TABLE `personne`
  ADD CONSTRAINT `persone_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usercocovoiturage` (`user_id`);

--
-- Constraints for table `ridefeedback`
--
ALTER TABLE `ridefeedback`
  ADD CONSTRAINT `ridefeedback_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rideoffer` (`offer_id`),
  ADD CONSTRAINT `ridefeedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usercocovoiturage` (`user_id`);

--
-- Constraints for table `rideoffer`
--
ALTER TABLE `rideoffer`
  ADD CONSTRAINT `rideoffer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usercocovoiturage` (`user_id`);

--
-- Constraints for table `riderequest`
--
ALTER TABLE `riderequest`
  ADD CONSTRAINT `riderequest_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rideoffer` (`offer_id`),
  ADD CONSTRAINT `riderequest_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usercocovoiturage` (`user_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usercocovoiturage` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
