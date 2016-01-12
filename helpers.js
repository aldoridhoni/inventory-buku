'use strict';
var moment = require('moment');

exports.format_date = function(date, format) {
    if(date == null || date == "0000-00-00") return null;
    return moment(date).format(format);
};

exports.from_now = function(date) {
    if(date == null || date == "0000-00-00") return null;
    return moment(date).fromNow();
}

exports.xif = function(v1, operator, v2, options) {
  //http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
  switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
}
