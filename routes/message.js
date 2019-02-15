var express = require('express');
var router = express.Router();

/* Importing all the controllers. */ 
var login = require('../controllers/login')
var workers = require('../controllers/workers')
var patients = require('../controllers/patients')
var signup = require('../controllers/signup')

/* To test api route is working. */
router.get('/', function(req, res, next) {
  res.send('API is working');
});



module.exports = router;