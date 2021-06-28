const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
	res.send("cart")
});

router.get('/payment', function (req, res, next) {
	res.send("cart payment")
});


module.exports = router