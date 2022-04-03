const { checkToken } = require('../controller/jwt');

// Model
const todoModel = require('../schemas/todo');
const userModel = require('../schemas/user');


const createTodo = async (req, res, next) => {
    if (req.user === undefined) {
        return res.status(200).json({ message: 'You are not authorized to take this action!!' });
    }

    // Get user info
    const user = await userModel.findOne({ username: req.user.username });
    if (user === null) {
        return res.status(200).json({message: 'Can not create todo !!'});
    }

    const { title, description } = req.body;
    const todo = new todoModel({ title: title, description: description, author: user });
    try {
        await todo.save();
        return res.status(201).json({ todo_info: todo });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Can not create todo !!' });
    }
};

const getAllTodo = async (req, res, next) => {
    if (req.user === undefined) {
        return res.status(200).json({ message: 'You are not authorized to take this action!!' });
    }

    const todoList = await todoModel.find({ isDelete: false});
    return res.status(201).json({ todo_list: todoList });
}

const getIdTodo = async (req, res, next) => {
    if (req.user === undefined) {
        return res.status(200).json({ message: 'You are not authorized to take this action!!' });
    }

    const id = req.params.id;
    const todoList = await todoModel.findOne({ _id: id, isDelete: false });
    return res.status(201).json({ todo_list: todoList });
}

const updateTodo = async (req, res, next) => {
    if (req.user === undefined) {
        return res.status(200).json({ message: 'You are not authorized to take this action!!' });
    }

    const { id, title, description, isDelete } = req.body;
    try {
        await todoModel.findOneAndUpdate({ _id: id }, { title: title, description: description, isDelete: isDelete });
        return res.status(200).json({ message: 'Update success' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Can not update todo !!' });
    }
}

const deleteTodo = async (req, res, next) => {
    if (req.user === null) {
        return res.status(200).json({ message: 'You are not authorized to take this action!!' });
    }

    const id = req.params.id;
    try {
        await todoModel.findOneAndUpdate({ _id: id }, { isDelete: true });
        return res.status(200).json({ message: 'OK' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Can not delete todo !!' });
    }
}


module.exports = {
    createTodo,
    getAllTodo,
    updateTodo,
    deleteTodo,
    getIdTodo,
}