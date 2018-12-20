var mongoose = require('mongoose');
var TestTypeSchema = new mongoose.Schema({
    id: String,
    title: String,
    
});
module.exports = mongoose.model('TestType', TestTypeSchema);