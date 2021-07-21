const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
//components
const commonHead = require('../components/commonHead')
const string = require('../components/string_index')
const fstring = require('../components/string_footer')
const coordination = require('../lib/coordination')

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
					newList[i] = list[Math.floor(Math.random() * list.length)]
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
	
	router.get("/choose/style", (req, res) => {
		var list = []
		var casual = [], minimal = [], campus = [], street = [], rockchic = [],
			amekaji = [], cityboy = [], office = [], sexyglam = [], feminine = [], lovely = []
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
						switch (2 ** digit) {
							case 1:
								minimal.push(result[i].id);
								break
							case 2:
								casual.push(result[i].id);
								break
							case 4:
								campus.push(result[i].id);
								break
							case 8:
								street.push(result[i].id);
								break
							case 16:
								rockchic.push(result[i].id);
								break
							case 32:
								amekaji.push(result[i].id);
								break
							case 64:
								cityboy.push(result[i].id);
								break
							case 128:
								office.push(result[i].id);
								break
							case 256:
								sexyglam.push(result[i].id);
								break
							case 512:
								feminine.push(result[i].id);
								break
							default:
								lovely.push(result[i].id);
						}
					}
					digit--
				}
			}
			for (var i = 0; i < 11; i++) {
				switch (i) {
					case 0:
						list[i] = minimal[Math.floor(Math.random() * minimal.length)];
						break
					case 1:
						list[i] = casual[Math.floor(Math.random() * casual.length)];
						break
					case 2:
						list[i] = campus[Math.floor(Math.random() * campus.length)];
						break
					case 3:
						list[i] = street[Math.floor(Math.random() * street.length)];
						break
					case 4:
						list[i] = rockchic[Math.floor(Math.random() * rockchic.length)];
						break
					case 5:
						list[i] = amekaji[Math.floor(Math.random() * amekaji.length)];
						break
					case 6:
						list[i] = cityboy[Math.floor(Math.random() * cityboy.length)];
						break
					case 7:
						list[i] = office[Math.floor(Math.random() * office.length)];
						break
					case 8:
						list[i] = sexyglam[Math.floor(Math.random() * sexyglam.length)];
						break
					case 9:
						list[i] = feminine[Math.floor(Math.random() * feminine.length)];
						break
					case 10:
						list[i] = lovely[Math.floor(Math.random() * lovely.length)];
						break
				}
			}
			res.send(list)
		})
	})
	
	router.get("/toptrends/:number", (req, res) => {
		const style = parseInt(req.params.number)
		connection.query(`select id
                          from product
                          order by favorite desc
                          limit ${style}`, (err, result) => {
			if (err || result.length === 0)
				res.send({result: false})
			else {
				res.send(result)
			}
		})
	})
	return router
}