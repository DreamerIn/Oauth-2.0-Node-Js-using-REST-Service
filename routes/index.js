var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.redirect('/users/login');
});

module.exports = router;
