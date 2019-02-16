var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var complaintSchema = new Schema({
    title: {type: String},
    content: {type: String},
    patient: { type: Schema.Types.ObjectId,
    ref: 'patient' }
});

var complaintModel = mongoose.model('complaint', complaintSchema);

module.exports = complaintModel;