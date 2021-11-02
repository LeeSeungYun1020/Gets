const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const spawn = require('child_process').spawn


module.exports = function (passport) {
	// 연결 확인
	router.get('/', function (req, res) {
		res.send('data')
	});
	
	// 체형 정보로 어울리는 핏 예측
	router.get('/fit', (req, res) => {
		let gender = req.query.gender;
		let shoulder = req.query.shoulder;
		let waist = req.query.waist;
		let hip = req.query.hip;
		let thigh = req.query.thigh;
		
		let scriptPath = '../data/BodyShapeToFit/'
		const process = spawn('python3', [scriptPath + 'main.py', gender, shoulder, waist, hip, thigh])
		
		process.stdout.on('data', function (data) {
			console.log('==============================')
			console.log('gender: ' + gender)
			console.log('shoulder: ' + shoulder)
			console.log('waist: ' + waist)
			console.log('hip: ' + hip)
			console.log('thigh: ' + thigh)
			
			console.log('=> fit: ' + data)
			console.log('==============================')
			
			res.send(data.toString())
		})
		process.stderr.on('data', function (data) {
			console.log({'result': false})
			console.log(data.toString())
			res.send({'result': false})
		})
	})
	
	// 찜 제품 목록과 찜 코디 목록으로 선호 스타일 분석
	router.get('/stylePreference', (req, res) => {
		let scriptPath = '../data/StylePreference/'
		let scriptName = 'main.py'
		let process
		
		if (req.user) {
			let email = req.user.email
			let pw = req.user.pw
			
			process = spawn('python3', ['-O', scriptPath + scriptName, email, pw])
		} else {
			process = spawn('python3', ['-O', scriptPath + scriptName])
		}
		// 성공할 경우
		process.stdout.on('data', function (data) {
			let json = JSON.parse(data)
			json['result'] = true
			console.log(json)
			res.send(json)
		})
		// 실패할 경우
		process.stderr.on('data', function () {
			console.log({'result': false})
			res.send({'result': false})
		})
	})
	
	// 성별에 따른 필터 적용
	router.get('/coordination/filter/gender/:gender', (req, res) => {
		let gender = req.params.gender
		console.log('/data/coordination/filter/gender/' + gender)
		
		let query = `SELECT id, gender, fit, age, season, style
                     FROM coordination`
		
		if (gender * 1 === 1 || gender * 1 === 2) {
			let whereClause = ` WHERE (gender & ${gender} = ${gender})`
			query += whereClause
		}
		
		console.log(query)
		connection.query(query,
			(err, result) => {
				if (err || result.length === 0) {
					result = [{result: false}]
				} else {
					result[0]['result'] = true
				}
				res.send(result)
			})
	})
	
	router.get("/coordination/all", (req, res) => {
		connection.query(`SELECT id, gender, fit, age, season, style
                          FROM coordination`,
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else {
					result[0]['result'] = true
					console.log(result)
					res.send(result)
				}
			})
	})
	
	return router
}