const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')
const connection = require('../lib/mysql')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		//res.send("account")
		res.send(auth.statusUI(req, res))
	});

// 로그인 - email, pw로 로그인
	router.get('/signin', function (req, res, next) {
		res.render("signin")
	});
	
	router.post('/signin',
		passport.authenticate('local',
			{
				successRedirect: '/account',
				failureRedirect: '/account/signin',
				failureFlash: true
			}),
		(req, res) => {
			req.session.save(() => {
				res.redirect('/')
			})
		})

// 로그아웃
	router.get('/signout', function (req, res, next) {
		req.logout()
		req.session.save(function () {
			res.redirect('/');
		});
	});

// 회원 정보
	router.get('/info', function (req, res, next) {
		if(req.user){
			const user = req.user.email
			connection.query(`select * from user where email=${user}`,(err, result) => {
				res.send(result)
			})
		}else res.send({"result": false})
	});

	//수정
	router.post('/info/update',(req,res)=>{
		if (req.user) {
			const email = req.user.email
			let pw = req.body.pw
			let phone = req.body.phone
			let year = req.body.year
			let month = req.body.month
			let day = req.body.day
			let address = req.body.address
			let addressDetail = req.body.addressDetail
			console.log(email)
			connection.query(`update user set pw=?,phone=?,birthday=?,address=?,addressDetail=? where email=${email}`,
				[pw,phone,`${year}-${month}-${day}`, address, addressDetail],((err, result) => {
					res.send({result: true})
				}))
		} else res.send({"result": false})
	})
	
//스타일
	router.get('/style', function (req, res, next) {
		res.send("style")
	});

// 주문 내역
	router.get('/order', function (req, res, next) {
		res.send("order")
	});

// 문의 사항
	router.get('/feedback', function (req, res, next) {
		res.send("feedback")
	});
	
	return router
}