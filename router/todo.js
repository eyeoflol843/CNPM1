const express = require('express');
const router = express.Router();

const todoController = require('../controller/todo');

router.get('/get', todoController.getAllTodo);

router.get('/get/:id', todoController.getIdTodo);

router.post('/create', todoController.createTodo);

router.patch('/update', todoController.updateTodo);

router.delete('/delete/:id', todoController.deleteTodo);


module.exports = router;