CREATE TABLE `sp_it`.`user` (
  `userid` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `contact` VARCHAR(8) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `type` VARCHAR(16) NOT NULL,
  `profile_pic_url` VARCHAR(512) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `contact_UNIQUE` (`contact` ASC) VISIBLE,
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE);

CREATE TABLE `sp_it`.`product` (
  `productid` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(128) NOT NULL,
  `catergoryid` INT(11) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`productid`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

CREATE TABLE `sp_it`.`category` (
  `categoryid` INT(11) NOT NULL AUTO_INCREMENT,
  `categoryname` VARCHAR(45) NOT NULL,
  `description` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE INDEX `categoryid_UNIQUE` (`categoryid` ASC) VISIBLE,
  UNIQUE INDEX `categoryname_UNIQUE` (`categoryname` ASC) VISIBLE,
  UNIQUE INDEX `description_UNIQUE` (`description` ASC) VISIBLE);