-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-mathis.alwaysdata.net
-- Generation Time: Dec 06, 2025 at 11:37 PM
-- Server version: 10.11.14-MariaDB
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mathis_aevoria`
--

-- --------------------------------------------------------

--
-- Table structure for table `affiliation`
--

CREATE TABLE `affiliation` (
  `id_affiliation` char(36) NOT NULL,
  `refferal_code` varchar(50) NOT NULL,
  `earning` decimal(10,2) DEFAULT 0.00,
  `create_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_requests`
--

CREATE TABLE `api_requests` (
  `id_api_requests` char(36) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `response_status` int(11) NOT NULL,
  `resquest_payload` text DEFAULT NULL,
  `response_payload` text DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id_articles` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `fk_id_author` char(36) DEFAULT NULL,
  `fk_id_category` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article_categories`
--

CREATE TABLE `article_categories` (
  `id_article_category` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article_comments`
--

CREATE TABLE `article_comments` (
  `id_article_comments` char(36) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `fk_id_articles` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_cart` char(36) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `id_cart_item` char(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `add_at` datetime DEFAULT NULL,
  `fk_id_cart` char(36) DEFAULT NULL,
  `fk_id_games` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `fk_id_user` char(36) NOT NULL,
  `fk_id_friend` char(36) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `friend_aliases`
--

CREATE TABLE `friend_aliases` (
  `id_friend_aliases` char(36) NOT NULL,
  `custom_name` varchar(50) NOT NULL,
  `create_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL,
  `fk_id_friend` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id_games` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT 0.00,
  `release_date` datetime NOT NULL,
  `installation_notes` text DEFAULT NULL,
  `ratings` float DEFAULT 0,
  `reviews_count` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games_tags`
--

CREATE TABLE `games_tags` (
  `fk_id_games` char(36) NOT NULL,
  `fk_id_tags` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games_user`
--

CREATE TABLE `games_user` (
  `fk_id_games` char(36) NOT NULL,
  `fk_id_user` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game_media`
--

CREATE TABLE `game_media` (
  `id_game_media` char(36) NOT NULL,
  `media_type` varchar(10) DEFAULT NULL,
  `media_url` text NOT NULL,
  `thumbnail_url` text DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `fk_id_games` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id_messages` char(36) NOT NULL,
  `content` text DEFAULT NULL,
  `message_type` varchar(20) NOT NULL,
  `create_at` datetime DEFAULT NULL,
  `fk_id_user_send` char(36) DEFAULT NULL,
  `fk_id_user_received` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscription`
--

CREATE TABLE `newsletter_subscription` (
  `id_newsletter_subscription` char(36) NOT NULL,
  `newsletter_token` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0,
  `subscribed_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id_notification` char(36) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_important` bit(1) DEFAULT b'0',
  `notification_type` varchar(50) DEFAULT NULL,
  `entity_type` varchar(50) DEFAULT NULL,
  `attached_file` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id_order` char(36) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_date` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `currency` varchar(3) DEFAULT 'USD',
  `updated_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id_order_item` char(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `fk_id_order` char(36) DEFAULT NULL,
  `fk_id_games` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id_reviews` char(36) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `review_text` text DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL,
  `fk_id_games` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_role` char(36) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id_tags` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` char(36) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_salt` varchar(255) NOT NULL,
  `subscription_type` varchar(50) NOT NULL DEFAULT 'free',
  `wallet_balance` decimal(10,2) DEFAULT 0.00,
  `language_preference` varchar(10) DEFAULT NULL,
  `provider` varchar(50) DEFAULT 'local',
  `created_at` datetime DEFAULT NULL,
  `fk_id_role` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_article_comments`
--

CREATE TABLE `user_article_comments` (
  `fk_id_user` char(36) NOT NULL,
  `fk_id_article_comments` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_notification`
--

CREATE TABLE `user_notification` (
  `fk_id_user` char(36) NOT NULL,
  `fk_id_notification` char(36) NOT NULL,
  `is_read` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transaction`
--

CREATE TABLE `wallet_transaction` (
  `id_wallet_transaction` char(36) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type_transaction` varchar(50) NOT NULL,
  `date_transaction` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id_wishlist` char(36) NOT NULL,
  `add_at` datetime DEFAULT NULL,
  `fk_id_user` char(36) DEFAULT NULL,
  `fk_id_games` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affiliation`
--
ALTER TABLE `affiliation`
  ADD PRIMARY KEY (`id_affiliation`),
  ADD UNIQUE KEY `refferal_code` (`refferal_code`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `api_requests`
--
ALTER TABLE `api_requests`
  ADD PRIMARY KEY (`id_api_requests`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id_articles`),
  ADD KEY `fk_id_author` (`fk_id_author`),
  ADD KEY `fk_id_category` (`fk_id_category`);

--
-- Indexes for table `article_categories`
--
ALTER TABLE `article_categories`
  ADD PRIMARY KEY (`id_article_category`);

--
-- Indexes for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD PRIMARY KEY (`id_article_comments`),
  ADD KEY `fk_id_articles` (`fk_id_articles`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id_cart_item`),
  ADD KEY `fk_id_cart` (`fk_id_cart`),
  ADD KEY `fk_id_games` (`fk_id_games`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`fk_id_user`,`fk_id_friend`),
  ADD KEY `fk_id_friend` (`fk_id_friend`);

--
-- Indexes for table `friend_aliases`
--
ALTER TABLE `friend_aliases`
  ADD PRIMARY KEY (`id_friend_aliases`),
  ADD KEY `fk_id_user` (`fk_id_user`),
  ADD KEY `fk_id_friend` (`fk_id_friend`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id_games`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `games_tags`
--
ALTER TABLE `games_tags`
  ADD PRIMARY KEY (`fk_id_games`,`fk_id_tags`),
  ADD KEY `fk_id_tags` (`fk_id_tags`);

--
-- Indexes for table `games_user`
--
ALTER TABLE `games_user`
  ADD PRIMARY KEY (`fk_id_games`,`fk_id_user`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `game_media`
--
ALTER TABLE `game_media`
  ADD PRIMARY KEY (`id_game_media`),
  ADD KEY `fk_id_games` (`fk_id_games`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_messages`),
  ADD KEY `fk_id_user_send` (`fk_id_user_send`),
  ADD KEY `fk_id_user_received` (`fk_id_user_received`);

--
-- Indexes for table `newsletter_subscription`
--
ALTER TABLE `newsletter_subscription`
  ADD PRIMARY KEY (`id_newsletter_subscription`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id_notification`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id_order_item`),
  ADD KEY `fk_id_order` (`fk_id_order`),
  ADD KEY `fk_id_games` (`fk_id_games`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id_reviews`),
  ADD KEY `fk_id_user` (`fk_id_user`),
  ADD KEY `fk_id_games` (`fk_id_games`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id_tags`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_id_role` (`fk_id_role`);

--
-- Indexes for table `user_article_comments`
--
ALTER TABLE `user_article_comments`
  ADD PRIMARY KEY (`fk_id_user`,`fk_id_article_comments`),
  ADD KEY `fk_id_article_comments` (`fk_id_article_comments`);

--
-- Indexes for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD PRIMARY KEY (`fk_id_user`,`fk_id_notification`),
  ADD KEY `fk_id_notification` (`fk_id_notification`);

--
-- Indexes for table `wallet_transaction`
--
ALTER TABLE `wallet_transaction`
  ADD PRIMARY KEY (`id_wallet_transaction`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id_wishlist`),
  ADD KEY `fk_id_user` (`fk_id_user`),
  ADD KEY `fk_id_games` (`fk_id_games`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `affiliation`
--
ALTER TABLE `affiliation`
  ADD CONSTRAINT `affiliation_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `api_requests`
--
ALTER TABLE `api_requests`
  ADD CONSTRAINT `api_requests_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`fk_id_author`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`fk_id_category`) REFERENCES `article_categories` (`id_article_category`);

--
-- Constraints for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD CONSTRAINT `article_comments_ibfk_1` FOREIGN KEY (`fk_id_articles`) REFERENCES `articles` (`id_articles`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`fk_id_cart`) REFERENCES `cart` (`id_cart`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`);

--
-- Constraints for table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`fk_id_friend`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `friend_aliases`
--
ALTER TABLE `friend_aliases`
  ADD CONSTRAINT `friend_aliases_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `friend_aliases_ibfk_2` FOREIGN KEY (`fk_id_friend`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `games_tags`
--
ALTER TABLE `games_tags`
  ADD CONSTRAINT `games_tags_ibfk_1` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `games_tags_ibfk_2` FOREIGN KEY (`fk_id_tags`) REFERENCES `tags` (`id_tags`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `games_user`
--
ALTER TABLE `games_user`
  ADD CONSTRAINT `games_user_ibfk_1` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `games_user_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `game_media`
--
ALTER TABLE `game_media`
  ADD CONSTRAINT `game_media_ibfk_1` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fk_id_user_send`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`fk_id_user_received`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `newsletter_subscription`
--
ALTER TABLE `newsletter_subscription`
  ADD CONSTRAINT `newsletter_subscription_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`fk_id_order`) REFERENCES `order` (`id_order`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`fk_id_role`) REFERENCES `roles` (`id_role`);

--
-- Constraints for table `user_article_comments`
--
ALTER TABLE `user_article_comments`
  ADD CONSTRAINT `user_article_comments_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_article_comments_ibfk_2` FOREIGN KEY (`fk_id_article_comments`) REFERENCES `article_comments` (`id_article_comments`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_notification`
--
ALTER TABLE `user_notification`
  ADD CONSTRAINT `user_notification_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_notification_ibfk_2` FOREIGN KEY (`fk_id_notification`) REFERENCES `notification` (`id_notification`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallet_transaction`
--
ALTER TABLE `wallet_transaction`
  ADD CONSTRAINT `wallet_transaction_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`fk_id_games`) REFERENCES `games` (`id_games`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
