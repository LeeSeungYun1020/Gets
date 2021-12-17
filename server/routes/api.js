/*
* API
* 각 API별 사용방법, 설명 표시
* 하위 버전 호환용 api 제공
* */
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
	// API Center - API 설명 페이지 렌더링
	router.get('/', function (req, res, next) {
		const loc = req.body.locale
		res.render("api", {commonHead: commonHead, locale: loc, string: string[loc], fstring: fstring[loc]})
	});
	
	// 로그인
	router.post('/signin',
		passport.authenticate('local', {
			session: true,
			failureRedirect: '/api/signin/fail'
		}),
		(req, res) => {
			res.send({user: req.user, result: true})
		})
	
	// 로그인 실패
	router.get("/signin/fail", (req, res) => {
		res.send({result: false})
	})
	
	// 로그아웃
	router.get('/signout', function (req, res, next) {
		req.logout()
		req.session.save(function () {
			res.send({"result": true})
		});
	});
	
	// 사용자 조회
	router.get("/sign/user", (req, res) => {
		if (req.user) {
			let user = req.user
			user["pw"] = null
			user["result"] = true
			res.send(user)
		} else res.send({"result": false})
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
		
		connection.query("INSERT INTO `user` (email, pw, name, phone, birthday) VALUES (?, ?, ?, ?, ?)",
			[email, pw, name, phone, `${year}-${month}-${day}`],
			(err, result) => {
				if (err)
					res.send({result: false, isDuplicate: err.errno === 1062})
				else
					res.send({result: true})
			})
	})

	// 회원가입 - 추가 정보 입력
	router.post("/signup/info", (req, res) => {
		if (req.user) {
			const email = req.user.email
			const gender = req.body.gender
			const height = req.body.height
			const weight = req.body.weight
			const topSize = req.body.topSize ?? req.body.top_size
			const bottomSize = req.body.bottomSize ?? req.body.bottom_size
			const shoulder = req.body.shoulder
			const waist = req.body.waist
			const hip = req.body.hip
			const thigh = req.body.thigh
			const style = req.body.style
			connection.query("update `user` set `gender`=?, `height`=?, `weight`=?, `topSize`=?, `bottomSize`=?, `style`=?, `shoulder`=?,`waist`=?, `hip`=?, `thigh`=? where `email`=?",
				[gender, height, weight, topSize, bottomSize, style, shoulder, waist, hip, thigh, email],
				(err, result) => {
					if (err)
						res.send({result: false})
					else
						res.send({result: true})
				})
		} else {
			res.send({result: true, error: "signin"})
		}
		
	})

	// 날씨 정보 조회
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
		let body = req.body[0] ?? req.body
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
		let body = req.body[0] ?? req.body
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
	router.get("/product/:id", (req, res) => {
		const id = req.params.id
		connection.query(`select *
                          from product
                          where product.id = ?;`,
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
	
	// 기사 목록 조회 - 기사가 스타일별 설명 형태로 변경됨에 따라 api 교체가 권장됨
	router.get("/article/list", (req, res) => {
		connection.query("select * from `article`",
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else {
					result[0]["result"] = true
					res.send(result)
				}
			})
	})
	
	// 기사 단일 항목 조회
	router.post("/article/:id", (req, res) => {
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
	
	return router
}