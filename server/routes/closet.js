const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("closet")
	});
	
	router.get('/product', (req, res) => {
		if (req.user) {
			connection.query('select * from product where id in \
				(select productID from favoriteProduct where `userEmail`=?)', [req.user.email],
				(err, result) => {
					if (err || result.length === 0)
						res.send([{result: false, error: err}])
					else {
						result[0]["result"] = true
						res.send(result)
					}
				})
		} else res.send({"result": false})
	})
	
	router.get('/coordination', (req, res) => {
		if (req.user) {
			connection.query('select * from coordination where id in \
				(select coordinationID from favoriteCoordination where `userEmail`=?)', [req.user.email],
				(err, result) => {
					if (err || result.length === 0)
						res.send([{result: false, error: err}])
					else {
						result[0]["result"] = true
						res.send(result)
					}
				})
		} else res.send({"result": false})
	})
	
	return router
}