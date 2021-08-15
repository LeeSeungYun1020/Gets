const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const commonHead = require("../components/commonHead");
const string = require("../components/string_index");
const fstring = require("../components/string_footer");
const path = require("path");
const fs = require("fs");

router.get('/:id', function (req, res, next) {
	connection.query("select * from article where `id`= ?",
		[req.params.id], (err, result) => {
			if (err || result.length === 0)
				res.send({result: false, error: err})
			else {
				result[0]["result"] = true
				res.send(result[0])
			}
		})
})

router.post('/image/:id', function (req, res, next) {
	connection.query("select * from articleImage where `articleID`= ?",
		[req.params.id], (err, result) => {
			if (err || result.length === 0)
				res.send([{result: false, error: err}])
			else {
				result[0]["result"] = true
				result.forEach(it => it["articleID"] = undefined)
				res.send(result)
			}
		})
})

router.get("/image/:imageID", (req, res) => {
	const imageID = req.params.imageID
	const filePath = path.join(__dirname, '../article/image')
	const options = {
		root: filePath,
	}
	fs.promises.access(`${filePath}/${imageID}.png`, fs.constants.F_OK)
	.then(() => res.sendFile(`${imageID}.png`, options))
	.catch(() => res.sendFile(`${imageID}.jpg`, options, err => {
		res.sendFile(`error.png`, options)
	}))
})

module.exports = router