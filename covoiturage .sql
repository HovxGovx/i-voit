-- phpMyAdmin SQL Dump
-- version 5.2.1deb1ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 21, 2024 at 07:36 AM
-- Server version: 8.0.36-0ubuntu0.23.10.1
-- PHP Version: 8.2.10-2ubuntu1

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

-- --------------------------------------------------------

--
-- Table structure for table `city_locations`
--

CREATE TABLE `city_locations` (
  `location_id` int NOT NULL,
  `location_name` varchar(255) NOT NULL
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
  `departure_datetime` timestamp NOT NULL,
  `available_seats` int NOT NULL,
  `car_details` text,
  `preferences` text,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rideoffer`
--

INSERT INTO `rideoffer` (`offer_id`, `user_id`, `origin`, `destination`, `departure_datetime`, `available_seats`, `car_details`, `preferences`, `creation_date`) VALUES
(1, 2, 'A', 'B', '2024-04-22 05:30:00', 3, 'QDFQ', 'QSFQ', '2024-04-20 21:08:05'),
(2, 2, 'B', 'A', '2024-04-22 05:35:00', 4, 'sqdfs', 'qsdgqsg', '2024-04-21 07:05:58');

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
(989, 2, '{\"username\":\"qw\"}', '2024-04-20 21:13:32'),
(2814, 2, '{\"username\":\"qw\"}', '2024-04-21 20:37:50'),
(4131, 2, '{\"username\":\"qw\"}', '2024-04-22 05:56:10'),
(4172, 2, '{\"username\":\"qw\"}', '2024-04-21 20:56:11'),
(4849, 2, '{\"username\":\"qw\"}', '2024-04-21 17:56:33'),
(6141, 2, '{\"username\":\"qw\"}', '2024-04-21 19:45:05'),
(6531, 2, '{\"username\":\"qw\"}', '2024-04-18 17:41:13'),
(6577, 2, '{\"username\":\"qw\"}', '2024-04-20 17:13:44'),
(6663, 2, '{\"username\":\"qw\"}', '2024-04-18 17:01:58'),
(9280, 2, '{\"username\":\"qw\"}', '2024-04-21 12:33:36'),
(9374, 2, '{\"username\":\"qw\"}', '2024-04-20 17:56:12');

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
(10, 'Azerty', 'az', NULL, 0, '2024-04-18 13:47:28');

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
  MODIFY `booking_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `city_locations`
--
ALTER TABLE `city_locations`
  MODIFY `location_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ridefeedback`
--
ALTER TABLE `ridefeedback`
  MODIFY `feedback_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rideoffer`
--
ALTER TABLE `rideoffer`
  MODIFY `offer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `riderequest`
--
ALTER TABLE `riderequest`
  MODIFY `request_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usercocovoiturage`
--
ALTER TABLE `usercocovoiturage`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
