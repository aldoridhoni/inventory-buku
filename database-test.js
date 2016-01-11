var mongoose = require('mongoose');
mongoose.connect('mongodb://docker.local');

var Cat = mongoose.model('Cat', {name: String});

var Kitten = new Cat({name: 'Aufar'});
Kitten.save(function (err) {
    if (err)
        console.log(err);
});
