////////////////////////////////////////////////////////////////
///**** Schema definition for an ASHA worker ************///////
////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phcSchema = new Schema({
    userid: {type: String},
    name: { type: String },
    contact: { type: String , unique : true },
    address: { type: String },
    password: {type: String}, 
    email: {type: String}
});

var phcModel = mongoose.model('phc', phcSchema);

module.exports = phcModel;