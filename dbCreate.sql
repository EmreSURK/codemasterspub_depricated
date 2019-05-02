-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: coderhub
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `invite`
--

DROP TABLE IF EXISTS `invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invite` (
  `idinvite` int(11) NOT NULL AUTO_INCREMENT,
  `invite_inviter_userid` int(11) DEFAULT NULL,
  `invite_invited_email` varchar(45) DEFAULT NULL,
  `invite_code` varchar(101) DEFAULT '',
  PRIMARY KEY (`idinvite`),
  UNIQUE KEY `idinvite_UNIQUE` (`idinvite`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `invite_request`
--

DROP TABLE IF EXISTS `invite_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invite_request` (
  `idinvite_request` int(11) NOT NULL AUTO_INCREMENT,
  `ir_email` varchar(45) DEFAULT NULL,
  `ir_me` text,
  `ir_why` text,
  `ir_seen` int(11) DEFAULT '0',
  `ir_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `ir_result` int(11) DEFAULT '-10',
  PRIMARY KEY (`idinvite_request`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `idpost` int(11) NOT NULL AUTO_INCREMENT,
  `text` text COLLATE utf8mb4_turkish_ci,
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `point` int(11) DEFAULT NULL,
  `postuserid` int(11) DEFAULT NULL,
  `posttopicid` int(11) DEFAULT NULL,
  `isdeleted` mediumint(9) DEFAULT '0',
  PRIMARY KEY (`idpost`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic_message`
--

DROP TABLE IF EXISTS `topic_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic_message` (
  `idtp` int(11) NOT NULL AUTO_INCREMENT,
  `tp_topicid` int(11) DEFAULT NULL,
  `tp_userid` int(11) DEFAULT NULL,
  `tp_username` varchar(450) CHARACTER SET utf8 DEFAULT NULL,
  `tp_user_image` varchar(250) COLLATE utf8mb4_turkish_ci DEFAULT '',
  `tp_text` text CHARACTER SET utf8,
  `tp_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtp`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topics` (
  `idtopic` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(450) CHARACTER SET utf8 DEFAULT NULL,
  `userid` varchar(45) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `opendate` datetime DEFAULT NULL,
  `lastmesdate` datetime DEFAULT NULL,
  `totalmescount` int(11) DEFAULT NULL,
  PRIMARY KEY (`idtopic`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(450) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `nick` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `pass` text COLLATE utf8mb4_turkish_ci,
  `email` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `regdate` datetime DEFAULT NULL,
  `lastlogindate` datetime DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `profile_path` varchar(250) CHARACTER SET latin1 DEFAULT '',
  `is_mail_confirmed` int(11) DEFAULT '0',
  `bio` text COLLATE utf8mb4_turkish_ci,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-02 15:37:34
