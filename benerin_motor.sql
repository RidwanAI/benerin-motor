-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 02:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `benerin_motor`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `userId` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `productId`, `quantity`, `userId`, `totalPrice`) VALUES
(1, 11, 41, 6, 410000.00),
(22, 11, 1, 7, 10000.00),
(28, 17, 1, 7, 20000.00),
(29, 16, 1, 7, 20000.00),
(30, 15, 1, 7, 20000.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `specs` text DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `specs`, `label`, `stock`, `sold`, `rating`, `createdAt`, `updatedAt`) VALUES
(2, 'Ban motor baru', 'https://xmxpc86yeg.otospector.co.id/wp-content/uploads/2021/04/Ban-Bridgestone.jpg', '10000', 'Example specifications', 'New', 100, 0, 4.5, '2025-01-13 14:01:14', '2025-01-13 14:01:14'),
(11, 'Freya lucu bat es', 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/45/2024/06/01/sadgadgag-1142963797.jpg', '10000', 'Example specifications', 'New', 100, 0, 4.5, '2025-01-13 15:00:53', '2025-01-13 15:00:53'),
(12, 'Ella', 'https://i.pinimg.com/736x/19/a0/55/19a055f7665502a23c11f6590d966111.jpg', '10000', 'Example specifications', 'New', 100, 0, 4.5, '2025-01-13 15:03:34', '2025-01-13 15:03:34'),
(13, 'cakep jir', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'Rec', 100, 0, 4.5, '2025-01-13 15:19:23', '2025-01-13 15:19:23'),
(14, 'cakep jir', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'second', 100, 0, 4.5, '2025-01-13 15:38:08', '2025-01-13 15:38:08'),
(15, 'cakep jir', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'second', 100, 0, 4.5, '2025-01-13 15:38:10', '2025-01-13 15:38:10'),
(16, 'asli cakep', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'second', 100, 0, 4.5, '2025-01-13 15:38:16', '2025-01-13 15:38:16'),
(17, 'baru nih', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'new', 100, 0, 4.5, '2025-01-13 15:38:26', '2025-01-13 15:38:26'),
(18, 'baru nih', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'new', 100, 0, 4.5, '2025-01-13 15:59:59', '2025-01-13 15:59:59'),
(19, 'baru nih', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'new', 100, 0, 4.5, '2025-01-13 16:00:00', '2025-01-13 16:00:00'),
(20, 'recomend 1', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5, '2025-01-13 16:01:48', '2025-01-13 16:01:48'),
(21, 'recomend 2', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5, '2025-01-13 16:01:51', '2025-01-13 16:01:51'),
(22, 'recomend 3', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5, '2025-01-13 16:01:55', '2025-01-13 16:01:55'),
(23, 'recomend 4', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5, '2025-01-13 16:01:59', '2025-01-13 16:01:59'),
(24, 'recomend 5', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5, '2025-01-13 16:02:02', '2025-01-13 16:02:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(6, 'Muhammad Ridwan', 'ridwansmpl36@gmail.com', '$2b$10$wOZQd.Jg1I1jH.O7xmw5OOkWUJ9WRz4wd9Ja7aBglxcOoaln8b8NK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsIm5hbWUiOiJNdWhhbW1hZCBSaWR3YW4iLCJlbWFpbCI6InJpZHdhbnNtcGwzNkBnbWFpbC5jb20iLCJpYXQiOjE3MzY4MTE4MDksImV4cCI6MTczNjg5ODIwOX0.1E5T9RJ6mESo4TFzBURAtBxFoiKfJOYx03ma1GmbPu4', '2025-01-10 03:54:15', '2025-01-13 23:43:29'),
(7, 'FADILANO ABRAHAM', 'fadilanoa@gmail.com', '$2b$10$/.LAp9tDi5ekDdompVjN7.sY7T9QoJvx/Zj7OJBdW.Wbvyt6h1X0W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsIm5hbWUiOiJGQURJTEFOTyBBQlJBSEFNIiwiZW1haWwiOiJmYWRpbGFub2FAZ21haWwuY29tIiwiaWF0IjoxNzM2ODEzMTc5LCJleHAiOjE3MzY4OTk1Nzl9.OQ05xpGJVecOTzFKdQNEiXoYISQPlLr2TFFdKsLWvkY', '2025-01-13 01:57:01', '2025-01-14 00:06:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
