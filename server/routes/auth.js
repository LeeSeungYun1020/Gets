/*
* Auth
* 대외용 sign 로직
* */
const express = require('express')
const connection = require("../lib/mysql");
const router = express.Router()
const bcrypt = require('bcrypt');

module.exports = function (passport) {
	router.post('/signin',
		passport.authenticate('local', {
			session: true,
			failureRedirect: '/api/signin/fail'
		}),
		(req, res) => {
			res.send({user: req.user, result: true})
		})
	
	router.get("/signin/fail", (req, res) => {
		res.send({result: false})
	})
	
	router.get('/signout', function (req, res, next) {
		req.logout()
		req.session.save(function () {
			res.send({"result": true})
		});
	});
	
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
		// 비밀번호 암호화 로직 원격 인공지능 사용자 연결 위해 일시해제
		// bcrypt.hash(pw, 11, function(err, hash) {
		// 	connection.query("INSERT INTO `user` (email, pw, name, phone, birthday) VALUES (?, ?, ?, ?, ?)",
		// 		[email, hash, name, phone, `${year}-${month}-${day}`],
		// 		(err, result) => {
		// 			if (err)
		// 				res.send({result: false, isDuplicate: err.errno === 1062})
		// 			else
		// 				res.send({result: true})
		// 		})
		// })
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
	router.post("/signup/address", (req, res) => {
		if (req.user) {
			const address = req.body.address
			const addressDetail = req.body.addressDetail
			connection.query("update `user` set `address`=?, `addressDetail`=? where `email`=?",
				[address, addressDetail, req.user.email],
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
	
	router.post("/signup/password", (req, res) => {
		if (req.user) {
			const password = req.body.password ?? req.body.pw
			connection.query("update `user` set `pw`=? where `email`=?",
				[password, req.user.email],
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
	
	router.get("/user", (req, res) => {
		if (req.user) {
			let user = req.user
			delete (user["pw"])
			user["result"] = true
			res.send(user)
		} else res.send({"result": false})
	})
	
	return router
}
