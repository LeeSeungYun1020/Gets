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
	
	router.get("/style/6/:styleID", (req, res) => {
		const style = parseInt(req.params.styleID)
		var list = []
		connection.query(`select id, style
                          from coordination`, (err, result) => {
			if (err || result.length === 0)
				res.send({result: false})
			var temp, digit
			for (var i = 0; i < result.length; i++) {
				temp = result[i].style.toString(2)
				digit = temp.length - 1
				for (var j = 0; j < temp.length; j++) {
					if (temp[j] == '1') {
						// console.log(2**digit)
						if (2 ** digit === style) {
							list.push(result[i].id)
							break
						}
					}
					digit--
				}
			}
			var newList = []
			if (list.length < 6) {
				console.log(list.length)
				res.send(`${list.length}로 자료부족`)
			} else {
				for (var i = 0; i < 6; i++) {
					newList[i] = list[Math.floor(Math.random() * list.length) + 1]
					for (var j = 0; j < i; j++) {       //중복방지
						if (newList[i] === newList[j]) {
							i--
							break
						}
					}
				}
				res.send(newList)
			}
		})
	})
	//select id from coordination order by rand() limit 6
	
	router.get("/toptrends/6", (req, res) => {
		connection.query(`select id
                          from product
                          order by favorite desc
                          limit 6`, (err, result) => {
			if (err || result.length === 0)
				res.send({result: false})
			else {
				res.send(result)
			}
		})
	})
	return router
}