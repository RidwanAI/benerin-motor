-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 12:57 PM
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
(45, 2, 1, 7, 10000.00);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `totalPrice` decimal(10,2) NOT NULL,
  `status` enum('Pending','Paid','Shipped','Completed') NOT NULL DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentProof` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `productId`, `quantity`, `totalPrice`, `status`, `createdAt`, `updatedAt`, `paymentProof`) VALUES
(5, 7, 11, 1, 10000.00, 'Paid', '2025-01-14 10:16:50', '2025-01-14 17:44:28', NULL),
(8, 7, 12, 1, 10000.00, 'Completed', '2025-01-14 10:19:40', '2025-01-14 17:45:13', NULL),
(9, 7, 2, 1, 10000.00, 'Shipped', '2025-01-14 10:34:23', '2025-01-14 17:45:08', NULL),
(10, 7, 11, 1, 10000.00, 'Pending', '2025-01-14 10:58:12', '2025-01-14 11:28:34', '/uploads/1736854114432-Ge_vw1za4AAKsQk.jpg'),
(11, 7, 17, 1, 20000.00, 'Pending', '2025-01-14 11:40:50', '2025-01-14 11:40:59', '/uploads/1736854859926-dc215a4754a190b83dccf88275f93345.jpg');

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
  `rating` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `specs`, `label`, `stock`, `sold`, `rating`) VALUES
(2, 'Ban motor baru', 'https://xmxpc86yeg.otospector.co.id/wp-content/uploads/2021/04/Ban-Bridgestone.jpg', '10000', 'Example specifications', 'New', 100, 0, 4.5),
(11, 'Freya lucu bat es', 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/45/2024/06/01/sadgadgag-1142963797.jpg', '10000', 'Example specifications', 'New', 100, 0, 4.5),
(12, 'Ella', 'https://i.pinimg.com/736x/19/a0/55/19a055f7665502a23c11f6590d966111.jpg', '10000', 'Example specifications', 'New', 100, 0, 4.5),
(13, 'cakep jir', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'Rec', 100, 0, 4.5),
(14, 'cakep jir', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'second', 100, 0, 4.5),
(15, 'cakep jir', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'second', 100, 0, 4.5),
(16, 'asli cakep', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'second', 100, 0, 4.5),
(17, 'baru nih', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'new', 100, 0, 4.5),
(18, 'baru nih', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'new', 100, 0, 4.5),
(19, 'baru nih', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'new', 100, 0, 4.5),
(20, 'recomend 1', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5),
(21, 'recomend 2', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5),
(22, 'recomend 3', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5),
(23, 'recomend 4', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5),
(24, 'recomend 5', 'https://i.pinimg.com/736x/43/5d/a1/435da1b8e7e03d4b9d200180cbca6fe0.jpg', '20000', 'spek idol', 'rec', 100, 0, 4.5);

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
(7, 'FADILANO ABRAHAM', 'fadilanoa@gmail.com', '$2b$10$/.LAp9tDi5ekDdompVjN7.sY7T9QoJvx/Zj7OJBdW.Wbvyt6h1X0W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsIm5hbWUiOiJGQURJTEFOTyBBQlJBSEFNIiwiZW1haWwiOiJmYWRpbGFub2FAZ21haWwuY29tIiwiaWF0IjoxNzM2ODUzNjc1LCJleHAiOjE3MzY5NDAwNzV9.3aTYOvPcMHOZ0Zy70cNSvmodRF6felPAr0AyotOmZMY', '2025-01-13 01:57:01', '2025-01-14 11:21:15');

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
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_18` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
