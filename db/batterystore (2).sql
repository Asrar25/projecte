-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2026 at 01:17 PM
-- Server version: 9.3.0
-- PHP Version: 8.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `batterystore`
--

-- --------------------------------------------------------

--
-- Table structure for table `batteries`
--

CREATE TABLE `batteries` (
  `id` bigint UNSIGNED NOT NULL,
  `userID` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `brand` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `capacity` varchar(246) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `voltage` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batteries`
--

INSERT INTO `batteries` (`id`, `userID`, `name`, `description`, `brand`, `model`, `capacity`, `voltage`, `price`, `stock_quantity`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
(13, 6, 'Battery 1', 'Full TIme life full Warenty', NULL, NULL, NULL, NULL, 200.00, 2, 'images/laptop_155931.jpg', 1, '2025-05-29 10:29:31', '2025-05-29 10:29:31'),
(14, 6, 'Battery 2', 'Check Descripton or contact me 9823456781', NULL, NULL, NULL, NULL, 500.00, 1, 'images/newLight_160008.png', 2, '2025-05-29 10:30:08', '2025-05-29 10:30:08'),
(15, 7, 'Battery 3', 'CHeking below or DM me', NULL, NULL, NULL, NULL, 1000.00, 4, 'images/image_160523.png', 2, '2025-05-29 10:35:23', '2025-05-29 10:35:23'),
(16, 8, 'Akbar Check', 'FUll Warenty card', 'Hunday', '2023', '50W', '23CC', 500.00, 2, 'images/mivi2_184606.jpg', 3, '2025-05-29 13:16:06', '2025-05-29 13:16:06'),
(17, 7, 'HeadSet', 'dlkdnv', 'Mivi', '2012', '55V', '20WW', 500.00, 1, 'images/image_070833.png', 2, '2025-06-05 01:38:33', '2025-06-05 01:38:33');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `userID` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'HW Battery', '2025-05-29 10:28:30', '2025-05-29 10:28:30'),
(2, 'Car Battery', '2025-05-29 10:28:38', '2025-05-29 10:28:38'),
(3, 'Bike Battery', '2025-05-29 10:28:44', '2025-05-29 10:28:44');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `source` bigint UNSIGNED NOT NULL,
  `destination` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `price`, `source`, `destination`, `created_at`, `updated_at`) VALUES
(1, 15, 1000.00, 7, 6, '2025-05-29 16:15:46', '2025-05-29 16:15:46'),
(2, 13, 200.00, 6, 7, '2025-05-29 16:17:34', '2025-05-29 16:17:34'),
(3, 14, 500.00, 6, 7, '2025-05-29 16:18:03', '2025-05-29 16:18:03'),
(4, 15, 3000.00, 7, 6, '2025-05-29 17:09:05', '2025-05-29 17:09:05'),
(5, 13, 200.00, 6, 7, '2025-05-29 17:21:25', '2025-05-29 17:21:25'),
(6, 15, 1000.00, 7, 6, '2025-05-29 17:31:41', '2025-05-29 17:31:41'),
(7, 15, 2000.00, 7, 6, '2025-05-29 17:43:45', '2025-05-29 17:43:45'),
(8, 13, 200.00, 6, 7, '2025-05-29 18:34:26', '2025-05-29 18:34:26'),
(9, 16, 1500.00, 8, 7, '2025-05-29 18:49:23', '2025-05-29 18:49:23'),
(10, 13, 400.00, 6, 7, '2025-06-05 07:09:52', '2025-06-05 07:09:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mobileNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `mobileNo`, `address`, `created_at`, `updated_at`) VALUES
(6, 'Asa', 'a@ail.com', '123456', '1234567890', 'Chennai,TVM', '2025-05-29 10:26:53', '2025-05-29 10:26:53'),
(7, 'Asarar', 'asaasrar786@gmail.com', '123456', '1234567890', 'Guindy,Chennai', '2025-05-29 10:34:15', '2025-05-29 10:34:15'),
(8, 'Akbar', 'akbarheera786@gmail.com', '123456', '8122481515', 'Strret,Tiruvannamalai', '2025-05-29 13:12:43', '2025-05-29 13:12:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batteries`
--
ALTER TABLE `batteries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `from` (`source`),
  ADD KEY `to` (`destination`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batteries`
--
ALTER TABLE `batteries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `batteries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`source`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`destination`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
