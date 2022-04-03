const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String},
    isDelete: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;