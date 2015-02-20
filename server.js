// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/visitordb';
mongoose.connect(mongoUri);

var Visitor = require('./models/visitor');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

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

// on routes that end in /bears
// ----------------------------------------------------
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
            if (err)
                res.send(err);

            res.json(visitor);
        });
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on ' + port);