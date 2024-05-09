CREATE SCHEMA IF NOT EXISTS doseedodb;
USE doseedodb;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_type` enum("caregiver", "patient") NOT NULL,
  `address_1` varchar(255),
  `address_2` varchar(255) DEFAULT NULL,
  `state` char(2),
  `city` varchar(17),
  `zip_code` char(5),
  `phone` varchar(10),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `user_id` int NOT NULL,
  `account_type` enum('caregiver','patient') NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `account_link`;
CREATE TABLE `account_link` (
  `caregiver_id` int NOT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`caregiver_id`,`patient_id`),
  KEY `account_link_ibfk_2` (`patient_id`),
  CONSTRAINT `account_link_ibfk_1` FOREIGN KEY (`caregiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `account_link_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `device` varchar(255),
  `recently_accessed` datetime,
  `login_time` datetime NOT NULL,
  `logout_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `session_ibfk_1` (`user_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `time_sent` datetime NOT NULL,
  `full_path` varchar(8000) DEFAULT NULL, 
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `user` (`id`),
  CONSTRAINT `picture_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`)
);

DROP TABLE IF EXISTS `prescription`;
CREATE TABLE `prescription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `med_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `dose_amt` varchar(90) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `doctor_first_name` varchar(255) NOT NULL,
  `doctor_last_name` varchar(255) NOT NULL,
  `doctor_phone` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_ibfk_1` (`user_id`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `alert`;
CREATE TABLE `alert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alert_name` varchar(255) DEFAULT NULL,
  `receiver` int NOT NULL,
  `prescription_id` int NOT NULL,
  `send_time` datetime NOT NULL,
  `is_active` binary(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_id` (`prescription_id`),
  KEY `alert_ibfk_2` (`receiver`),
  CONSTRAINT `alert_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`),
  CONSTRAINT `alert_ibfk_3` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);


DROP TABLE IF EXISTS `alert_history`;
CREATE TABLE `alert_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alert_id` int NOT NULL,
  `receiver` int NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `alert_history_ibfk_1` (`alert_id`),
  KEY `alert_history_ibfk_3` (`receiver`),
  CONSTRAINT `alert_history_ibfk_1` FOREIGN KEY (`alert_id`) REFERENCES `alert` (`id`),
  CONSTRAINT `alert_history_ibfk_3` FOREIGN KEY (`receiver`) REFERENCES `alert` (`id`)
);

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `user_permissions`;
CREATE TABLE `user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_permissions_ibfk_1` (`permission_id`),
  KEY `user_permissions_ibfk_2` (`user_id`),
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);