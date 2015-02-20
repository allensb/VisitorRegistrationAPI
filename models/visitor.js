var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VisitorSchema   = new Schema({
    name: String,
    userID: String
});

module.exports = mongoose.model('Visitor', VisitorSchema);