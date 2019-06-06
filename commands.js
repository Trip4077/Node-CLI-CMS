#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {
    addCustomer,
    listCustomers,
    findCustomer,
    updateCustomer,
    removeCustomer
} = require('./index');

// Customer Questions
const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name: '
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name: '
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email Address: '
    }
]

program
    .version('1.0.0')
    .description('Client Management System')

// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add A New Customer to Database')
//     .action((firstname, lastname, phone, email) => {
        
//         addCustomer({ firstname, lastname, phone, email });

//     });

// Add Command
program
    .command('add')
    .alias('a')
    .description('Add New Customer To Database')
    .action(() => {
        prompt(questions)
            .then(answers => addCustomer(answers))
            .catch(err => console.log(err));
    });

// List command
program
    .command('list')
    .alias('l')
    .description('List All Customers In Database')
    .action(() => listCustomers());

// Find Command
program
    .command('find <name>')
    .alias('f')
    .description('Find Existing Customer in Database')
    .action(name => {

        findCustomer(name);

    });

// Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update Existing Customer In Database')
    .action(_id => {
        prompt(questions)
            .then(answers => updateCustomer(_id, answers))
            .catch(err => console.log(err));
    });

// Remove Command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove Customer From Database')
    .action(_id => removeCustomer(_id));

program.parse(process.argv);