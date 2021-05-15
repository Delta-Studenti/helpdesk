-- Dumping structure for table helpdesk.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table helpdesk.tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0',
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tickets_users` (`authorId`),
  CONSTRAINT `FK_tickets_users` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table helpdesk.ticket_messages
CREATE TABLE IF NOT EXISTS `ticket_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `messages` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci NOT NULL,
  `ticketId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_ticket_messages_users` (`authorId`),
  KEY `FK_ticket_messages_tickets` (`ticketId`),
  CONSTRAINT `FK_ticket_messages_tickets` FOREIGN KEY (`ticketId`) REFERENCES `tickets` (`id`),
  CONSTRAINT `FK_ticket_messages_users` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table helpdesk.ticket_tags
CREATE TABLE IF NOT EXISTS `ticket_tags` (
  `ticketId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_ticket_tags_tickets` (`ticketId`),
  KEY `FK_ticket_tags_tags` (`tagId`),
  CONSTRAINT `FK_ticket_tags_tags` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`),
  CONSTRAINT `FK_ticket_tags_tickets` FOREIGN KEY (`ticketId`) REFERENCES `tickets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

ALTER TABLE `users`	CHANGE COLUMN `name` `name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_czech_ci' AFTER `id`;
