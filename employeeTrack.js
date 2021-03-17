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
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do? ',
    choices: [
      { name: 'View all employees', value: viewAllEmp },
      { name: 'View all employees by Department', value: viewEmpByDepartment },
      { name: 'View all employees by Manager', value: viewAEmpByManager },
      { name: 'Add employee', value: addEmployee },
      { name: 'Update employee role', value: updateEmployeeRole },
      { name: 'Update employee manager', value: updateEmployeeManager },
    ],
  }).then(answer => {
    answer.toDo();
  });
};

// function wich prompts the user to see all employees
const viewAllEmp = () => {
  connection.query("SELECT employee.firts_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id ");
  (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  }
}

const viewEmpByDepartment = () => {
  connection.query("SELECT employee.first_name, employee.last_name, department.name FROM employee INNER JOIN department ON employee.id = department.id");
  (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  }
}

const viewAEmpByManager = () => {
connection.query("SELECT * FROM employee WHERE manager_id IS NULL");
(err, res) => {
  if (err) throw err
  console.table(res)
  start()
}
}

const addEmployee = () => {
  const addEmpQuestion = [
    {
      type: "input",
      name: "firstname",
      message: "What is the employee's first name? "
    },
    {
      type: "input",
      name: "lastname",
      message: "What is the employee's larst name? "
    },
    {
      type: "list",
      name: "roleId",
      message: "What is the employee's role? ",
      choices: selectRole()
    },
    {
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager? ",
      choices: selectManager()
    },

  ];
  inquirer.prompt(addEmpQuestion).then(answer => {
    connection.query('INSERT INTO employee SET ?',
      {
        first_name: answer.firstname,
        last_name: answer.lastname,
        role_id: answer.roleId,
        manager_id: answer.managerId
      },
      (err) => {
        if (err) throw err
        console.table(answer);
        start();

      })

  })

}

// 'INSERT INTO role SET ?',
// {
//   title: answer,
//   salary: answer,
//   department_id: answer
// }





connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});