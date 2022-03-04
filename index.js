const express = require('express');

const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.json())
const dotenv = require('dotenv')

const connectDB = require('./config/db')
// console.log(redis);;
//load env
dotenv.config({path:'./config/config.env'})
connectDB();


app.use('/',require('./routes/routes'))

app.listen(3000,function(){
    console.log('Server running');
})