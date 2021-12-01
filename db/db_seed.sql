USE sp_it;

-- User table sample data
INSERT INTO user (username, email,contact, password, type, profile_pic_url)
VALUES ('Link', 'link@gmail.com','98633512', 'abc123', 'customer', 'img/link.png');

INSERT INTO user (username, email, contact, password, type, profile_pic_url)
VALUES ('Tom', 'tomnook@xmail.com', '94739539', 'P@$$w0rd', 'admin', 'img/tom_nook.jpg');

INSERT INTO user (username, email,contact, password, type, profile_pic_url)
VALUES ('Mario', 'mario@gmail.com','98633512', 'abc123', 'customer', 'img/mario.png');

INSERT INTO user (username, email, contact, password, type, profile_pic_url)
VALUES ('Luigi', 'luigi@xmail.com', '91212869', 'P@$$w0rd', 'customer', 'img/luigi.jpg');

INSERT INTO user (username, email, contact, password, type, profile_pic_url)
VALUES ('Donkey_Kong', 'donkeykong@xmail.com', '98765432', 'abx123xyz', 'admin', 'img/donkey_kong.jpg');

-- Category table sample data
INSERT INTO category (categoryname, description)
VALUES ('Kitchen Appliances', 'All the tools to get cooking!');

INSERT INTO category (categoryname, description)
VALUES ('Snacks', 'Party snacks to enjoy with friends!');

INSERT INTO category (categoryname, description)
VALUES ('Electronics', 'From laundry machines to TVs, we have them all!');

INSERT INTO category (categoryname, description)
VALUES ('Toys', 'Toys for all ages!');

INSERT INTO category (categoryname, description)
VALUES ('Games', 'Have a fun time with our large variety of games!');

-- Product table sample data

