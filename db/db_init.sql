CREATE DATABASE IF NOT EXISTS sp_it;

USE sp_it;

CREATE TABLE IF NOT EXISTS `user` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `contact` VARCHAR(8) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `type` VARCHAR(16) NOT NULL,
  `profile_pic_url` VARCHAR(512) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `category` (
  `categoryid` INT NOT NULL AUTO_INCREMENT,
  `categoryname` VARCHAR(45) NOT NULL,
  `description` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE INDEX `categoryname_UNIQUE` (`categoryname` ASC) VISIBLE,
  UNIQUE INDEX `description_UNIQUE` (`description` ASC) VISIBLE);

  CREATE TABLE IF NOT EXISTS `product` (
  `productid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(128) NOT NULL,
  `categoryid` INT NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`productid`),
  FOREIGN KEY (categoryid) 
  REFERENCES category(categoryid) 
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `reviews` (
  `reviewid` INT NOT NULL AUTO_INCREMENT,
  `productid` INT NOT NULL,
  `userid` INT NOT NULL,
  `rating` INT NOT NULL,
  `review` varchar(128) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`reviewid`),
  FOREIGN KEY (productid) 
  REFERENCES product(productid) 
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (userid) 
  REFERENCES user(userid) 
  ON DELETE CASCADE
  ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `user_interest` (
  `interestid` INT NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `categoryid` INT NOT NULL,
  PRIMARY KEY (`interestid`),
  FOREIGN KEY (userid) 
  REFERENCES user(userid)  
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (categoryid)
  REFERENCES category(categoryid)
  ON DELETE CASCADE 
  ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `promo_codes` (
`promoid` INT NOT NULL AUTO_INCREMENT,
`productid` INT NOT NULL,
`startDate` DATE NOT NULL,
`endDate` DATE NOT NULL,
`amount` DECIMAL(3,2) NOT NULL,
PRIMARY KEY (`promoid`),
FOREIGN KEY (`productid`) 
REFERENCES product(productid)  
ON DELETE CASCADE
ON UPDATE CASCADE);