////////////////////////////////////////////////////////////////
///////////////**** Controller for Login ************///////////
////////////////////////////////////////////////////////////////

var workerModel = require('../models/worker');
var patientModel = require('../models/patient');
var govModel = require('../models/gov');
var phcModel = require('../models/phc');
var ngoModel = require('../models/ngo');
var complaintModel = require('../models/complaint');
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var NewComplaint = function (req , res){
    // User Login function.
    console.log(req.body);
    console.log(req.session.user._id)
    var rec = { title: req.body.title, content: req.body.content, patient: ObjectId(req.session.user._id) }
    var newC = new complaintModel(rec);
    newC.save(newC, function(err, doc) {
        if(err) throw err;
        console.log(doc);
        res.json(doc);
    });
}

module.exports = { "NewComplaint": NewComplaint };