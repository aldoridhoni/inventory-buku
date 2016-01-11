var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var bookSchema = new Schema({
    isbn : Number,
    title : String,
    pages : Number,
    condition : String,
    _author : {type: ObjectId, ref: 'Author'},
    _publisher : {type: ObjectId, ref: 'Publisher'},
    date : Date
});

module.exports = mongoose.model('Book', bookSchema);
