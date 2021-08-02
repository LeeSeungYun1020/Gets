const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("closet")
	});
	
	return router
}