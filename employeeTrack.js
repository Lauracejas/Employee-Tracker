const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'rootpass',
  database: 'emp_trackerDB',
});

// function which prompts the user for what action they want to do

const start = () => {
  inquirer.prompt({
    type: 'rawlist',
    name: 'toDo',
    message: 'What would you like to do? ',
    choices: [
      'View all employees',
      'View all departments',
      'View all employees by Department',
      'View all roles',
      'Add employee',
      'Update employee role',
      'Update employee manager',
    ],
  })
    .then(answer => {
      switch (answer.toDo) {
        case 'View all employees':
          viewAllEmp();
          break;
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all employees by Department':
          viewEmpByDepartment();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployeeRole();
          break;
        case 'EXIT':
          exitApp();
          break;
          default:
            break;

      }

    });
};

// function wich prompts the user to see all employees
const viewAllEmp = () => {
  const query =
    `
  SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS Department
  FROM employee
  INNER JOIN role ON role.id = employee.role_id 
  INNER JOIN department ON department.id = role.department_id
  `;
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  });
}

// function wich prompts the user to see employees by departments
const viewEmpByDepartment = () => {
  const query =
    `SELECT employee.first_name, employee.last_name, department.name AS Department
  FROM employee
  INNER JOIN role ON employee.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id
  ORDER BY employee.id
  `;
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  });
}

const viewAllRoles = () => {
  connection.query("SELECT * FROM department", (err, res) => {
  if (err) throw err
  console.table(res)
  start()
});
}


const viewAllDepartments = () => {
    connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  });
}

const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, roles) => {
    connection.query("SELECT * FROM employee", (err, managers) => {
      // const addEmpQuestion = [
      inquirer.prompt([
        {
          type: "input",
          name: "firstname",
          message: "What is the employee's first name? "
        },
        {
          type: "input",
          name: "lastname",
          message: "What is the employee's last name? "
        },
        {
          type: "rawlist",
          name: "roleId",
          message: "What is the employee's role? ",
          choices: roles.map(role => {
            return { name: role.title, value: role.id }
          })
        },
        {
          type: "rawlist",
          name: "managerId",
          message: "Who is the employee's manager? ",
          choices: managers.map(manager => {
            return { name: `${manager.first_name} ${manager.last_name}`, value: manager.id}
          })
        },
      ])
        .then(answer => {
          console.log(answer);
          connection.query('INSERT INTO employee SET ?',
            {
              first_name: answer.firstname,
              last_name: answer.lastname,
              role_id: answer.roleId || 0,
              manager_id: answer.managerId || 0,
            },
            (err) => {
              if (err) throw err
              console.table('Your employee has been added!');
              start();
            }   
        )
    });
  });
});
}


const updateEmployeeRole = () => {
  connection.query(`"SELECT employe.first_name, role.title FROM employee"`);
  if (err) throw err
  const updateEmpQuestions = [
    {
      name: "role",
      type: "list",
      message: "What is the employee's name? ",
      choices: [],
    }
  ]
}

connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

const exitApp = () => {
  connection.end();
}