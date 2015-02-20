var express = require('express');
var Visitor = require('../models/visitor');
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/visitor')

    // create a bear (accessed at POST http://localhost:8080/api/visitor)
    .post(function(req, res) {

        var visitor = new Visitor();
        visitor.name = req.body.name;
        visitor.userID = req.body.userID;

        visitor.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Visitor created!' });
        });
    })

    // get all the visitor (accessed at GET http://localhost:8080/api/visitor)
    .get(function(req, res) {
        Visitor.find(function(err, visitor) {
            if (err) {
                res.send(err);
            }

            res.json(visitor);
        });
    });

router.route('/visitor/:id').get(function(req, res) {
    var id = req.params.id;

    Visitor.findOne({ userID: id }, function (err, doc) {
        if (err) {
            res.send(err);
        }
        res.json(doc);
    });
});

module.exports = router;
