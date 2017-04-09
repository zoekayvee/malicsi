-- MySQL dump 10.14  Distrib 5.5.54-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	5.5.54-MariaDB-1ubuntu0.14.04.1

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
-- Table structure for table `bet_status`
--
DROP DATABASE IF EXISTS `malicsiDB`;
CREATE database `malicsiDB`;
USE `malicsiDB`;

DROP TABLE IF EXISTS `bet_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bet_status` (
  `b_game_id` int(10) unsigned DEFAULT NULL,
  `b_player_id` int(10) unsigned DEFAULT NULL,
  KEY `b_game_id` (`b_game_id`),
  KEY `b_player_id` (`b_player_id`),
  CONSTRAINT `b_game_id` FOREIGN KEY (`b_game_id`) REFERENCES `game` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `b_player_id` FOREIGN KEY (`b_player_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bet_status`
--

LOCK TABLES `bet_status` WRITE;
/*!40000 ALTER TABLE `bet_status` DISABLE KEYS */;
INSERT INTO `bet_status` VALUES (1,1),(1,1),(1,1),(NULL,1);
/*!40000 ALTER TABLE `bet_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `event_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `event_name` varchar(100) NOT NULL,
  `allow_reg` tinyint(1) NOT NULL DEFAULT '0',
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `event_name` (`event_name`),
  KEY `event_user_id_fk` (`user_id`),
  CONSTRAINT `event_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,'Malicsihan',0,'2017-12-23','2017-12-25',2),(2,1,'Palicsihan',0,'2017-12-23','2017-12-25',2),(3,1,'My Event',0,'2014-12-12','2014-12-12',0),(16,1,'Edo Tensei',0,'2014-12-12','2014-12-12',0);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER eventInsert AFTER INSERT ON event
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=NEW.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat(name," created new event: ", NEW.event_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER eventUpdate AFTER UPDATE ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("The event ",NEW.event_name ," was updated"));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER eventDelete AFTER DELETE ON event
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("The event ",OLD.event_name ," was deleted"));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `event_has_sport`
--

DROP TABLE IF EXISTS `event_has_sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_has_sport` (
  `h_event_id` int(10) unsigned DEFAULT NULL,
  `h_sport_id` int(10) unsigned DEFAULT NULL,
  KEY `h_event_id` (`h_event_id`),
  KEY `h_sport_id` (`h_sport_id`),
  CONSTRAINT `h_event_id` FOREIGN KEY (`h_event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `h_sport_id` FOREIGN KEY (`h_sport_id`) REFERENCES `sport` (`sport_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_has_sport`
--

LOCK TABLES `event_has_sport` WRITE;
/*!40000 ALTER TABLE `event_has_sport` DISABLE KEYS */;
INSERT INTO `event_has_sport` VALUES (1,1),(1,4),(1,5),(1,6),(1,7),(2,1),(2,2),(2,3);
/*!40000 ALTER TABLE `event_has_sport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `game_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sport_id` int(10) unsigned DEFAULT NULL,
  `venue_id` int(10) unsigned DEFAULT NULL,
  `event_event_id` int(10) unsigned DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `winner_team_id` int(10) unsigned DEFAULT NULL,
  `referee` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  KEY `venue_id` (`venue_id`),
  KEY `event_event_id_fk` (`event_event_id`),
  CONSTRAINT `event_event_id_fk` FOREIGN KEY (`event_event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `venue_id` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,1,1,1,'2017-12-23','11:59:59',1,NULL,'Ma\'am Kat'),(2,2,1,1,'2017-12-23','11:59:59',1,NULL,'Ma\'am K');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER gameInsert AFTER INSERT ON game
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(100);
				SET name= (SELECT event_name from event where event_id=NEW.event_event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat("Added new game with ID ", NEW.game_id, " in event ",name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER gameUpdate AFTER UPDATE ON game
		FOR EACH ROW
			BEGIN
				DECLARE name,ename varchar(100);
				SET ename= (SELECT event_name from event where event_id=NEW.event_event_id LIMIT 1);
				IF OLD.winner_team_id!=NEW.winner_team_id THEN
					SET name= (SELECT team_name from team where team_id=NEW.winner_team_id LIMIT 1);
					INSERT INTO logs(message) VALUES(concat("Winner of game with game ID : ", NEW.game_id, " is ",name, " in event ",ename ));
				ELSE 
					INSERT INTO logs(message) VALUES(concat("Updated the game with ID ", NEW.game_id, " in event ",ename));
				END IF;
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER gameDelete AFTER DELETE ON game
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted new game with ID : ", OLD.game_id));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `game_score`
--

DROP TABLE IF EXISTS `game_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_score` (
  `game_id` int(10) unsigned DEFAULT NULL,
  `team_score_id` int(10) unsigned DEFAULT NULL,
  `team_score` int(11) DEFAULT NULL,
  KEY `team_score_id_fk` (`team_score_id`),
  KEY `game_id_fk` (`game_id`),
  CONSTRAINT `game_id_fk` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_score_id_fk` FOREIGN KEY (`team_score_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_score`
--

LOCK TABLES `game_score` WRITE;
/*!40000 ALTER TABLE `game_score` DISABLE KEYS */;
INSERT INTO `game_score` VALUES (1,1,0),(1,2,0);
/*!40000 ALTER TABLE `game_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `log_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` text,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,NULL,'2017-04-07 16:54:21','Created new team: TBA'),(2,NULL,'2017-04-07 16:54:21','Created new team:  TBA '),(3,1,'2017-04-07 16:54:21','Created new user with user name: Tester1'),(4,2,'2017-04-07 16:54:21','Created new user with user name: Tester2'),(5,NULL,'2017-04-07 16:54:21','Created new venue with name: Copeland Gymasium'),(6,1,'2017-04-07 16:54:21','Tester1 created new event: Malicsihan'),(7,1,'2017-04-07 16:54:21','Tester1 created new event: Palicsihan'),(8,NULL,'2017-04-07 16:54:21','Added sport: Basketballl'),(9,NULL,'2017-04-07 16:54:21','Added sport: Volleyball'),(10,NULL,'2017-04-07 16:54:21','Added sport: Badminton'),(11,NULL,'2017-04-07 16:54:21','Added sport: Phil. Games'),(12,NULL,'2017-04-07 16:54:21','Added sport: Dota'),(13,NULL,'2017-04-07 16:54:21','Added sport: Soccer'),(14,NULL,'2017-04-07 16:54:21','Added sport: Javelin'),(15,NULL,'2017-04-07 16:54:21','Added new game with ID 1 in event Malicsihan'),(16,NULL,'2017-04-07 16:54:21','Added new game with ID 2 in event Malicsihan'),(17,NULL,'2017-04-07 16:54:21','Created new team: team1'),(18,NULL,'2017-04-07 16:54:21','Created new team: team2'),(19,1,'2017-04-07 16:54:21','team1\'s added team player: Tester1'),(20,1,'2017-04-07 16:54:21','team1\'s added team player: Tester1'),(21,NULL,'2017-04-07 16:54:21','TBA plays game with gameID: 1 in Basketballl'),(22,NULL,'2017-04-07 16:54:21',' TBA  plays game with gameID: 1 in Basketballl'),(23,NULL,'2017-04-07 16:54:21','Created new sponsor with sponsor name: ArvinSartilloCompany'),(24,NULL,'2017-04-07 16:54:21','Created new sponsor with sponsor name: Tester'),(25,NULL,'2017-04-07 16:54:21','Created new sponsor with sponsor name: DanCalixtoCompany'),(26,NULL,'2017-04-07 16:54:21','ArvinSartilloCompany sponsored the event: Malicsihan'),(27,NULL,'2017-04-07 16:54:21','ArvinSartilloCompany sponsored the event: Palicsihan'),(28,NULL,'2017-04-07 16:54:21','Tester sponsored the event: Malicsihan'),(29,NULL,'2017-04-07 16:54:21','Tester sponsored the event: Palicsihan'),(30,NULL,'2017-04-07 16:54:21','DanCalixtoCompany sponsored the event: Malicsihan'),(31,NULL,'2017-04-07 16:54:21','DanCalixtoCompany sponsored the event: Palicsihan'),(39,1,'2017-04-08 06:54:01','Tester1 created new event: My Event'),(40,4,'2017-04-08 08:03:02','Created new user with user name: admin'),(41,4,'2017-04-08 08:04:21','Updated his/her user profile with user name: admin'),(42,NULL,'2017-04-07 16:00:00','Viewed Game # '),(43,NULL,'2017-04-07 16:00:00','Viewed Game # '),(44,NULL,'2017-04-07 16:00:00','Viewed Game # '),(45,NULL,'2017-04-07 16:00:00','Viewed Game # '),(46,1,'2017-04-08 09:50:08','Tester1 created new event: '),(47,1,'2017-04-08 09:52:58','Tester1 created new event: dadada'),(48,1,'2017-04-08 09:58:03','Tester1 created new event: THIS'),(49,1,'2017-04-08 09:59:09','Tester1 created new event: NOPE'),(50,1,'2017-04-08 10:00:24','Tester1 created new event: asadas'),(51,NULL,'2017-04-08 10:02:04',NULL),(52,NULL,'2017-04-08 10:03:43',NULL),(53,NULL,'2017-04-08 10:04:45',NULL),(56,NULL,'2017-04-08 10:07:53','The event  was deleted'),(57,NULL,'2017-04-08 10:08:01','The event dadada was deleted'),(58,NULL,'2017-04-08 10:08:03','The event THIS was deleted'),(59,NULL,'2017-04-08 10:08:05','The event NOPE was deleted'),(60,NULL,'2017-04-08 10:08:06','The event asadas was deleted'),(61,NULL,'2017-04-08 10:08:08','The event dasdasd was deleted'),(62,NULL,'2017-04-08 10:08:10','The event qweqwe was deleted'),(63,NULL,'2017-04-08 10:08:14','The event eqwe was deleted'),(64,NULL,'2017-04-08 10:08:15','The event My eventda was deleted'),(65,NULL,'2017-04-08 10:08:19','The event qweqweasdas was deleted'),(66,NULL,'2017-04-07 16:00:00','Viewed Game # '),(67,1,'2017-04-08 10:23:24','Tester1 created new event: Edo Tensei'),(69,NULL,'2017-04-08 15:11:58','The event DADA was deleted'),(70,3,'2017-04-08 15:11:58','aw deleted his/her interest : da'),(71,3,'2017-04-08 15:11:58','aw deleted his/her interest : ey'),(72,3,'2017-04-08 15:11:58','aw deleted his/her interest : aw'),(73,3,'2017-04-08 15:11:58','aw deleted his/her interest : TEHEEE'),(74,3,'2017-04-08 15:11:58','aw deleted his/her interest : ewa'),(75,3,'2017-04-08 15:11:58','Deleted user: aw'),(76,4,'2017-04-08 15:16:05','Updated his/her user profile with user name: admin'),(77,4,'2017-04-08 15:17:12','Updated his/her user profile with user name: admin'),(78,5,'2017-04-08 15:20:28','Created new user with user name: aw'),(79,5,'2017-04-08 15:20:48','Updated his/her user profile with user name: aw'),(80,6,'2017-04-08 15:57:20','Created new user with user name: test'),(81,6,'2017-04-08 15:57:33','Updated his/her user profile with user name: test'),(82,7,'2017-04-09 07:40:47','Created new user with user name: q');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsor`
--

DROP TABLE IF EXISTS `sponsor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsor` (
  `sponsor_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sponsor_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sponsor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsor`
--

LOCK TABLES `sponsor` WRITE;
/*!40000 ALTER TABLE `sponsor` DISABLE KEYS */;
INSERT INTO `sponsor` VALUES (1,'ArvinSartilloCompany'),(2,'Tester'),(3,'DanCalixtoCompany');
/*!40000 ALTER TABLE `sponsor` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sponsorInsert AFTER INSERT ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Created new sponsor with sponsor name: ", NEW.sponsor_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sponsorUpdate AFTER UPDATE ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated sponsor profile with sponsor name: ", NEW.sponsor_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sponsorDelete AFTER DELETE ON sponsor
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted sponsor: ", OLD.sponsor_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sponsor_events`
--

DROP TABLE IF EXISTS `sponsor_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsor_events` (
  `sponsor_id` int(10) unsigned DEFAULT NULL,
  `event_id` int(10) unsigned DEFAULT NULL,
  KEY `sponsor_id_fk` (`sponsor_id`),
  KEY `event_id_fk` (`event_id`),
  CONSTRAINT `event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sponsor_id_fk` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsor` (`sponsor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsor_events`
--

LOCK TABLES `sponsor_events` WRITE;
/*!40000 ALTER TABLE `sponsor_events` DISABLE KEYS */;
INSERT INTO `sponsor_events` VALUES (1,1),(1,2),(2,1),(2,2),(3,1),(3,2);
/*!40000 ALTER TABLE `sponsor_events` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sponsorEventInsert AFTER INSERT ON sponsor_events
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT sponsor_name from sponsor where sponsor_id=NEW.sponsor_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=NEW.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name, " sponsored the event: ",eventname));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sponsorEventDelete AFTER DELETE ON sponsor_events
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT sponsor_name from sponsor where sponsor_id=OLD.sponsor_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=OLD.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name, " stopped sponsoring on event: ",eventname));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sport`
--

DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sport` (
  `sport_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sport_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sport_id`),
  UNIQUE KEY `sport_name` (`sport_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES (3,'Badminton'),(1,'Basketballl'),(5,'Dota'),(7,'Javelin'),(4,'Phil. Games'),(6,'Soccer'),(2,'Volleyball');
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sportInsert AFTER INSERT ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Added sport: ", NEW.sport_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sportUpdate AFTER UPDATE ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated sport name from ", OLD.sport_name," to ", NEW.sport_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER sportDelete AFTER DELETE ON sport
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted : ", OLD.sport_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) NOT NULL,
  PRIMARY KEY (`team_id`),
  UNIQUE KEY `team_name` (`team_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (2,' TBA '),(1,'TBA'),(3,'team1'),(4,'team2');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER competitorInsert AFTER INSERT ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Created new team: ", NEW.team_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER competitorUpdate AFTER UPDATE ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated the team name from ", OLD.team_name, " to", NEW.team_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER competitortDelete AFTER DELETE ON team
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted the team: ", OLD.team_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `team_joins_event`
--

DROP TABLE IF EXISTS `team_joins_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_joins_event` (
  `event_id` int(10) unsigned DEFAULT NULL,
  `team_id` int(10) unsigned DEFAULT NULL,
  `status` enum('accepted','rejected','pending') DEFAULT NULL,
  KEY `team_id_joins_event_fk` (`team_id`),
  KEY `team_joins_event_id_fk` (`event_id`),
  CONSTRAINT `team_id_joins_event_fk` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_joins_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_joins_event`
--

LOCK TABLES `team_joins_event` WRITE;
/*!40000 ALTER TABLE `team_joins_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_joins_event` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER teamJoinEventInsert AFTER INSERT ON team_joins_event
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=NEW.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name," requests to join event: ", eventname));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER teamJoinEventUpdate AFTER UPDATE ON team_joins_event
		FOR EACH ROW
			BEGIN
				DECLARE name,eventname varchar(100);
				SET name = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				SET eventname = (SELECT event_name from event where event_id=NEW.event_id LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name,"'s request status to join ", eventname, ": ", NEW.status));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `team_players`
--

DROP TABLE IF EXISTS `team_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_players` (
  `team_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  KEY `team_id_fk` (`team_id`),
  KEY `user_id_fk` (`user_id`),
  CONSTRAINT `team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_players`
--

LOCK TABLES `team_players` WRITE;
/*!40000 ALTER TABLE `team_players` DISABLE KEYS */;
INSERT INTO `team_players` VALUES (3,1),(3,1);
/*!40000 ALTER TABLE `team_players` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER teamPlayerInsert AFTER INSERT ON team_players
		FOR EACH ROW
			BEGIN
				DECLARE name,tname varchar(100);
				SET name = (SELECT username from users where user_id=NEW.user_id LIMIT 1);
				SET tname = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				INSERT INTO logs(user_id,message) VALUES(NEW.user_id ,concat(tname,"'s added team player: ", name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER teamPlayerDelete AFTER DELETE ON team_players
		FOR EACH ROW
			BEGIN
				DECLARE name,tname varchar(100);
				SET name = (SELECT username from users where user_id=OLD.user_id LIMIT 1);
				SET tname = (SELECT team_name from team where team_id=OLD.team_id LIMIT 1);
				INSERT INTO logs(user_id,message) VALUES(OLD.user_id,concat(tname, "'s removed team player: ", name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `team_plays_game`
--

DROP TABLE IF EXISTS `team_plays_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_plays_game` (
  `game_id` int(10) unsigned DEFAULT NULL,
  `team_id` int(10) unsigned DEFAULT NULL,
  `bet_count` int(11) DEFAULT NULL,
  KEY `team_plays_game_id_fk` (`game_id`),
  KEY `team_id_plays_game_fk` (`team_id`),
  CONSTRAINT `team_id_plays_game_fk` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_plays_game_id_fk` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_plays_game`
--

LOCK TABLES `team_plays_game` WRITE;
/*!40000 ALTER TABLE `team_plays_game` DISABLE KEYS */;
INSERT INTO `team_plays_game` VALUES (1,1,0),(1,2,0);
/*!40000 ALTER TABLE `team_plays_game` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER teamPlayGameInsert AFTER INSERT ON team_plays_game
		FOR EACH ROW
			BEGIN
				DECLARE name,sportname varchar(100);
				SET name = (SELECT team_name from team where team_id=NEW.team_id LIMIT 1);
				SET sportname =(SELECT sport_name from sport where sport_id= (select sport_id from game where game_id = NEW.game_id) LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name," plays game with gameID: ", NEW.game_id, " in ",sportname ));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER teamPlayGameDelete AFTER DELETE ON team_plays_game
		FOR EACH ROW
			BEGIN
				DECLARE name,sportname varchar(100);
				SET name = (SELECT team_name from team where team_id=OLD.team_id LIMIT 1);
				SET sportname =(SELECT sport_name from sport where sport_id= (select sport_id from game where game_id = OLD.game_id) LIMIT 1);
				INSERT INTO logs(message) VALUES(concat(name," disqualified from game with ID: ", OLD.game_id, " in ",sportname ));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_interests`
--

DROP TABLE IF EXISTS `user_interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_interests` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `interests` text,
  KEY `user_interests_fk` (`user_id`),
  CONSTRAINT `user_interests_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interests`
--

LOCK TABLES `user_interests` WRITE;
/*!40000 ALTER TABLE `user_interests` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_interests` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER userInterestInsert AFTER INSERT ON user_interests
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=NEW.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES (NEW.user_id,concat(name," has new interest : ", NEW.interests));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER userInterestUpdate AFTER UPDATE ON user_interests
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=OLD.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat(name," updated his/her interest : ", NEW.interests));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER userInterestDelete AFTER DELETE ON user_interests
		FOR EACH ROW
			BEGIN
				DECLARE name varchar(50);
				SET name = (SELECT username from users where user_id=OLD.user_id LIMIT 1);
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat(name, " deleted his/her interest : ", OLD.interests));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_type` enum('admin','pending','normal') DEFAULT NULL,
  `gender` enum('F','M') DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `college` varchar(50) DEFAULT NULL,
  `contactno` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `weight` int(11) DEFAULT '0',
  `height` int(11) DEFAULT '0',
  `age` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tester1','test','admin',NULL,'nathaniel','carvajal','CAS','9166994203','nfcarvajal@up.edu.ph',NULL,59,177,0),(2,'Tester2','test','admin',NULL,'nathaniel','carvajal','CAS','9166994203','nfcarvajal@up.edu.ph',NULL,59,177,0),(4,'admin','$2a$10$y9lp.qTom9Izs9cuNiEAoOStXadYZvVwYMErhHg2PMu0Pwey4EA.y','admin',NULL,'admin','admin',NULL,NULL,'admin@gmail.com',NULL,0,0,0),(5,'aw','$2a$10$SPKJbe4/yGsJieA0lCN5fehRrhcsuStgb/YhhSyYE0lHfPSWT4ohW','normal',NULL,'aw','awa',NULL,NULL,'awa@asd.com',NULL,0,0,0),(6,'test','$2a$10$nm53rIlUojWHbCA06aGS6uxeuWwJnSpTvebGepQ2sqdwmeyBu6vIq','normal',NULL,'test','tsast',NULL,NULL,'admin@gmail.com',NULL,0,0,0),(7,'q','$2a$10$I9hGyx8WArBamb0HU7.G8ujAKeOuJ5vTutJ7v65DGTCQACN6kOZue','pending',NULL,'qq','q',NULL,NULL,'asdasd@gmail.com',NULL,0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER userInsert AFTER INSERT ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(NEW.user_id, concat("Created new user with user name: ", NEW.username));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER userUpdate AFTER UPDATE ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Updated his/her user profile with user name: ", NEW.username));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER userDelete AFTER DELETE ON users
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(user_id, message) VALUES(OLD.user_id, concat("Deleted user: ", OLD.username));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venue` (
  `venue_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `venue_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`venue_id`),
  UNIQUE KEY `venue_name` (`venue_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue`
--

LOCK TABLES `venue` WRITE;
/*!40000 ALTER TABLE `venue` DISABLE KEYS */;
INSERT INTO `venue` VALUES (1,12.23,32.123,'los banos, laguna','Copeland Gymasium');
/*!40000 ALTER TABLE `venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER venueInsert AFTER INSERT ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Created new venue with name: ", NEW.venue_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER venueUpdate AFTER UPDATE ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Updated venue with name: ", NEW.venue_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER venueDelete AFTER DELETE ON venue
		FOR EACH ROW
			BEGIN
				INSERT INTO logs(message) VALUES(concat("Deleted venue with name: ", OLD.venue_name));
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-09 15:41:20
