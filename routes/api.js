////////////////////////////////////////////////////////////////
///////////**** Routes for all the API calls ******/////////////
////////////////////////////////////////////////////////////////

var express = require('express');
var router = express.Router();

/* Importing all the controllers. */ 
var login = require('../controllers/login')
var workers = require('../controllers/workers')
var patients = require('../controllers/patients')
var signup = require('../controllers/signup')
var complaint = require('../controllers/complaint')
var event = require('../controllers/event')

/* To test api route is working. */
router.get('/', function(req, res, next) {
  res.send('API is working');
});

router.post('/signup', signup.UserSignup);

router.post('/login', login.UserLogin);


router.get('/logout', function(req, res) {
  console.log("adsdasadads", req.session.type);
  req.session.destroy();
  res.send("Session Destroyed Successfully!");
});


router.post('/new_complaint', complaint.NewComplaint);
router.post('/create_event', event.NewEvent);







module.exports = router;
