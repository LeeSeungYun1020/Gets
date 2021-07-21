const express = require('express')
const router = express.Router()
const path = require('path');
const got = require('got')
const connection = require('../lib/mysql')
const weather = require('../lib/weather')
const fs = require('fs')
// components
const commonHead = require('../components/commonHead')
const string = require('../components/string_api')
const fstring = require('../components/string_footer')

module.exports = function (passport) {
// API Center
	router.get('/', function (req, res, next) {
		res.render("api", {commonHead: commonHead, string: string[req.body.locale], fstring: fstring[req.body.locale]})
	});
	
	router.post('/signin',
		passport.authenticate('local',
			{
				successRedirect: '/api/signin/success',
				failureRedirect: '/api/signin/fail'
			}),
		(req, res) => {
			console.log(req.user)
		})
	
	router.get("/signin/success", (req, res) => {
		if (req.user)
			res.send({user: req.user, result: true})
		else
			res.send({result: false})
	})
	
	router.get("/signin/fail", (req, res) => {
		res.send({result: false})
	})

// 회원가입 - 이메일 중복 확인
	router.post("/signup/check", (req, res) => {
		const email = req.body.email
		connection.query("select `email` from `user` where `email`=?", [email], (err, result) => {
			if (err || result.length === 0) // 이메일 없음 다음 절차 진행
				res.send({result: true})
			else
				res.send({result: false}) // 이메일 있음 다른 이메일로 재확인
		})
	})

// 회원가입 - 기본 정보 입력
	router.post("/signup/basic", (req, res) => {
		const email = req.body.email
		const pw = req.body.pw
		const name = req.body.name
		const phone = req.body.phone
		const year = req.body.year
		const month = req.body.month
		const day = req.body.day
		const address = req.body.address
		const addressDetail = req.body.addressDetail
		
		connection.query("INSERT INTO `user` (email, pw, name, phone, birthday, address, addressDetail) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[email, pw, name, phone, `${year}-${month}-${day}`, address, addressDetail],
			(err, result) => {
				if (err)
					res.send({result: false, isDuplicate: err.errno === 1062})
				else
					res.send({result: true})
			})
	})

// 회원가입 - 추가 정보 입력
	router.post("/signup/info", (req, res) => {
		const email = req.body.email
		const gender = req.body.gender
		const height = req.body.height
		const weight = req.body.weight
		const topSize = req.body.top_size
		const bottomSize = req.body.bottom_size
		const style = req.body.style
		const fit = req.body.fit
		
		connection.query("update `user` set `gender`=?, `height`=?, `weight`=?, `topSize`=?, `bottomSize`=?, `style`=?, `fit`=? where `email`=?",
			[gender, height, weight, topSize, bottomSize, style, fit, email],
			(err, result) => {
				if (err)
					res.send({result: false})
				else
					res.send({result: true})
			})
	})

// 날씨
	router.post("/weather", (req, res) => {
		const key = 'QlJXfpDq9oWm1PKEG0hZBbX06NXjih1QpY1ZqHXEWqx4aJQ2eqbU1dx4spZGGCR%2FLWwjq9RSXKM0UHFgGjeNTw%3D%3D'
		const today = new Date()
		let hour = today.getHours()
		if (hour < 2)
			today.setDate(today.getDate() - 1)
		const date = weather.getDateString(today)
		const time = weather.getNearestTimeString(hour)
		const pos = weather.conversion(req.body.latitude ?? 35.1304075, req.body.longitude ?? 129.092138)
		const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=${key}&pageNo=1&numOfRows=100&dataType=JSON&base_date=${date}&base_time=${time}&nx=${pos.x}&ny=${pos.y}`;
		
		(async () => {
			try {
				const response = await got(url);
				const json = JSON.parse(response.body)
				if (json.response.header.resultCode !== '00') {
					res.send({error: true})
					return
				}
				const data = weather.getData(json)
				data["error"] = false
				res.send(data)
				//console.log(json.response.body.items.item)
			} catch (error) {
				res.send({error: true})
			}
		})();
	})

// 단일 상품 이미지 전송
	router.get("/product/image/:imageID", (req, res) => {
		const imageID = req.params.imageID
		const filePath = path.join(__dirname, '../product/image')
		const options = {
			root: filePath,
		}
		fs.promises.access(`${filePath}/${imageID}.png`, fs.constants.F_OK)
		.then(() => res.sendFile(`${imageID}.png`, options))
		.catch(() => res.sendFile(`${imageID}.jpg`, options, err => {
			res.sendFile(`error.png`, options)
		}))
	})
	
	function fitCode(code) {
		let fix = code ?? -1
		if (fix === 0)
			fix = -1
		return fix
	}

// 상품 목록 필터
	router.post("/product/list/:page", (req, res) => {
		const ALL = -1
		let body = req.body[0]
		const search = "%" + (body.search ?? "") + "%"
		const type = fitCode(body.type)
		const detail = fitCode(body.detail)
		const gender = fitCode(body.gender)
		const color = fitCode(body.color)
		const fit = fitCode(body.fit)
		const season = fitCode(body.season)
		const fiber = fitCode(body.fiber)
		const age = fitCode(body.age)
		const style = fitCode(body.style)
		const priceMin = parseInt(body.priceMin ?? 0)
		const priceMax = parseInt(body.priceMax ?? 1000000000)
		const N = 30
		const index = (parseInt(req.params.page, 10) - 1) * N
		connection.query("select * from `product`\
      where `type` = ? and `detail`&? != 0 and `gender`&? != 0 and `color`&? != 0 and \
      `fit`&? != 0 and `season`&? != 0 and `fiber`&? != 0 and `age` &? != 0 and\
      `style`&? != 0 and ? >= `price` and `price` >= ? and\
      (`name` like ? or `brand` like ? or `code` like ?)\
      limit ?, ?",
			[type, detail, gender, color, fit, season, fiber, age, style, priceMax, priceMin, search, search, search, index, index + N],
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else {
					res.send(result)
				}
			})
	})

// 상품 목록 필터 (페이지 구분 X)
	router.post("/product/list", (req, res) => {
		let body = req.body[0]
		const search = "%" + (body.search ?? "") + "%"
		const type = fitCode(body.type)
		const detail = fitCode(body.detail)
		const gender = fitCode(body.gender)
		const color = fitCode(body.color)
		const fit = fitCode(body.fit)
		const season = fitCode(body.season)
		const fiber = fitCode(body.fiber)
		const age = fitCode(body.age)
		const style = fitCode(body.style)
		const priceMin = parseInt(body.priceMin ?? 0)
		const priceMax = parseInt(body.priceMax ?? 1000000000)
		
		console.log("/product/list")
		
		connection.query("select * from `product`\
      where `type` = ? and `detail`&? != 0 and `gender`&? != 0 and `color`&? != 0 and \
      `fit`&? != 0 and `season`&? != 0 and `fiber`&? != 0 and `age` &? != 0 and\
      `style`&? != 0 and ? >= `price` and `price` >= ? and\
      (`name` like ? or `brand` like ? or `code` like ?)",
			[type, detail, gender, color, fit, season, fiber, age, style, priceMax, priceMin, search, search, search],
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else {
					res.send(result)
				}
			})
	})

// 단일 상품 조회
	router.post("/product/:id", (req, res) => {
		const id = req.params.id
		connection.query("select * from `product` where `id`=?",
			[id],
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					result[0].result = true
					res.send(result[0])
				}
			})
	})
	
	router.get("/article/list", (req, res) => {
		connection.query("select `title`,`imageID` from `article` LIMIT 5",
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					let i
					for (i = 0; i < 5; i++) {
						result[i].status = true
					}
					res.send(result)
				}
			})
	})
	
	router.post("/article/:id", (req, res) => {
		const id = req.params.id
		connection.query("select * from `article` where `id`=?",
			[id],
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					result[0].result = true
					res.send(result[0])
				}
			})
	})
	
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
				for (var i = 0; i < uploadNum; i++) {
					randomNum[i] = Math.floor(Math.random() * length) + 1
				}
				
				connection.query(`select * from coordination where id in (${question})`,
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
		connection.query(`select * from coordination`, (err, result) => {
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
	
	router.get("/choose/style",(req,res)=>{
		var list=[]
		var casual=[],minimal=[],campus=[],street=[],rockchic=[],
			amekaji=[],cityboy=[],office=[],sexyglam=[],feminine=[],lovely=[]
		connection.query(`select id,style from coordination`,(err, result) => {
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
					case 8: list[i]=sexyglam[Math.floor(Math.random() * sexyglam.length)]; break
					case 9: list[i]=feminine[Math.floor(Math.random() * feminine.length)]; break
					case 10: list[i]=lovely[Math.floor(Math.random() * lovely.length)]; break
				}
			}
			res.send(list)
		})
	})
	
	router.get("/toptrends/:number", (req, res) => {
		const style = parseInt(req.params.number)
		connection.query(`select id from product order by favorite desc limit ${style}`,
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					res.send(result)
				}
			})
	})
	
// 리뷰 추가
	router.post("/review/add/:productID", (req, res) => {
		const productID = req.params.productID
		const userEmail = req.body.userEmail
		const star = req.body.star
		const contents = req.body.contents
		const image1ID = req.body.image1ID
		const image2ID = req.body.image2ID
		const image3ID = req.body.image3ID
		connection.query("insert into `review` (userEmail, productID, star, contents, image1ID, image2ID, image3ID) \
      VALUES (?, ?, ?, ?, ?, ?, ?)",
			[userEmail, productID, star, contents, image1ID, image2ID, image3ID],
			(err, result) => {
				if (err)
					res.send({result: false})
				else
					res.send({result: true})
			})
	})

// 리뷰 체형 맞춤 리스트 조회
	router.post("/review/fit/:productID", (req, res) => {
		const productID = req.params.productID
		const userEmail = req.body.userEmail
		const order = req.body.order ?? "date"
		const orderOption = (req.body.isReverse ?? false) ? " ASC" : " DESC"
		connection.query("select * from `user` where `email`=?",
			[userEmail],
			(err, result) => {
				if (err || result.length === 0) {
					res.send([{result: false, error: "userEmail"}])
					return
				}
				const height = result[0].height
				const heightMargin = 3
				const weight = result[0].weight
				const weightMargin = 5
				const topSize = result[0].topSize
				const topMargin = 5
				const bottomSize = result[0].bottomSize
				const bottomMargin = 2
				if (height == null) {
					res.send([{result: false, error: "userFitData"}])
					return
				}
				connection.query("select *\
            from review\
            where productID = ? and \
                  userEmail = (select email from user \
                              where ? >= weight and weight >= ? and ? >= height and height >= ? and\
                              ? >= topSIze and topSize >= ? and ? >= bottomSize and bottomSize >= ?) \
            order by " + order + orderOption,
					[productID, weight + weightMargin, weight - weightMargin, height + heightMargin, height - heightMargin,
						topSize + topMargin, topSize - topMargin, bottomSize + bottomMargin, bottomSize - bottomMargin
					],
					(err, result) => {
						if (err)
							res.send([{result: false, error: "reviewData"}])
						else if (result.length === 0)
							res.send([{result: false, error: "notMatch"}])
						else
							res.send(result)
					})
			})
		
	})

// 리뷰 리스트 조회
	router.post("/review/:productID", (req, res) => {
		const productID = req.params.productID
		const order = req.body.order ?? "date"
		const orderOption = (req.body.isReverse ?? false) ? " ASC" : " DESC"
		connection.query("select * from `review` where `productID`=? order by " + order + orderOption,
			[productID],
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else
					res.send(result)
			})
	})
	
	return router
}