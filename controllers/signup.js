////////////////////////////////////////////////////////////////
///////////////**** Controller for Signup ************//////////
////////////////////////////////////////////////////////////////

var patientModel = require('../models/patient');

var UserSignup = function (req , res) {
    console.log(req.body);
    var ctr = 0;
    patientModel.find({}, function(err, docs){
        if (err) throw err;
        ctr = docs.length;
    });
    var rec = req.body;
    rec["patid"] = ctr + 1;
    var newPatient = new patientModel(rec);
    newPatient.save(newPatient, function (err, doc) {
        if (err) throw err;
        console.log(doc);
        res.json({ "msg": 'Successfully Registered!' });
    });
};

module.exports = { "UserSignup": UserSignup };