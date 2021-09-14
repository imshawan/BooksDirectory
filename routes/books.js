var express = require('express');
var router = express.Router();
var db = require('./entries');

/* GET home page. */
router.get('/', function(req, res, next) {
    entries = db.getAllEntries();
    res.json(entries);
});

module.exports = router;
