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
		if(req.user!=null){
			connection.query(`select * from user where email=?`,[req.user.email],(err, result) => {
				console.log(err)
				res.send(result)
			})
		}else
			res.send([{result: false}])
	});

	//수정
	router.post('/info',(req,res)=>{
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
			connection.query(`update user set pw=?,phone=?,birthday=?,address=?,addressDetail=? where email=?`,
				[pw,phone,`${year}-${month}-${day}`, address, addressDetail,email],(err, result) => {
					res.send({result: true})
				})
		} else res.send([{result: false}])
	})
	
//스타일
	router.get('/style', function (req, res, next) {
		if(req.user){
			let userStyle={
				casual : 0, minimal : 0, campus : 0, street : 0, rockchic : 0,
				amekaji : 0, cityboy : 0, office : 0, sexyglam : 0, feminine : 0, lovely : 0
			}
			connection.query(`select style from product where id in (select productID from favoriteProduct where userEmail=?)`,[req.user.email],
				(err,result)=>{
				if(err)
					res.send([{result: false}])
				else{
					let temp,digit
					for(let i=0;i<result.length;i++){
						temp = result[i].style.toString(2)
						digit = temp.length - 1
						for (var j = 0; j < temp.length; j++) {
							if (temp[j] == '1') {
								switch (2**digit) {
									case 1: userStyle.minimal++; break
									case 2: userStyle.casual++; break
									case 4: userStyle.campus++; break
									case 8: userStyle.street++; break
									case 16: userStyle.rockchic++; break
									case 32: userStyle.amekaji++; break
									case 64: userStyle.cityboy++; break
									case 128: userStyle.office++; break
									case 256: userStyle.sexyglam++; break
									case 512: userStyle.feminine++; break
									default: userStyle.lovely++;
								}
							}
							digit--
						}
					}
					console.log(userStyle)
					res.send(userStyle)
				}
			})
		}else res.send({result: false})
	});
	
	return router
}