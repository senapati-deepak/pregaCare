////////////////////////////////////////////////////////////////
///**** Schema definition for an ASHA worker ************///////
////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ngoSchema = new Schema({
    userid: {type: String},
    name: { type: String },
    contact: { type: String , unique : true },
    address: { type: String },
    password: {type: String}, 
    email: {type: String}
});

var ngoModel = mongoose.model('ngo', ngoSchema);

module.exports = ngoModel;