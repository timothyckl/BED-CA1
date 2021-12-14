USE sp_it;

-- User table sample data
INSERT INTO user (username, email,contact, password, type, profile_pic_url)
VALUES ("Link", "link@gmail.com","98633512", "abc123", "customer", "img/link.png");

INSERT INTO user (username, email, contact, password, type, profile_pic_url)
VALUES ("Tom", "tomnook@xmail.com", "94739539", "P@$$w0rd", "admin", "img/tom_nook.jpg");

INSERT INTO user (username, email,contact, password, type, profile_pic_url)
VALUES ("Mario", "mario@gmail.com","98633512", "abc123", "customer", "img/mario.png");

INSERT INTO user (username, email, contact, password, type, profile_pic_url)
VALUES ("Luigi", "luigi@xmail.com", "91212869", "P@$$w0rd", "customer", "img/luigi.jpg");

INSERT INTO user (username, email, contact, password, type, profile_pic_url)
VALUES ("Donkey_Kong", "donkeykong@xmail.com", "98765432", "abx123xyz", "admin", "img/donkey_kong.jpg");


-- Category table sample data
INSERT INTO category (categoryname, description)
VALUES ("Kitchen Appliances", "All the tools to get cooking!");

INSERT INTO category (categoryname, description)
VALUES ("Snacks", "Party snacks to enjoy with friends!");

INSERT INTO category (categoryname, description)
VALUES ("Electronics", "From laundry machines to TVs, we have them all!");

INSERT INTO category (categoryname, description)
VALUES ("Toys", "Toys for all ages!");

INSERT INTO category (categoryname, description)
VALUES ("Games", "Have a fun time with our large variety of games!");


-- Product table sample data
INSERT INTO product (name, description, categoryid, brand, price)
VALUES ("Uncle Roger\'s Rice Cooker", "Voice-activated rice cooker", 1, "Roger Tech", 420.69);

INSERT INTO product (name, description, categoryid, brand, price)
VALUES ("Wife Sandwich", "Wife-made sadwich fresh from the kitchen", 2, "SugarMummy Pte", 123.45);

INSERT INTO product (name, description, categoryid, brand, price)
VALUES ("Razer Blade 15 RTX 2070", "supder duper fast laptop", 3, "Razer", 2199.99);

INSERT INTO product (name, description, categoryid, brand, price)
VALUES  ("Lebron Jahames", "inflatable action figure", 4, "NBA", 123.45);

INSERT INTO product (name, description, categoryid, brand, price)
VALUES  ("Bing Chiling Adventures", "Join Zhong Xina in his epic quest to attain the legendary BING CHILING", 5, "CCP", 123.45);

--  "name": "SP AMD Ryzen 3600 Laptop",
--     "description": "Best Laptop",
--      “categoryid”: 1,
--   “brand”: “SP IT!”
--     "price”:”1855.50”
