const express = require('express');
const router = express.Router();
const auth = require('../lib/auth')
// components
const commonHead = require('../components/commonHead')
const string = require('../components/string_index')
const fstring = require('../components/string_footer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(auth.statusUI(req, res))
  // res.render('index', {commonHead: commonHead, string: string[req.body.locale], fstring: fstring[req.body.locale]})
});

module.exports = router;
