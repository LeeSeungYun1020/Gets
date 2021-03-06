/*
* Product
* 상품 목록, 조회, 이미지 조회, 찜
* */

const express = require('express')
const router = express.Router()
const path = require('path');
const connection = require('../lib/mysql')
const fs = require('fs')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("product")
	});
	
	// 상품 찜하기
	router.get('/favorite/:productID', (req, res) => {
		if (req.user) {
			let user = req.user.email
			let product = req.params.productID
			connection.query(`insert into favoriteProduct(userEmail, productID)
                              values (?, ?)`, [user, product],
				(err, result) => {
					if (err)
						res.send({result: false, isDuplicate: err["errno"] === 1062})
					else {
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
	})
	
	// 상품 찜 취소하기
	router.get('/unfavorite/:productID', (req, res) => {
		if (req.user) {
			let user = req.user.email
			let product = req.params.productID
			connection.query(`delete
                              from favoriteProduct
                              where userEmail = ?
                                and productID = ?`, [user, product],
				(err, result) => {
					if (err)
						res.send({result: false})
					else {
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
	})
	
	// 제품에 대한 찜(좋아요)수 계산
	router.get('/count/favorite/:productID', (req, res) => {
		connection.query(`select count(productID) as favorite
                          from favoriteProduct
                          where productID = ${req.params.productID}`,
			(err, result) => {
				if (err)
					res.send({result: false})
				else {
					result[0]["result"] = true
					res.send(result[0])
				}
			})
	})
	
	// 사용자가 특정 상품을 찜했는지 확인 (로그인 필요)
	router.get('/check/favorite/:productID', (req, res) => {
		if (req.user) {
			connection.query(`select *
                              from favoriteProduct
                              where userEmail = ?
                                and productID = ?`,
				[req.user.email, req.params.productID],
				(err, result) => {
					if (err || result.length === 0)
						res.send({result: false})
					else
						res.send({result: true})
				})
		} else res.send({"result": false})
		
	})
	
	// 사용자가 찜한 제품 모아보기
	router.get('/user/favorite', (req, res) => {
		if (req.user) {
			connection.query(`select productID
                              from favoriteProduct
                              where userEmail = ?`, [req.user.email],
				(err, result) => {
					if (err || result.length === 0)
						res.send({result: false})
					else
						res.send(result)
				})
		} else res.send({result: false})
	})
	
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
	
	// 카테고리별 상품 목록 조회
	router.get("/category/:type/:detail", (req, res) => {
		const type = req.params.type
		const detail = req.params.detail ?? -1
		connection.query(`select *
                          from product
                          where type = ?
                            and (detail & ?) != 0`, [type, detail], (err, result) => {
			if (err || result.length === 0)
				res.send([{result: false}])
			else {
				result[0]["result"] = true
				res.send(result)
			}
		})
	})

	// 상품 목록 필터
	router.get("/list/:page", (req, res) => {
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
	
	// 일부 제품 리스트 표시용 - 마지막 상품의 id 조회
	router.get("/number", (req, res) => {
		connection.query(`select id
                          from product
                          order by id desc
                          limit 1`,
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					console.log(result[0])
					res.send(result)
				}
			})
	})

	// 단일 상품 조회
	router.get("/:id", (req, res) => {
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
	
	return router
}