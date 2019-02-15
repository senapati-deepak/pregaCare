////////////////////////////////////////////////////////////////
///**** Schema definition for an ASHA worker ************///////
////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workerSchema = new Schema({
    userid: { type: String },
    name: { type: String },
    contact: { type: String , unique : true},
    address: { type: String },
    dob: { type: String },
    patientIDs: [{
        type: Schema.Types.ObjectId,
        ref: 'patient'
    }],
    email: {type: String},
    remarks: { type: String },
    education: { type: String },
    dateOfJoining: { type: String },
    password : { type : String }
});

var workerModel = mongoose.model('worker', workerSchema);

module.exports = workerModel;