////////////////////////////////////////////////////////////////
///////////////**** Controller for Login ************///////////
////////////////////////////////////////////////////////////////

var workerModel = require('../models/worker');
var patientModel = require('../models/patient');
var govModel = require('../models/gov');
var phcModel = require('../models/phc');
var ngoModel = require('../models/ngo');
var EventModel = require('../models/event');
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var NewEvent = function (req , res){
    // User Login function.
    console.log(req.body);
    console.log(req.session.user._id)
    var rec = { name: req.body.name, venue: req.body.venue, content: req.body.content, ngo: ObjectId(req.session.user._id), startDate: req.body.startDate, startTime: req.body.startTime, endDate: req.body.endDate, endTime: req.body.endTime }
    var newE = new EventModel(rec);
    newE.save(newE, function(err, doc) {
        if(err) throw err;
        console.log(doc);
        res.json(doc);
    });
}

module.exports = { "NewEvent": NewEvent };