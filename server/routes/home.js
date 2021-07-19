const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
//components
const commonHead = require('../components/commonHead')
const string = require('../components/string_index')
const fstring = require('../components/string_footer')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("home")
	});
	
	router.get("/custom/:number", (req, res) => {
		const uploadNum = req.params.number
		let length
		var randomNum = []
		var question = `?,`.repeat(uploadNum)
		question = question.slice(0, -1)
		connection.query("select count(*) as `len` from coordination", (err, result) => {
			if (err || result.length === 0)
				res.send({result: false})
			else {
				length = parseInt(`${result[0].len}`, length)
				// console.log(length)
				
				for (var i = 0; i < uploadNum; i++) {
					randomNum[i] = Math.floor(Math.random() * length) + 1
				}
				
				connection.query(`select *
                                  from coordination
                                  where id in (${question})`,
					randomNum,
					(err, result) => {
						if (err || result.length === 0)
							res.send({result: false})
						else {
							console.log(result)
							res.send(result)
						}
					})
			}
		})
	})
	
	return router
}