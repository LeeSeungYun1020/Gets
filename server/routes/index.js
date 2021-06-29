const express = require('express');
const router = express.Router();

// components
const commonHead = require('../components/commonHead')
const string = require('../components/string_index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {commonHead: commonHead, string: string, locale: req.body.locale})
});

module.exports = router;
