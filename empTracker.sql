DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;
USE emp_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)  
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,  
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREING KEY (role_id) PREFERENCES role(id),
  FOREING KEY (manager_id) PREFERENCES employee(id)

);

INSERT INTO department (name)
VALUES ("");

INSERT INTO department (name)
VALUES ("");

INSERT INTO department (name)
VALUES ("");