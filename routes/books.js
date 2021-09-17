var express = require('express');
const bodyparser = require('body-parser');
var router = express.Router();
var db = require('./entries');
var credentials = require('../credentials');
router.use(bodyparser.json());
var validator = require('../validation/validator')
const { validationResult} = require('express-validator');

function authenticate (headers) {
    var authHeader = headers.authorization;
    if (!authHeader) {
        return false;
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == credentials.username && pass == credentials.password) {
        return true // authorized
    } 
    else {
        return false
    }
  }

router.route('/(:bookId)?')

/* GET home page. */
.get(function(req, res, next) {
    if (req.params.bookId){
        entries = db.getEntryById(req.params.bookId);
        res.json(entries);

    }
    else {
        entries = db.getAllEntries();
        res.json(entries);
    }
})

.post(validator.validateData, function(req, res, next){
    const errors = validationResult(req);
    if (errors){
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.json({error: errors.array()});
    }
    else if (!authenticate(req.headers)){
        res.setHeader('WWW-Authenticate', 'Basic');      
        res.statusCode = 401;
        res.json({status: "refused", message: "You are not authenticated! Only an Admin can Insert data."})
    }
    else if (!req.params.bookId){
        data = {}
        var id = db.getLastID() + 1;
        data ={
        "id": id,
        "title": req.body.title,
        "author": req.body.author,
        "link": req.body.link,
        "origin": req.body.origin,
        "language": req.body.language,
        "year": req.body.year,
        "pages": req.body.pages
        }
        db.insertEntry(data)
        resp = db.getEntryById(id)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: "success", message: "Records entered successfully!", entry: resp})
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.json({status: "refused", message: "Cannot post data into a particular ID"})
    }
})

.put(validator.validateData, function(req, res, next) {
    const errors = validationResult(req);
    if (errors){
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.json({error: errors.array()});
    }
    else if (!authenticate(req.headers)){
        res.setHeader('WWW-Authenticate', 'Basic');      
        res.statusCode = 401;
        res.json({status: "refused", message: "You are not authenticated! Only an Admin can Update data."})
    }
    else if (req.params.bookId){
        data = {}
        data ={
          "title": req.body.title,
          "author": req.body.author,
          "link": req.body.link,
          "origin": req.body.origin,
          "language": req.body.language,
          "year": req.body.year,
          "pages": req.body.pages
        }
        entries = db.updateEntry(req.params.bookId, data);
        res.statusCode = 200;
        updatedEntry = db.getEntryById(req.params.bookId);
        res.json({status: "success", message: "Record modified successfully!", entry: updatedEntry});
    }
    else {
        res.statusCode = 400;
        res.json({status: "refused", message: "A particular BookID is required to modify a specific record"});
    }
})

.delete(function(req, res, next) {
    if (!authenticate(req.headers)){
        res.setHeader('WWW-Authenticate', 'Basic');      
        res.statusCode = 401;
        res.json({status: "refused", message: "You are not authenticated! Only an Admin can Delete data."})
    }
    else if (req.params.bookId){
        entries = db.deleteEntry(req.params.bookId);
        res.json({status: "success", message: "Book with ID "+ req.params.bookId +" was deleted successfully!"});
    }
    else {
        res.statusCode = 400;
        res.json({status: "refused", message: "A particular BookID is required to delete a specific record"});
    }
});


module.exports = router;
