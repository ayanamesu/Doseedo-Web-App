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
    `id` INT NOT NULL AUTO_INCREMENT,
    `receiver` INT NOT NULL,
    `prescription_id` INT NOT NULL,
    `send_time` DATETIME NOT NULL,
    `is_active` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `prescription_id` (`prescription_id`),
    KEY `fk_alert_receiver` (`receiver`),
    CONSTRAINT `fk_alert_receiver` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_alert_prescription` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);