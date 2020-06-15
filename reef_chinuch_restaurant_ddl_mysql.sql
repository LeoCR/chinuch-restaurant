DROP DATABASE reef_chinuch_restaurant;

CREATE DATABASE reef_chinuch_restaurant;

DROP TABLE IF EXISTS drink;
DROP TABLE IF EXISTS ingredient_dish;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS invoice_detail;
DROP TABLE IF EXISTS header_invoice;
DROP TABLE IF EXISTS dish;
DROP TABLE IF EXISTS reef_user;

use reef_chinuch_restaurant;

CREATE TABLE IF NOT EXISTS ingredient(
	id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    img VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS reef_user(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    firstname VARCHAR(250), 
    lastname VARCHAR(250), 
    username VARCHAR(250), 
    about VARCHAR(250), 
    email VARCHAR(250), 
    password VARCHAR(250), 
    last_login timestamp, 
    status ENUM('active', 'inactive') DEFAULT 'active', 
    created_at timestamp , 
    updated_at timestamp ,
    provider VARCHAR(250),
    id_user VARCHAR(250)
);


CREATE TABLE IF NOT EXISTS dish(
	id VARCHAR(250) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    category VARCHAR(245),
    subcategory VARCHAR(245),
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS drink(
	id VARCHAR(250) PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(250) NOT NULL,
    picture VARCHAR(250) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient_dish(
	id_ingredient_dish INT AUTO_INCREMENT PRIMARY KEY,
    id_ingredient VARCHAR(250) NOT NULL,
    id_dish VARCHAR(250) NOT NULL,
    CONSTRAINT FK_ID_Ingredient FOREIGN KEY (id_ingredient) REFERENCES ingredient(id) ON DELETE CASCADE,
    CONSTRAINT FK_ID_Dish FOREIGN KEY (id_dish) REFERENCES dish(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservation(
    id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(250), 
    telephone VARCHAR(250), 
    email VARCHAR(250), 
    date_of_reservation VARCHAR(250),
    quantity_of_persons VARCHAR(250), 
    comment VARCHAR(250)
);


CREATE TABLE IF NOT EXISTS header_invoice(
	id_header INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10,4)  NOT NULL,
    subtotal DECIMAL(10,4),
    sales_tax DECIMAL(10,4),
    product_id VARCHAR(250),
    product_name VARCHAR(250),
    product_quantity INT
);


CREATE TABLE IF NOT EXISTS invoice_detail(
	id_invoice_detail INT AUTO_INCREMENT PRIMARY KEY,
    client_restaurant INT NOT NULL,
    header_invoice INT NOT NULL,
    order_code VARCHAR(250) NOT NULL,
    date_of_billing timestamp NOT NULL,
    paypal_id VARCHAR(250),
    paypal_payer_id VARCHAR(250),
    paypal_token VARCHAR(250), 
    CONSTRAINT FK_ClientInvoiceDetail FOREIGN KEY (client_restaurant) REFERENCES reef_user(id) ON DELETE CASCADE,
    CONSTRAINT FK_HeaderInvoiceDetail FOREIGN KEY (header_invoice) REFERENCES header_invoice(id_header) ON DELETE CASCADE
);

INSERT INTO ingredient VALUES ('1ING', 'Tomato', '/img/ingredients/tomato.jpg'  );
INSERT INTO ingredient VALUES ('2ING', 'Rice', '/img/ingredients/rice.jpg'   );
INSERT INTO ingredient VALUES ('3ING', 'Lettuce', '/img/ingredients/lettuce.jpg'   );
INSERT INTO ingredient VALUES ('4ING', 'Pasta Spaguetti', '/img/ingredients/spaguetti.jpg');
INSERT INTO ingredient VALUES ('5ING', 'Pasta Lasagna', '/img/ingredients/pasta-lasagna.jpg');
INSERT INTO ingredient VALUES ('6ING', 'Beans', '/img/ingredients/beans.jpg'   );
INSERT INTO ingredient VALUES ('7ING', 'Peperoni', '/img/ingredients/peperoni.jpg'   );
INSERT INTO ingredient VALUES ('8ING', 'Chicken', '/img/ingredients/chicken.jpg'   );
INSERT INTO ingredient VALUES ('9ING', 'Meat', '/img/ingredients/meat.jpg'   );
INSERT INTO ingredient VALUES ('10ING','Ham','/img/ingredients/ham.jpg'   );
INSERT INTO ingredient VALUES ('11ING','Filet Mignon','/img/ingredients/filet-mignon.jpg'   );
INSERT INTO ingredient VALUES ('12ING','Milk','/img/ingredients/milk.jpg'   );
INSERT INTO ingredient VALUES ('13ING','Lemon','/img/ingredients/lemon.jpg'   );
INSERT INTO ingredient VALUES ('14ING','Fish','/img/ingredients/fish.jpg'   );
INSERT INTO ingredient VALUES ('15ING','Cheese','/img/ingredients/cheese.jpg'   );
INSERT INTO ingredient VALUES ('16ING','Strawberry','/img/ingredients/strawberry.jpg'   );
INSERT INTO ingredient VALUES ('17ING','Salmon','/img/ingredients/salmon.jpg'   );
INSERT INTO ingredient VALUES ('18ING','Carrot','/img/ingredients/carrot.jpg'   );
INSERT INTO ingredient VALUES ('19ING','Eggs','/img/ingredients/eggs.jpg'   );
INSERT INTO ingredient VALUES ('20ING','Mushrooms','/img/ingredients/mushrooms.jpg'   );
INSERT INTO ingredient VALUES ('21ING','Bacon','/img/ingredients/bacon.jpg'   );
INSERT INTO ingredient VALUES ('22ING','Red Wine','/img/ingredients/red-wine.jpg'   );
INSERT INTO ingredient VALUES ('23ING','Avocado','/img/ingredients/avocado.jpg'   );
INSERT INTO ingredient VALUES ('24ING','Green Chiles','/img/ingredients/green-chiles.jpg'   );
INSERT INTO ingredient VALUES ('25ING','Dough For Pizza','/img/ingredients/dough-for-pizza.jpg'   );
INSERT INTO ingredient VALUES ('26ING','Cucumber','/img/ingredients/cucumber.jpg'   );
INSERT INTO ingredient VALUES ('27ING','Onion','/img/ingredients/onion.jpg'   );
INSERT INTO ingredient VALUES ('28ING','Olive Oil','/img/ingredients/olive-oil.jpg'   );
INSERT INTO ingredient VALUES ('29ING','Salt','/img/ingredients/salt.jpg'   );
INSERT INTO ingredient VALUES ('30ING','Pepper','/img/ingredients/pepper.jpg'   );
INSERT INTO ingredient VALUES ('31ING','Balsamic Vinegar','/img/ingredients/balsamic-vinegar.jpg'   );
INSERT INTO ingredient VALUES ('32ING','Mustard','/img/ingredients/mustard.jpg'   );
INSERT INTO ingredient VALUES ('33ING','Salted Marcona Almonds','/img/ingredients/salted-Marcona-almonds.jpg'   );
INSERT INTO ingredient VALUES ('34ING','Beets','/img/ingredients/beets.jpg'   );
INSERT INTO ingredient VALUES ('35ING','Ground Beef','/img/ingredients/ground-beef.jpg'   );
INSERT INTO ingredient VALUES ('36ING','Shrimp','/img/ingredients/shrimp.jpg'   );
INSERT INTO ingredient VALUES ('37ING','Sirloin','/img/ingredients/sirloin.jpg'   );
INSERT INTO ingredient VALUES ('38ING','Unsalted butter','/img/ingredients/unsalted-butter.jpg'   );
INSERT INTO ingredient VALUES ('39ING','French bread','/img/ingredients/french-bread.jpg'   );
INSERT INTO ingredient VALUES ('40ING','Parmesan Cheese','/img/ingredients/parmesan-cheese.jpg'   );


INSERT INTO dish VALUES ('1MNCRS','Lasagna of Chicken',
'Made with stacked 
layers of pasta alternated with sauces and chicken plus vegetables and cheese, and sometimes 
topped with melted grated cheese','/img/main-courses/lasagna.png','Main Course','Pasta',14.35);
INSERT INTO dish VALUES ('2MNCRS','Ceviche',
'It is a dish consisting of marinated meat such as fish, seafood or both - in citrus dressings.',
'/img/main-courses/ceviche.png','Main Course','Sea Food',8.50);
INSERT INTO dish VALUES ('3MNCRS','Hamburguer',
'A hamburger, beefburger or burger is a sandwich consisting of one or more cooked patties of ground meat, usually
 beef, placed inside a sliced bread roll or bun',
 '/img/main-courses/hamburger.png','Main Course','Fast Food',5.50);
INSERT INTO dish VALUES ('4MNCRS','Chicken pie',
'Golden brown pastry and a creamy chicken, leek and
 bacon filling make this a real feast for friends and 
 family','/img/main-courses/chicken-pie.png','Main Course','Cake',7.50);
INSERT INTO dish VALUES ('5MNCRS','Pizza',
'Made with wheat flour, salt, water and yeast, covered with tomato sauce and cheese..',
'/img/main-courses/pizza.png','Main Course','Fast Food',12.80);
INSERT INTO dish VALUES ('6MNCRS','Sushi',
'sushi is the most significant dish that represents Japanese cuisine. 
Its popularity has spread so widely that the word sushi 
is recognized anywhere in the world today. ','/img/main-courses/sushi.png','Main Course','Oriental',7.50);
INSERT INTO dish VALUES ('7MNCRS','Filet Mignon',
'It is cooked wonderfully grilled, also baked or with sauce.Salt and pepper, bacon, sliced mushrooms, 
olive oil, chopped onion in small squares, wheat flour, red wine',
'/img/main-courses/filet-mignon.png','Main Course','Meats',14.50);
INSERT INTO dish VALUES ('8MNCRS','Roasted Beets',
'Bibb Lettuce, Balsamic Dressing','/img/main-courses/roasted-beets.png','Main Course','Meats',15.55);
INSERT INTO dish VALUES ('9MNCRS','Lasagna of Ground Beef',
'Made with stacked layers of pasta alternated with sauces and Ground Beef plus vegetables and cheese, and sometimes 
topped with melted grated cheese','/img/main-courses/lasagna.png','Main Course','Cake',16.70);

INSERT INTO dish VALUES('1DESRT','Rice with Milk','Sweet rice with cinnamon and sweet cream','/img/desserts/rice-with-milk.jpg','Dessert','Native',5.50);
INSERT INTO dish VALUES('2DESRT','Choco Strawberries','Strawberries covered with Chocolate','/img/desserts/choco-strawberries.jpg','Dessert','Fruits',7.50);
INSERT INTO dish VALUES('3DESRT','Ice Cream and Caramel','Chocolate ice cream on the crust','/img/desserts/ice-cream-and-caramel.jpg','Dessert','Ice Cream',8.50);
INSERT INTO dish VALUES('4DESRT','Hazelnut Flans','Evaporated milk, sweetened condensed milk and liquefied chocolate and hazelnut cream','/img/desserts/chocolate-and-hazelnut-flans.jpg','Dessert','Flan',4.50);
INSERT INTO dish VALUES('5DESRT','Chocolate pudding','Sugar, flavored with chocolate and vanilla and thickened with a starch','/img/desserts/chocolate-pudding.jpg','Dessert','Pudding',7.50);
INSERT INTO dish VALUES('6DESRT','Coconut Flan','Mix milk and condensed milk and add grated coconut','/img/desserts/coconut-flan.jpg','Dessert','Flan',7.50);
INSERT INTO dish VALUES('7DESRT','Flan caramel','The sweetened condensed milk and the evaporated milk make a Flan caramel rich .','/img/desserts/flan-caramel.jpg','Dessert','Flan',7.50);
INSERT INTO dish VALUES('8DESRT','Brownie and Ice Cream','Sweet Ice cream with a brownie','/img/desserts/brownie-with-ice-cream.jpg','Dessert','Ice Cream',7.50);



INSERT INTO dish VALUES ('1APPTZR','Ceviche','A little dish with marinated meat 
such as fish, seafood or both - in citrus dressings.','/img/appetizers/ceviche.png','Appetizer','Sea Food',6.50);
INSERT INTO dish VALUES ('2APPTZR','Grilled Shrimp Salad','A bed of romaine lettuce, followed 
by grilled peppers, corn, and shrimp. Then we 
brighten this salad up with chopped grape tomatoes, a 
diced avocado, and cucumbers.','/img/appetizers/grilled-shrimp-salad.png','Appetizer','Salad',7.50);
INSERT INTO dish VALUES ('3APPTZR','Grilled Salmon Salad','Light, fresh and healthy 
grilled salmon Greek salad recipe. Crisp vegetables are 
tossed in a tangy lemon basil dressing and topped with
 flaky salmon.','/img/appetizers/grilled-salmon-salad.png','Appetizer','Salad',7.50);
INSERT INTO dish VALUES ('4APPTZR','Grilled Sirloin Salad','Preheat an outdoor grill for
 high heat and lightly oil the grate. Blend soy sauce, vinegar, brown 
 sugar, sesame oil, garlic, and ginger together in a blender or food
  processor until dressing is smooth. ','/img/appetizers/grilled-sirloin-salad.png','Appetizer','Salad',6.60);
INSERT INTO dish VALUES ('5APPTZR','French Onion Soup',
'With beef stock base, slow-cooked caramelized onions,
 French bread, gruyere and Parmesan cheese,especially with
 a thick slice of toasted bread loaded with melty Gruyere cheese 
 and lots of caramelized onions.','/img/appetizers/french-onion-soup.png','Appetizer','Soup',5.60);
INSERT INTO dish VALUES ('6APPTZR','Strips of Filet Mignon','Oybox tomatoes, basil seed vinaigrette .',
'/img/appetizers/strips-of-filet-mignon.png','Appetizer','Meat',6.50);
INSERT INTO dish VALUES ('7APPTZR','Filet Mignon Sandwich','It is very simple, and 
the filet mignon cut of beef steak is so tender and juicy!
 The steak is very flavorful alone, but is nicely complemented 
 by the flavors of the spread, the 
 vegetables, and the onion bun..','/img/appetizers/marinated-filet-mignon-steak-sandwich.png','Appetizer','Meat',7.50);

INSERT INTO drink VALUES('1DRNK','Coca Cola','Soft Drink','/img/drinks/coca-cola.jpg',3.50);
INSERT INTO drink VALUES('2DRNK','Coca Cola Light','Light Soft Drink','/img/drinks/coca-cola-light.jpg',4.50);
INSERT INTO drink VALUES('3DRNK','Coca Cola Zero','Soft Drink without sugar','/img/drinks/coca-cola-zero.jpg',4.50);
INSERT INTO drink VALUES('4DRNK','Fanta Orange','Soft drink flavored with orange','/img/drinks/fanta-orange.jpg',4.50);
INSERT INTO drink VALUES('5DRNK','Fanta Kolita','Soft Drink','/img/drinks/fanta-kolita.jpg',4.50);
INSERT INTO drink VALUES('6DRNK','Fresh Strawberry','Fresh Natural of Strawberry with Milk or water','/img/drinks/fresh-natural-of-strawberry.jpg',4.50);
INSERT INTO drink VALUES('7DRNK','Fresh of Pear','Fresh Natural of Pear with Milk or water','/img/drinks/fresh-natural-of-pear.jpg',4.50);
INSERT INTO drink VALUES('8DRNK','Fresh of Blackberry','Fresh Natural of Blackberry with Milk or water','/img/drinks/fresh-natural-of-blackberry.jpg',4.50);
INSERT INTO drink VALUES('9DRNK','Fresh of Watermelon','Fresh Natural of Watermelon with Milk or water','/img/drinks/fresh-natural-of-watermelon.jpg',4.50);
INSERT INTO drink VALUES('10DRNK','Fresh of Oats','Fresh Natural of Oat with Milk or water','/img/drinks/fresh-natural-of-oats.jpg',4.50);
INSERT INTO drink VALUES('11DRNK','Fresh of Chocolate','Fresh Natural of Chocolate with Milk','/img/drinks/fresh-natural-of-chocolate.jpg',4.50);


/*Lasagna*/
INSERT INTO ingredient_dish VALUES(1,'5ING','1MNCRS');
INSERT INTO ingredient_dish VALUES(2,'8ING','1MNCRS');
INSERT INTO ingredient_dish VALUES(3,'15ING','1MNCRS');
INSERT INTO ingredient_dish VALUES(4,'20ING','1MNCRS');
/*Ceviche**/
INSERT INTO ingredient_dish VALUES(5,'1ING','2MNCRS');
INSERT INTO ingredient_dish VALUES(6,'13ING','2MNCRS');
INSERT INTO ingredient_dish VALUES(7,'14ING','2MNCRS');
INSERT INTO ingredient_dish VALUES(8,'24ING','2MNCRS');
/*Hamburger*/
INSERT INTO ingredient_dish VALUES(9,'1ING','3MNCRS');
INSERT INTO ingredient_dish VALUES(10,'3ING','3MNCRS');
INSERT INTO ingredient_dish VALUES(11,'10ING','3MNCRS');
INSERT INTO ingredient_dish VALUES(12,'15ING','3MNCRS');
/*Chicken pie*/
INSERT INTO ingredient_dish VALUES(13,'1ING','4MNCRS');
INSERT INTO ingredient_dish VALUES(14,'3ING','4MNCRS');
INSERT INTO ingredient_dish VALUES(15,'8ING','4MNCRS');
INSERT INTO ingredient_dish VALUES(16,'20ING','4MNCRS');
/*Pizza**/
INSERT INTO ingredient_dish VALUES(17,'1ING','5MNCRS');
INSERT INTO ingredient_dish VALUES(18,'7ING','5MNCRS');
INSERT INTO ingredient_dish VALUES(19,'20ING','5MNCRS');
INSERT INTO ingredient_dish VALUES(20,'16ING','5MNCRS');
INSERT INTO ingredient_dish VALUES(21,'25ING','5MNCRS');
/*Sushi**/
INSERT INTO ingredient_dish VALUES(22,'2ING','6MNCRS');
INSERT INTO ingredient_dish VALUES(23,'14ING','6MNCRS');
INSERT INTO ingredient_dish VALUES(24,'23ING','6MNCRS');
INSERT INTO ingredient_dish VALUES(25,'26ING','6MNCRS');
/*Filet Mignon*/
INSERT INTO ingredient_dish VALUES(26,'11ING','7MNCRS');
INSERT INTO ingredient_dish VALUES(27,'20ING','7MNCRS');
INSERT INTO ingredient_dish VALUES(28,'27ING','7MNCRS');
INSERT INTO ingredient_dish VALUES(29,'22ING','7MNCRS');
/*Roasted Beets*/
INSERT INTO ingredient_dish VALUES(30,'31ING','8MNCRS');
INSERT INTO ingredient_dish VALUES(31,'32ING','8MNCRS');
INSERT INTO ingredient_dish VALUES(32,'33ING','8MNCRS');
INSERT INTO ingredient_dish VALUES(33,'34ING','8MNCRS');
/*Lasagna with Ground Beef*/
INSERT INTO ingredient_dish VALUES(34,'5ING','9MNCRS');
INSERT INTO ingredient_dish VALUES(35,'35ING','9MNCRS');
INSERT INTO ingredient_dish VALUES(36,'15ING','9MNCRS');
INSERT INTO ingredient_dish VALUES(37,'20ING','9MNCRS');
/*Ceviche**/
INSERT INTO ingredient_dish VALUES(38,'1ING','1APPTZR');
INSERT INTO ingredient_dish VALUES(39,'3ING','1APPTZR');
INSERT INTO ingredient_dish VALUES(40,'14ING','1APPTZR');
INSERT INTO ingredient_dish VALUES(41,'13ING','1APPTZR');
/*Grilled Shrimp Salad **/
INSERT INTO ingredient_dish VALUES(42,'1ING','2APPTZR');
INSERT INTO ingredient_dish VALUES(43,'3ING','2APPTZR');
INSERT INTO ingredient_dish VALUES(44,'13ING','2APPTZR');
INSERT INTO ingredient_dish VALUES(45,'36ING','2APPTZR');
/*Grilled Salmon Salad**/
INSERT INTO ingredient_dish VALUES(46,'1ING','3APPTZR');
INSERT INTO ingredient_dish VALUES(47,'3ING','3APPTZR');
INSERT INTO ingredient_dish VALUES(48,'23ING','3APPTZR');
INSERT INTO ingredient_dish VALUES(49,'17ING','3APPTZR');
/*Grilled Sirloin Salad**/
INSERT INTO ingredient_dish VALUES(50,'1ING','4APPTZR');
INSERT INTO ingredient_dish VALUES(51,'3ING','4APPTZR');
INSERT INTO ingredient_dish VALUES(52,'13ING','4APPTZR');
INSERT INTO ingredient_dish VALUES(53,'37ING','4APPTZR');
/*French Onion Soup**/
INSERT INTO ingredient_dish VALUES(54,'38ING','5APPTZR');
INSERT INTO ingredient_dish VALUES(55,'39ING','5APPTZR');
INSERT INTO ingredient_dish VALUES(56,'40ING','5APPTZR');
INSERT INTO ingredient_dish VALUES(57,'19ING','5APPTZR');
/*Strips of Filet Mignon**/
INSERT INTO ingredient_dish VALUES(58,'1ING','6APPTZR');
INSERT INTO ingredient_dish VALUES(59,'3ING','6APPTZR');
INSERT INTO ingredient_dish VALUES(60,'23ING','6APPTZR');
INSERT INTO ingredient_dish VALUES(61,'11ING','6APPTZR');
/*Marinated Filet Mignon Steak Sandwich**/
INSERT INTO ingredient_dish VALUES(62,'1ING','7APPTZR');
INSERT INTO ingredient_dish VALUES(63,'3ING','7APPTZR');
INSERT INTO ingredient_dish VALUES(64,'23ING','7APPTZR');
INSERT INTO ingredient_dish VALUES(65,'11ING','7APPTZR');
INSERT INTO reef_user VALUES 
(1,'Leonardo','Aranibar',
'LeonardoAranibarSanchez','I am Web Developer','laranibarsanchez@gmail.com',
'$2a$08$qP7LVeZRulKdFIVmwsemUem24bSYY9e4pg.NWqJg5p5FCFAIvxTvS',
NULL,'active',NULL,NULL,'system','');

INSERT INTO header_invoice (id_header, total,product_id,product_name,product_quantity) VALUES(1,15,'3APPTZR','Grilled Salmon Salad',2);
INSERT INTO header_invoice (id_header, total,product_id,product_name,product_quantity) VALUES(2,15,'8DESRT','Brownie with Ice Cream',2);

INSERT INTO invoice_detail VALUES(1,1,1,'INVC1','2019-03-12 02:30:00','','','');
INSERT INTO invoice_detail VALUES(2,1,2,'INVC1','2019-03-12 02:30:00','','','');
