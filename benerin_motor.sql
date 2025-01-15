-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jan 2025 pada 17.43
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

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
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Muhammad Ridwan', 'admin123@gmail.com', '$2a$12$LReeMdCDNZKomh4SjB7speIPgvcaiGkWUVRFQd1KPHs4.EkymT62G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJuYW1lIjoiTXVoYW1tYWQgUmlkd2FuIiwiZW1haWwiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzY5NTcxMDAsImV4cCI6MTczNzA0MzUwMH0.1TWf3hbG1pqCWX12I0GXucnvnS-nPd6m3KGLYdjDoRM', '2025-01-15 16:56:02', '2025-01-15 16:05:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `userId` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
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
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `userId`, `productId`, `quantity`, `totalPrice`, `status`, `createdAt`, `updatedAt`, `paymentProof`) VALUES
(19, 1, 1, 1, 0.00, 'Paid', '2025-01-15 09:13:49', '2025-01-15 11:02:06', '/uploads/1736932497556-transaksi 1.jpg'),
(20, 1, 2, 1, 0.00, 'Paid', '2025-01-15 09:13:49', '2025-01-15 15:12:16', '/uploads/1736932618720-Gambar WhatsApp 2024-12-02 pukul 11.43.42_a20e54c7.jpg'),
(21, 1, 3, 1, 0.00, 'Pending', '2025-01-15 10:59:10', '2025-01-15 10:59:10', NULL),
(22, 1, 11, 1, 0.00, 'Pending', '2025-01-15 10:59:10', '2025-01-15 10:59:10', NULL),
(23, 1, 4, 1, 0.00, 'Pending', '2025-01-15 10:59:10', '2025-01-15 10:59:10', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
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
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `specs`, `label`, `stock`, `sold`, `rating`) VALUES
(1, 'Shock Depan - Aerox/Nmax/PCX/ADV', 'https://down-id.img.susercontent.com/file/id-11134207-7r98p-llrct51uz1cc53', 'Rp.450.000', 'Shock depan untuk motor Yamaha Aerox, Nmax, Honda PCX, dan ADV dirancang untuk memberikan kenyamanan dan performa terbaik dalam setiap perjalanan. Dengan kualitas bahan yang kuat dan desain yang modern, shock depan ini membantu mengurangi guncangan dan menjaga kestabilan motor saat berkendara, membuat pengalaman berkendara Anda lebih nyaman dan aman.', 'New', 10, 3, 4.5),
(2, 'Velg - Aerox/Nmax Tromol Jari-Jari', 'https://down-id.img.susercontent.com/file/086482af3e9e9080fe93b6d259f54961', 'Rp.1.200.000', 'Velg tromol jari-jari untuk motor Yamaha Aerox dan Nmax dirancang untuk memberikan performa tinggi dan tampilan stylish. Dengan konstruksi kokoh dan desain aerodinamis, velg ini memberikan keseimbangan yang sempurna antara kekuatan dan keindahan. Dirancang untuk penggunaan motor matic, cocok untuk Anda yang mencari velg berkualitas untuk meningkatkan penampilan serta kenyamanan berkendara.', 'New', 3, 1, 4.5),
(3, 'Kampas Ganda - Beat/Vino/Mio', 'https://down-id.img.susercontent.com/file/id-11134201-7qul8-lk0rjkxwujpfb7', 'Rp.95.000', 'Kampas ganda belakang untuk motor Yamaha Beat, Vino, dan Mio dirancang untuk memberikan performa pengereman yang lebih baik dan aman. Dengan bahan yang berkualitas dan daya tahan tinggi, kampas ganda ini memberikan keseimbangan antara kekuatan dan kenyamanan dalam setiap pengereman. Cocok untuk penggantian atau upgrade sistem pengereman motor Anda.', 'New', 5, 2, 4.5),
(4, 'Bearing Ban Depan - Mio/Scoopy/Vega R', 'https://filebroker-cdn.lazada.co.id/kf/S3860d2c7fce94a2ea41eef19f0f82375H.jpg', 'Rp.55.000', 'Bearing ban depan untuk motor Yamaha Mio, Scoopy, dan sejenisnya, dirancang untuk memberikan kenyamanan dan performa terbaik saat berkendara. Bearing ini memiliki kualitas tinggi yang membuat sistem roda depan motor Anda bekerja dengan lancar dan stabil.\r\n\r\n', 'New', 7, 2, 4.8),
(5, 'Rantai Motor - Jupiter MX/Jupiter Z', 'https://tse4.mm.bing.net/th?id=OIP.g5_XRN1udg7hhYqd4JWXdQHaH3&rs=1&pid=ImgDetMain', 'Rp.35.000', 'Rantai motor untuk Yamaha Jupiter MX dan Z dirancang untuk memberikan performa terbaik dalam mendukung kelancaran pergerakan mesin dan transmisi motor. Dengan kualitas tinggi dan daya tahan yang luar biasa, rantai ini memastikan kenyamanan dan keselamatan berkendara Anda.', 'New', 4, 3, 4.6),
(6, 'Soket Spull - Aerox/Nmax/PCX/ADV', 'https://filebroker-cdn.lazada.co.id/kf/Sa885be4a9a49445485b3ab32817128deO.jpg', 'Rp.20.000', 'Soket spull adalah komponen penting yang menghubungkan sistem kelistrikan motor, terutama pada sistem pengapian dan pengisian daya aki. Soket spull untuk Yamaha Aerox, Nmax, PCX, dan ADV dirancang untuk memberikan sambungan yang kuat dan stabil antara spull dan sistem kelistrikan lainnya. Komponen ini sangat penting untuk memastikan performa mesin yang optimal dan pengisian daya aki yang efisien.', 'Second', 11, 8, 4.7),
(7, 'CVT - Nmax/Aerox/PCX', 'https://a.cdn-myedisi.com/z_article/otoplus-599a6b2a04dee.jpg', 'Rp.1.500.000', 'CVT (Continuous Variable Transmission) adalah sistem transmisi otomatis yang memberikan kenyamanan berkendara dengan perubahan gigi yang halus dan tanpa hentakan. CVT untuk Yamaha Nmax, Aerox, dan PCX ini dirancang untuk menggantikan komponen transmisi yang sudah aus, serta meningkatkan performa motor dalam hal akselerasi dan efisiensi bahan bakar. CVT ini dapat meningkatkan kenyamanan dan pengalaman berkendara Anda, terutama pada motor-motor Yamaha dengan transmisi otomatis.', 'Second', 14, 9, 4.9),
(8, 'Roller 9/10/11/12g TDR - Beat/Zenio/Aerox/Nmax', 'https://oneteamstore.com/image/cache/data/product/TDR/Clutch%20and%20Transmission%20Systems/roller/new-pcx-150-1080x1080.jpg', 'Rp.47.000', 'Roller TDR adalah komponen penting pada sistem CVT motor yang berfungsi untuk mengatur perubahan rasio gigi dan meningkatkan akselerasi. Roller 9/10/11/12g TDR dirancang untuk motor Yamaha seperti Beat, Zenio, Aerox, dan Nmax. Penggantian roller ini akan memberikan dampak langsung pada performa motor, meningkatkan respons gas, akselerasi yang lebih baik, dan penghematan bahan bakar. TDR adalah merek yang terkenal dengan kualitas dan ketahanan tinggi.', 'Second', 13, 8, 4.8),
(9, 'Cover Air Radiator - Aerox/Nmax', 'https://lzd-img-global.slatic.net/g/p/68df2370fd4e31657e0b3a3246faf011.jpg_720x720q80.jpg', 'Rp.40.000', 'Cover Air Radiator adalah komponen yang melindungi sistem pendinginan pada motor dari debu, kotoran, dan benda asing yang bisa mengganggu aliran udara dan pendinginan mesin. Cover ini dirancang untuk Yamaha Aerox dan Nmax, memberikan perlindungan lebih terhadap radiator serta memberikan tampilan yang lebih menarik dan sporty. Dapatkan performa mesin yang optimal dengan penggunaan Cover Air Radiator yang tepat.\r\n\r\n', 'Second', 9, 8, 4.7),
(10, 'Lampu Depan LED - Aerox/Nmax/Vario', 'https://cf.shopee.co.id/file/398ec6a0013ffdc5f7328e0c3d534c3e', 'Rp.250.000', 'Lampu depan LED ini memberikan penerangan yang lebih terang dan efisien untuk Yamaha Aerox, Nmax, dan Vario. Dengan desain modern dan teknologi LED, lampu ini memberikan tampilan motor yang lebih stylish serta meningkatkan visibilitas berkendara di malam hari.', 'Second', 3, 1, 4.3),
(11, 'Spion Motor - Mio/Fino/Nmax', 'https://down-id.img.susercontent.com/file/5694516553df151ea37aab653bf40f98', 'Rp.150.000', 'Spion motor dengan desain elegan dan fungsi tinggi ini cocok untuk Yamaha Mio, Fino, dan Nmax. Terbuat dari material kokoh dan tahan lama, spion ini memberikan visibilitas optimal untuk keselamatan berkendara.', 'Rec', 11, 3, 4.6),
(12, 'Filter Udara - Aerox/Nmax/R15', 'https://cf.shopee.co.id/file/sg-11134201-23010-gkyissyws9lvdf', 'Rp.100.000', 'Filter udara untuk Yamaha Aerox, Nmax, dan R15 ini memiliki daya saring tinggi, menjaga mesin tetap bersih dari kotoran dan debu. Penggunaan filter udara berkualitas ini meningkatkan performa mesin, efisiensi bahan bakar, dan umur motor secara keseluruhan.', 'Rec', 10, 5, 4.4),
(13, 'Kabel Rem - Mio/Nmax/Aerox', 'https://lzd-img-global.slatic.net/g/p/c82b9d68f7cd303abf571401c8e1fde8.jpg_720x720q80.jpg', 'Rp.55.000', 'Kabel rem berkualitas tinggi untuk Yamaha Mio, Nmax, dan Aerox ini menjamin kinerja pengereman yang responsif dan kuat. Dengan bahan kabel yang tahan lama dan anti-korosi, kabel rem ini menjadi pilihan tepat untuk penggantian atau perawatan motor.', 'Rec', 6, 2, 4.7),
(14, 'Filter Oli - Nmax/Aerox/PCX', 'https://id-test-11.slatic.net/p/b2eb2ed5435c884cc7c549913465c0cb.jpg', 'Rp.75.000', 'Filter oli untuk Yamaha Nmax, Aerox, dan PCX berfungsi menyaring kotoran dan partikel dari oli mesin, menjaga agar oli tetap bersih dan mesin tetap bekerja optimal. Penggantian filter oli secara rutin meningkatkan umur mesin dan kinerja motor.', 'Rec', 2, 1, 4.2),
(15, 'Karet Handle Grip - Nmax/Aerox/PCX', 'https://down-id.img.susercontent.com/file/17a675b3de05b178b45ca0c96e3a4759', 'Rp.44.000', 'Karet handle grip ini memberikan kenyamanan ekstra saat berkendara dengan Yamaha Nmax, Aerox, dan PCX. Terbuat dari bahan karet berkualitas tinggi, grip ini memberikan pegangan yang mantap dan anti-slip, sehingga Anda bisa berkendara lebih aman dan nyaman.', 'Rec', 18, 11, 4.8);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Muhammad Ridwan', 'ridwansmpl36@gmail.com', '$2b$10$wOZQd.Jg1I1jH.O7xmw5OOkWUJ9WRz4wd9Ja7aBglxcOoaln8b8NK', NULL, '2025-01-10 03:54:15', '2025-01-15 15:13:53'),
(2, 'Fadilano Abraham', 'fadilanoa@gmail.com', '$2b$10$/.LAp9tDi5ekDdompVjN7.sY7T9QoJvx/Zj7OJBdW.Wbvyt6h1X0W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsIm5hbWUiOiJGQURJTEFOTyBBQlJBSEFNIiwiZW1haWwiOiJmYWRpbGFub2FAZ21haWwuY29tIiwiaWF0IjoxNzM2ODUzNjc1LCJleHAiOjE3MzY5NDAwNzV9.3aTYOvPcMHOZ0Zy70cNSvmodRF6felPAr0AyotOmZMY', '2025-01-13 01:57:01', '2025-01-14 11:21:15'),
(3, 'Achmad Rizky', 'achmadrizky@gmail.com', '$2b$10$vQLU8hcyqs2XQuDxxSnaEenq2joXgNPaKqFmMTkszl0HXCXCg0jgG', NULL, '2025-01-14 15:35:38', '2025-01-14 18:16:02'),
(10, 'Muhammad Ridwan', 'admin@gmail.com', '$2b$10$3UAzMjirE67iWVk5iPxHB.pniz4DvxY4dHbG3awCSIL3g2HAZFvB6', NULL, '2025-01-15 14:20:05', '2025-01-15 14:20:05');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`);

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_95` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_96` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
