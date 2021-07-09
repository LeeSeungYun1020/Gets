const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
	res.send("account")
});

// 로그인
router.get('/signin', function (req, res, next) {
	res.send("signin")
});

// 로그아웃
router.get('/signout', function (req, res, next) {
	res.send("signout")
});

// 회원 가입
router.get('/signup', function (req, res, next) {
	res.send("signup")
});

// 회원 정보
router.get('/info', function (req, res, next) {
	res.send("info")
});

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

module.exports = router