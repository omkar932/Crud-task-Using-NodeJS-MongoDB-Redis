const mongoose = require('mongoose')

const Employees = mongoose.model('Employee',{
    name: String,
    email: String,
    salary: String
})

module.exports ={ Employees }