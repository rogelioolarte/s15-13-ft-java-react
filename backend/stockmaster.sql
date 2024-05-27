-- Query’s Base de Datos StockMaster:

DROP DATABASE if EXISTS stockmaster;
CREATE DATABASE stockmaster CHARACTER SET utf8 COLLATE UTF8_GENERAL_CI;
USE stockmaster;


CREATE TABLE user (
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250)  NOT NULL,
    lastname VARCHAR(250)  NOT NULL,
     email VARCHAR(250)  NOT NULL,
    password VARCHAR(250) NOT NULL
);


CREATE TABLE taxes (
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) UNIQUE NOT NULL,
    percentage DECIMAL(18,2) NOT NULL
);

CREATE TABLE customer (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
personalcode varchar(100) UNIQUE NOT NULL,
customer_type ENUM('PHYSICAL', 'LEGAL') NOT NULL DEFAULT 'PHYSICAL'
); 



CREATE TABLE product (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    barcode VARCHAR(255) UNIQUE,
    description VARCHAR(255),
    sale_price DECIMAL(18,2) NOT NULL,
    minimal INT DEFAULT 0,
    stock INT DEFAULT 0,
   active BOOLEAN DEFAULT TRUE
); 



CREATE TABLE supplier (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    companycode VARCHAR(255) UNIQUE NOT NULL,
    active BOOLEAN DEFAULT TRUE 
);

CREATE TABLE supplier_product (
    id_product BIGINT,
    id_supplier BIGINT,
    price_cost DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_supplier) REFERENCES supplier(id)
); 







CREATE TABLE sales (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_customer BIGINT,
id_taxes BIGINT,
date DATE NOT NULL,
discount DECIMAL(18,2),
total DECIMAL(18,2) NOT NULL,
FOREIGN KEY (id_customer) REFERENCES customer(id),
FOREIGN KEY (id_taxes) REFERENCES taxes(id)
);

CREATE TABLE sales_products (
    id_sales BIGINT,
	 id_product BIGINT,
    quantity INT,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_sales) REFERENCES sales(id)
); 

CREATE TABLE purchase (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bill VARCHAR(250) NOT NULL,
    date DATE,
    id_supplier BIGINT,
    total DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (id_supplier) REFERENCES supplier(id)
);


CREATE TABLE products_purchase (
    id_product BIGINT,
    id_purchase BIGINT,
    quantity INT,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_purchase) REFERENCES purchase(id)
); 

INSERT INTO user (name, lastname, email, password) VALUES ("Pepe", "Guayabas", "PepenGuayabas@gmail.com", "1234");