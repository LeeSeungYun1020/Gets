/*
* Account
* 서버 내부망용 로그인 테스트 로직
* */
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
	
	return router
}