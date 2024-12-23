-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2024 at 07:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `topic_metadata`
--

-- --------------------------------------------------------

--
-- Table structure for table `tc`
--

CREATE TABLE `tc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `topics` mediumtext NOT NULL,
  `pageNumber` tinytext NOT NULL,
  `pdfPath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tc`
--

INSERT INTO `tc` (`id`, `topics`, `pageNumber`, `pdfPath`) VALUES
(1, 'What is communication?', '', ''),
(2, 'check', '', 'Aashana Certificate AWS skill Builder.pdf'),
(3, 'String', '1', 'string.pdf'),
(4, 'String constant', '', 'string.pdf'),
(5, 'Declaration of String', '', 'string.pdf'),
(6, 'Difference between array and string', '', 'string.pdf'),
(7, 'Initialization of String', '', 'string.pdf'),
(8, 'String handling function', '', 'string.pdf'),
(9, 'strlen', '', 'string.pdf'),
(10, 'strcpy', '', 'string.pdf'),
(11, 'strrev', '', 'string.pdf'),
(12, 'strcat', '6', 'string.pdf'),
(13, 'strcmp', '', 'string.pdf'),
(14, 'Palindrome checking', '', 'string.pdf'),
(15, 'Rearranging names in ascending order', '', 'string.pdf'),
(16, 'Counting characters and words in a string', '', 'string.pdf'),
(17, 'Define CV, Resume and Bio-data.', '1', 'TC/Unit-2/IMPORTANT QUESTION/TC UNIT 2 EXERCISE 1.pdf'),
(18, 'Differentiate between CV & Resume.', '2', 'TC/Unit-2/IMPORTANT QUESTION/TC UNIT 2 EXERCISE 1.pdf'),
(19, 'Explain various types of resumes and guidelines for writing a good resume.', '3', 'TC/Unit-2/IMPORTANT QUESTION/TC UNIT 2 EXERCISE 1.pdf'),
(20, 'Explain various sections / structure of a resume.', '4', 'TC/Unit-2/IMPORTANT QUESTION/TC UNIT 2 EXERCISE 1.pdf'),
(21, 'Define job application and its types with examples.', '5', 'TC/Unit-2/IMPORTANT QUESTION/TC UNIT 2 EXERCISE 1.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tc`
--
ALTER TABLE `tc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tc`
--
ALTER TABLE `tc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
