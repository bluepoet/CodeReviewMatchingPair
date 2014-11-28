var express = require('express');
var router = express.Router();
var repo = require('../repository');

/* GET users listing. */
router.get('/', function(req, res) {
  repo.viewMembers(res);
});

module.exports = router;
