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
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Human Resource");
INSERT INTO department (name) VALUES ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Technology Officer", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Executive assistants", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing manager", 40000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Ingineer", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Project manager", 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Cejas", 123, 12);


