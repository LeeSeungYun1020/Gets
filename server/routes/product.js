const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
	res.send("product")
});

router.get('/detail/:productID', function (req, res, next) {
	res.send("product" + req.params.productID)
});

module.exports = router