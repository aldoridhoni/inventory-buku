var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name : String,
    books : [{type: Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Author', authorSchema);
