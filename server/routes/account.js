const express = require('express')
const router = express.Router()
const auth = require('../lib/auth')

router.get('/', function (req, res, next) {
	res.send("account")
});

// 로그인에서 필요한 html-탬플릿
var template_login = {
	HTML: function (title, body, authStatusUI = '<a href=/account/signin') {
		return `
		<!doctype html>
		<html>
		<head>
			<title>WEB1=${title}</title>
			<meta charset=""utf-8>
		</head>
		<body>
			<h1>LOGIN</h1>
			${body}
		</body>
		</html>
		`
	}
}

// 로그인
router.get('/signin', function (req, res, next) {
	var fmsg = req.flash()
	var feedback = ''
	if (fmsg.error) {
		feedback = fmsg.error[0]
	}
	var title = 'WEB-login';
	var body = `
	<div style="color:red;">${feedback}</div>
	<form action="/account/signin_process" method="post">
		<p><input type="text" name="email" placeholder="email"> </p>
		<p><input type="password" name="password" placeholder="password" </p>
		<p>
			<input type="submit" value="로그인">
			<a href="/account/signup">signup</a>
		</p>
	</form>`
	var html = template_login.HTML(title, body);
	res.send(html)
});

// 로그아웃
router.get('/signout', function (req, res, next) {
	req.logout()
	req.session.save(function () {
		res.redirect('/');
	});
});

var template_signup = {
	HTML: function (title, body, authStatusUI = '<a href=/account/signin') {
		return `
		<!doctype html>
		<html>
		<head>
			<title>WEB1=${title}</title>
			<meta charset=""utf-8>
		</head>
		<body>
			<h1>REGISTER</h1>
			${body}
		</body>
		</html>
		`
	}
}

// 회원 가입
router.get('/signup', function (req, res, next) {
	if (auth.isOwner(req, res)) {
		res.redirect('/')
		return false
	}
	var title = 'WEB-signup'
	var body = `
	<form action="/account/signup_process" method="post">
		<p>이메일 <span style="color:#ff6b6b"><strong>*</strong></span> <input type="text" name="email" placeholder="이메일 입력" required>
				<input type="button" name="email_check" value="아이디 확인" required>
		</p>
		<p>비밀번호 <span style="color:#ff6b6b"><strong>*</strong></span> <input type="password" name="pw" placeholder="비밀번호 입력" required></p>
		<p>비밀번호 재확인 <span style="color:#ff6b6b"><strong>*</strong></span> <input type="password" name="pw_check" required> </p>
		<p>이름 <span style="color:#ff6b6b"><strong>*</strong></span> <input type="text" name="name" placeholder="이름 입력" required> </p>
		<p>회원정보 <span style="color:#ff6b6b"><strong>*</strong></span>
			<select id="member" required>
				<option>종류</option>
				<option value="1">고객</option>
				<option value="2">에디터</option>
				<option value="3">매니저</option>
			</select>
		</p>
		<p>전화번호<input type="tel" name="tel" placeholder="전화번호 입력"> </p>
		<div>
          <p>생년월일
            <span class="box">
                <input type="text" id="yy" class="int" maxlength="4" placeholder="년(4자)">
                <select id="mm">
                    <option>월</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <input type="text" id="dd" class="int" maxlength="2" placeholder="일">
            </span>
          </p>
        </div>
        <input type="text" id="sample4_postcode" placeholder="우편번호">
		<input type="button" onclick="sample4_execDaumPostcode()" value="우편번호 찾기"><br>
		<input type="text" id="sample4_roadAddress" placeholder="도로명주소" size="60" ><br>
		<input type="hidden" id="sample4_jibunAddress" placeholder="지번주소"  size="60">
		<span id="guide" style="color:#999;display:none"></span>
		<input type="text" id="sample4_detailAddress" placeholder="상세주소"  size="60"><br>
		<input type="hidden" id="sample4_extraAddress" placeholder="참고항목"  size="60">
		<input type="hidden" id="sample4_engAddress" placeholder="영문주소"  size="60" ><br>
		<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
        <p>성별
			<select id="gender">
				<option>성별</option>
				<option value="1">남자</option>
				<option value="2">여자</option>
			</select>
		</p>
		<p> <input type="submit" value="가입하기"</p>
	</form>`
	var html = template_signup.HTML(title, body);
	res.send(html)
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