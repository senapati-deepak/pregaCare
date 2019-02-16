var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: { type: String },
    venue: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    isOver: { type: Boolean, default: false },
    content: { type: String },
    ngo: {type: Schema.Types.ObjectId, 
        ref: 'ngo'}
});

var eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;