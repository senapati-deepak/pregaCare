////////////////////////////////////////////////////////////////
///////////////**** Controller for Login ************///////////
////////////////////////////////////////////////////////////////

var workerModel = require('../models/worker');
var patientModel = require('../models/patient');
var govModel = require('../models/gov');
var phcModel = require('../models/phc');
var ngoModel = require('../models/ngo');


var UserLogin = function (req , res){
    // User Login function.
    console.log(req.body);
    var currModel = patientModel
    switch(req.body.type) {
        case "Govt.":
            currModel = govModel
            break;
        case "PHC":
            currModel = phcModel
            break;
        case "Patient":
            currModel = patientModel
            break;
        case "NGO":
            currModel = ngoModel
            break;
        
        default:
            currModel = workerModel
    }

    console.log(currModel);

    currModel.findOne({ "userid": req.body.userid}, function (err, doc) {
        console.log(doc);

        if (err) throw err;
        if (doc) {
                if (doc.password === req.body.password) {
                    res.json({msg: "Passed!!"});
                } else {
                    res.json({ msg: "Invalid Password, Enter again" });
                }
        } else {
            res.json({ "msg": "User ID not found" });
        }

    })
}

module.exports = { "UserLogin": UserLogin };