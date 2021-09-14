var express = require('express');
var router = express.Router();
var db = require('./entries');

/* GET home page. */
router.get('/', function(req, res, next) {
    entries = db.getAllEntries();
    res.json(entries);
});

router.post('/', function(req, res, next){
    try
    {
        data = {}
        var id = db.getLastID() + 1;
        var title = req.body.title;
        var author = req.body.author;
        var link = req.body.link;
        var language = req.body.language;
        var origin = req.body.origin;
        var year = req.body.year;
        var pages = req.body.pages;
    
        data ={
          "id": id,
          "title": title,
          "author": author,
          "link": link,
          "origin": origin,
          "language": language,
          "year": year,
          "pages": pages
        }
        db.insertEntry(data)
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json({status: "success"})
    }
    catch (err){
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.json({status: "failed", message: err.message})
    }
})

module.exports = router;
