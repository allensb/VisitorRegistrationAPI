var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res) {
    res.status(200).json(
        { title: 'Steve Smith', id: 1 },
        { title: 'Alice Walker', id: 2 },
        { title: 'Chris Johnson', id: 3 },
        { title: 'Heather Winston', id: 4 },
        { title: 'Tobias Smith', id: 5 },
        { title: 'Sarah Marshall', id: 6 }
    );
});

module.exports = router;
