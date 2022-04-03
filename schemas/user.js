const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  age: {type: Number},
  isActive: { type: Boolean, default: true},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;