const express = require('express')
const router = express.Router()
const path = require('path');
const connection = require('../lib/mysql')
const fs = require('fs')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("product")
	});
	
	router.get('/detail/:productID', function (req, res, next) {
		res.send("product" + req.params.productID)
	});
	
	router.get('/res/coordi',  (req, res)=> {
		connection.query("select * from `product` where `id` IN (?,?,?,?,?,?,?,?)",
			[undefined, 9, 57, undefined, undefined, 269, undefined, undefined], (err, result) => {
				if (err) {
					throw err
				}
				console.log(result)
				res.send(result)
			})
	});
	
//찜하기, 찜삭제하기
	router.post('/favorite/:product',(req,res)=>{
		var user=req.body.email
		var product=req.params.product
		connection.query(`insert into favorite(userEmail, productID) values(?,?)`,[user,product],
			(err,result)=>{
				if (err)
					res.send({result: false})
				else{
					console.log(result)
					res.send({result: true})
				}
		})
	})
	
	router.post('/unfavorite/:product',(req,res)=>{
		var user=req.body.email
		var product=req.params.product
		connection.query(`delete from favorite where userEmail=? and productID=?`,[user,product],
			(err,result)=>{
				if (err)
					res.send({result: false})
				else{
					res.send({result: true})
				}
			})
	})
	
	/* 아래는 api에서 이동된 것 */
	
	// 단일 상품 이미지 전송
	router.get("/image/:imageID", (req, res) => {
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
	router.post("/list/:page", (req, res) => {
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
	router.post("/list", (req, res) => {
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
	router.get("/:id", (req, res) => {
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
	return router
}