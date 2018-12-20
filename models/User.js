var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    score: Number,
    date: Date,
    TimeSpent: Number
});
module.exports = mongoose.model('User', UserSchema);