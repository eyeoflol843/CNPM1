const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const jwtController = require('./controller/jwt');

const userRouter = require('./router/user');
const authRouter = require('./router/auth');
const todoRouter = require('./router/todo');

const app = express();

app.use(bodyParser.json())


// Connect to Database
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Connect Database Success !!');
} catch (error) {
    console.log(error)
    console.log('Connect Database Fail !!');
}

app.use(jwtController.verifyToken);


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);


const port = process.env.POST || 3000;


app.listen(port, () => {
  console.log(`App listening on http://${process.env.PUBLIC_HOST}:${port}`)
})