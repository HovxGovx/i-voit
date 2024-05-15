-- phpMyAdmin SQL Dump
-- version 5.2.1deb1ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 15, 2024 at 08:07 AM
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
  `destinaion` varchar(255) NOT NULL,
  `seats` int NOT NULL,
  `heure` time NOT NULL,
  `prix` int NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(9, 12, 'Point de départ 2', 'Point d\'arrivée 2', '2024-05-07', 4, 'Aucun', 'Aucun', '2024-05-06 18:35:31', '08:45:00', 5000);

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
(341, 9, '{\"username\":\"az\"}', '2024-04-25 16:30:35'),
(410, 2, '{\"username\":\"qw\"}', '2024-04-25 13:42:49'),
(1312, 9, '{\"username\":\"az\"}', '2024-04-25 14:36:10'),
(3098, 2, '{\"username\":\"qw\"}', '2024-05-10 12:21:59'),
(3359, 2, '{\"username\":\"qw\"}', '2024-05-07 18:35:49'),
(3394, 12, '{\"username\":\"projetIHM\"}', '2024-05-07 18:17:34'),
(3752, 2, '{\"username\":\"qw\"}', '2024-05-05 10:27:01'),
(4567, 9, '{\"username\":\"az\"}', '2024-05-05 11:43:59'),
(5365, 2, '{\"username\":\"qw\"}', '2024-05-09 19:39:31'),
(5660, 2, '{\"username\":\"qw\"}', '2024-04-25 13:11:49'),
(5735, 2, '{\"username\":\"qw\"}', '2024-04-26 07:12:49'),
(6513, 2, '{\"username\":\"qw\"}', '2024-04-27 16:51:58'),
(6983, 2, '{\"username\":\"qw\"}', '2024-05-10 23:07:27'),
(7433, 2, '{\"username\":\"qw\"}', '2024-05-09 23:07:17'),
(8324, 2, '{\"username\":\"qw\"}', '2024-05-06 18:16:57'),
(8575, 11, '{\"username\":\"a\"}', '2024-04-23 09:35:51'),
(8657, 2, '{\"username\":\"qw\"}', '2024-05-07 16:14:24'),
(8732, 2, '{\"username\":\"qw\"}', '2024-05-04 16:04:02'),
(8951, 2, '{\"username\":\"qw\"}', '2024-04-28 11:27:14'),
(9474, 2, '{\"username\":\"qw\"}', '2024-05-04 18:58:59'),
(9893, 11, '{\"username\":\"a\"}', '2024-04-22 09:35:44');

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
(9, 'az', 'az', NULL, 0, '2024-04-18 13:06:08'),
(10, 'Azerty', 'az', NULL, 0, '2024-04-18 13:47:28'),
(11, 'a', 'q', NULL, 0, '2024-04-22 09:27:46'),
(12, 'projetIHM', '12', NULL, 0, '2024-05-06 18:17:34');

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
  MODIFY `personneId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ridefeedback`
--
ALTER TABLE `ridefeedback`
  MODIFY `feedback_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rideoffer`
--
ALTER TABLE `rideoffer`
  MODIFY `offer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
