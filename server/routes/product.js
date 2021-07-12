const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

router.get('/', function (req, res, next) {
	res.send("product")
});

router.get('/detail/:productID', function (req, res, next) {
	res.send("product" + req.params.productID)
});

router.get('/res/coordi', function (req, res) {
	connection.query("select * from `product` where `id` IN (?,?,?,?,?,?,?,?)",
		[undefined, 9, 57, undefined, undefined, 269, undefined, undefined], (err, result) => {
			if (err) {
				throw err
			}
			console.log(result)
			res.send(result)
		})
});

module.exports = router