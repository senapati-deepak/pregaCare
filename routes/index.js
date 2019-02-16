////////////////////////////////////////////////////////////////
///////////**** Routes for all the EJS Views/Pages ******///////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();

var patientModel = require('../models/patient');
var workerModel = require('../models/worker');
var complaintModel = require('../models/complaint');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get("/training", function(req, res, next) {
    if(req.session.user && req.session.type) {
    res.render('training.ejs');
    } else {
        res.redirect("/");
    }
});

router.get("/dashboard", function(req, res, next) {
    console.log(req.session.user);
    if(req.session.user && req.session.type) {
        res.render('dashboard.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});

router.get("/patient_registration", function(req, res, next) {
    if(req.session.user && req.session.type === "AWC") {
        res.render('patient_registration.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});

router.get("/patient_list", function(req, res, next) {
    if(req.session.user && req.session.type) {
        patientModel.find({}, function(err, docs) {
            if (err) throw err;
            console.log(docs);
            res.render("patient_list.ejs", { "patients": docs, type: req.session.type, user: req.session.user });
        });
    } else {
        res.redirect("/");
    }
});

router.get("/vaccination_list", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('vaccination_list.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});

router.get("/diet_plan", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('diet_plan.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});

router.get("/records_upload", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('records_upload.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});

router.get("/asha_list", function(req, res, next) {
    //console.log()
    if(req.session.user && req.session.type !== "AWC") {
        workerModel.find({}, function(err, docs) {
            if (err) throw err;
            console.log(docs);
            res.render("asha_list.ejs", { "workers": docs, type: req.session.type, user: req.session.user });
        });
    } else {
        res.redirect("/");
    }
});


router.get("/create_event", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('create_event.ejs',  { type: req.session.type, user: req.session.user} );
    } else {
        res.redirect("/");
    }
});

router.get("/show_events", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('show_events.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/file_complaint", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('file_complaint.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/show_complaints", function(req, res, next) {
    if(req.session.user && req.session.type) {
        complaintModel.find({}, function(err, docs) {
            if(err) throw err;
            res.render('show_complaints.ejs', { type: req.session.type, user: req.session.user, complaints: docs });
        });
    } else {
        res.redirect("/");
    }
});


router.get("/workplan", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('workplan.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/analysis_tools", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('analysis_tools.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/defaulters_list", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('defaulters_list.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/reports", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('reports.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/phc_list", function(req, res, next) {
    if(req.session.user && req.session.type) {
        res.render('phc_list.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
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
    if(req.session.user && req.session.type) {
        res.render('notify.ejs', { type: req.session.type, user: req.session.user });
    } else {
        res.redirect("/");
    }
});

module.exports = router;