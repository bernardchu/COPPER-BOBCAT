-- QUESTION table
-- id question createdat answer

DROP TABLE IF EXISTS Question
CREATE TABLE `Question` (
	`id`	   AUTO_INCREMENT,
	`question` varchar(500),
	`answer`   varchar(50),
	'difficulty' integer,
	`created_at` DATETIME,
	PRIMARY KEY (`id`)
)



-- CATEGORY table
-- id category createdat

DROP TABLE IF EXISTS Category
CREATE TABLE Category (
	`id`	   AUTO_INCREMENT,
	`category` varchar(20) unique,
	`created_at` DATETIME,
	PRIMARY KEY (`id`)
)



-- USER table
-- id username (pswd)?

DROP TABLE IF EXISTS User
CREATE TABLE User (
	`id`	   AUTO_INCREMENT,
	`username` varchar(10) unique,
	PRIMARY KEY (`id`)
)



-- CATEGORY/QUESTION
-- categoryid qid

CREATE TABLE Category_Question (
	`category_id` INTEGER NOT NULL,
	`question_id` INTEGER NOT NULL,
	PRIMARY KEY (`category_id`, `question_id`)
) COMMENT 'Join table'

-- USER/QUESTION
-- userid qid views answer

CREATE TABLE User_Question (
	`user_id` INTEGER NOT NULL,
	`question_id` INTEGER NOT NULL,
	`views` INTEGER DEFAULT 0,
	`solved` INTEGER DEFAULT 0,
	PRIMARY KEY (`user_id`, `question_id`)
) COMMENT 'Join table'
