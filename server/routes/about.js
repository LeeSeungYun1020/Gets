const express = require('express')
const router = express.Router()

// components
const commonHead = require('../components/commonHead')
const string = require('../components/string_about')
const fstring = require('../components/string_footer')

router.get('/', function (req, res, next) {
	res.render("about", {commonHead: commonHead, string: string[req.body.locale], fstring: fstring[req.body.locale]})
})

module.exports = router