const mongoose = require('mongoose');
const Customer = require('./models/customer');

// Map to Global Promise
mongoose.Promise = global.Promise;

// Connect to DB
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
    useNewUrlParser: true
});

// Add Customer
const addCustomer = customer => {
    Customer.create(customer)
            .then(res => {
                console.info('New Customer Added');
                mongoose.connection.close();
            })
            .catch(err => {
                console.log(err);
                mongoose.connection.close(); 
            })
}

//View All Customers
const listCustomers = () => {
    Customer.find()
            .then(customers => {
                console.info(customers);
                console.info(`${customers.length} Matches`);
                mongoose.connection.close();    
            })
            .catch(err => {
                console.log(err);
                mongoose.connection.close();
            })
}

//Find Customer
const findCustomer = name => {
    //Case Insensitive
    const search = new RegExp(name, 'i');

    Customer.find({$or: [{ firstname: search }, { lastname: search }]})
            .then(res => {
                console.info(res);
                console.info(`${res.length} Matches`);
                mongoose.connection.close();
            })
            .catch(err => {
                console.log(err);
                mongoose.connection.close();
            });
}

//Update Customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer)
            .then(customer => {
                console.info('Customer Update')
                mongoose.connection.close();
            })
            .catch(err => {
                console.log(err);
                mongoose.connection.close();
            });
}

//Remove Customer
const removeCustomer = _id => {
    Customer.deleteOne({ _id })
            .then(customer => {
                console.info('Customer Removed')
                mongoose.connection.close();
            })
            .catch(err => {
                console.log(err);
                mongoose.connection.close();
            });
}

//Export Methods
module.exports = {
    addCustomer,
    listCustomers,
    findCustomer,
    updateCustomer,
    removeCustomer
}