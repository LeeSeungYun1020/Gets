const express = require('express')
const router = express.Router()
const path = require('path');
const got = require('got')
const connection = require('../lib/mysql')
const weather = require('../lib/weather')
const fs = require('fs')
// API Center
router.get('/', function (req, res, next) {
	res.render("api")
});

// 로그인
router.post("/signin", (req, res) => {
	const email = req.body.email
	const pw = req.body.pw
	connection.query("select `email`, `pw` from `user` where `email`=?", [email], (err, result) => {
		if (err || result.length === 0) // 이메일 없음
			res.send({result: false})
		else if (result[0].pw === pw) // 비밀번호 일치
			res.send({result: true})
		else // 비밀번호 불일치
			res.send({result: false})
	})
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

module.exports = router