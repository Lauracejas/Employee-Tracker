const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'emp_trackerDB',
});

// function which prompts the user for what action they want to do

const start = () => {
  inquirer.prompt({
    type: 'rawlist',
    name: 'toDo',
    message: 'What would you like to do? ',
    choices: [
      {name: 'View all employees', value: viewAllEmp},
      {name: 'View all employees by Department', value: viewAEmpByDepartment},
      {name: 'View all employees by Manager', value: viewAEmpByManager},
      {name: 'Add employee', value: addEmployee},
      {name: 'Update employee role', value: updateEmployeeRole},
      {name: 'Update employee manager', value: updateEmployeeManager},
    ],
  }).then(answer => {
    answer.toDo();
  });
};








connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});