var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var publisherSchema = new Schema({
    name : String,
    alamat : String,
    kota : String,
    books : [{type: Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Publisher', publisherSchema);
