const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const commonHead = require("../components/commonHead");
const string = require("../components/string_index");
const fstring = require("../components/string_footer");

router.get('/:id', function (req, res, next) {
	res.send(req.params.id)
})

router.get('/image/:id', function (req, res, next) {
	res.send(req.params.id)
})

module.exports = router