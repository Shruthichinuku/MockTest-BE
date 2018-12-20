var mongoose = require('mongoose');
var QuestionSchema = new mongoose.Schema({
    id: String,
    title: String,
    qn: String,
    options: Array,
    answer: String
});
module.exports = mongoose.model('Question', QuestionSchema);