var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        name: {
            type: String, 
            required: true,
            index: {
                unique: true
            }
        },
        price: {
            type: Number
        },
        category: {
            type: String
        }
    })

    return mongoose.model('Curso', schema, 'cursos');
}