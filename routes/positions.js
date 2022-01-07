var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Retrieving positions for all users");
});

router.get('/:id', function(req, res, next) {
    res.send("Retrieving positions for user: " + req.params.id);
  });

module.exports = router;
