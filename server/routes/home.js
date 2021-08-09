const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("home")
	});
	
	// 맞춤 추천
	router.get("/custom/:number", (req, res) => {
		connection.query(`SELECT *
                          FROM coordination
                          ORDER BY RAND()
                          LIMIT ${req.params.number}`, (err, result) => {
			if (err || result.length === 0)
				res.send([{result: false}])
			else {
				result[0]["result"] = true
				res.send(result)
			}
			
		})
	})
	
	// 스타일(최신순)
	router.get("/style/:styleID/:number", (req, res) => {
		connection.query(`SELECT *
                          FROM coordination
                          WHERE (style & ?) != 0
                          ORDER BY id desc
                          LIMIT ${req.params.number}`,
			[req.params.styleID],
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else {
					result[0]["result"] = true
					res.send(result)
				}
			})
	})
	
	//각 스타일에 맞는 코디를 대표 1개씩 표시
	router.get("/representative/style", (req, res) => {
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
						switch (2**digit) {
							case 1: minimal.push(result[i].id); break
							case 2: casual.push(result[i].id); break
							case 4: campus.push(result[i].id); break
							case 8: street.push(result[i].id); break
							case 16: rockchic.push(result[i].id); break
							case 32: amekaji.push(result[i].id); break
							case 64: cityboy.push(result[i].id); break
							case 128: office.push(result[i].id); break
							case 256: sexyglam.push(result[i].id); break
							case 512: feminine.push(result[i].id); break
							default: lovely.push(result[i].id);
						}
					}
					digit--
				}
			}
			for(var i=0;i<11;i++){
				switch (i){
					case 0: list[i]=minimal[Math.floor(Math.random() * minimal.length)]; break
					case 1: list[i]=casual[Math.floor(Math.random() * casual.length)]; break
					case 2: list[i]=campus[Math.floor(Math.random() * campus.length)]; break
					case 3: list[i]=street[Math.floor(Math.random() * street.length)]; break
					case 4: list[i]=rockchic[Math.floor(Math.random() * rockchic.length)]; break
					case 5: list[i]=amekaji[Math.floor(Math.random() * amekaji.length)]; break
					case 6: list[i]=cityboy[Math.floor(Math.random() * cityboy.length)]; break
					case 7: list[i]=office[Math.floor(Math.random() * office.length)]; break
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
	
	//홈화면_탑트렌드에 있는 제품을 number 수만큼표시
	router.get("/toptrends/:number", (req, res) => {
		connection.query(`select productID,count(productID) as cnt from favoriteProduct
							group by productID order by cnt desc limit ${req.params.number}`,(err,result)=>{
			if(err)
				res.send({result: false})
			else{
				let obj=[]
				for(let i=0;i<result.length;i++){
					obj.push(result[i].productID)
				}
				console.log(obj)
				connection.query(`select * from product where id in (${obj}) order by field(id,${obj})`,(err,result)=>{
					if (err || result.length === 0)
						res.send([{result: false}])
					else {
						result[0]["result"] = true
						res.send(result)
					}
				})
			}
		})
	})
	return router
}