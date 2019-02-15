////////////////////////////////////////////////////////////////
///////////**** Routes for all the EJS Views/Pages ******///////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();

var patientModel = require('../models/patient');
var workerModel = require('../models/worker');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get("/training", function(req, res, next) {
    res.render('training.ejs');
});

router.get("/dashboard", function(req, res, next) {
    res.render('dashboard.ejs');
});

router.get("/patient_registration", function(req, res, next) {
    res.render('patient_registration.ejs');
});

router.get("/patient_list", function(req, res, next) {
    patientModel.find({}, function(err, docs) {
        if (err) throw err;
        console.log(docs);
        res.render("patient_list.ejs", { "patients": docs });
    });
});

router.get("/vaccination_list", function(req, res, next) {
    res.render('vaccination_list.ejs');
});

router.get("/diet_plan", function(req, res, next) {
    res.render('diet_plan.ejs');
});

router.get("/records_upload", function(req, res, next) {
    res.render('records_upload.ejs', {files: []});
});

router.get("/asha_list", function(req, res, next) {
    //console.log()
    workerModel.find({}, function(err, docs) {
        if (err) throw err;
        console.log(docs);
        res.render("asha_list.ejs", { "workers": docs });
    });
});
// router.get('/get_records/:patid', (req, res) => {
//     //console.log("Hello", req.body["patid"])
//     console.log("Helloooo", req.params.patid);
//
//             res.json("lajhkaj");
//
// });
//
// router.get("/get_records/", function(req, res, next) {
//     res.render("records_upload.ejs", { "files": False });
// });



router.get("/notify", function(req, res, next) {
    res.render('notify.ejs');
});

module.exports = router;