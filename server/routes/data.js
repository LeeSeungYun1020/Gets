const express = require('express')
const router = express.Router()
const path = require('path')
const connection = require('../lib/mysql')
const fs = require('fs')
const spawn = require('child_process').spawn


module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		console.log(req.user)
	});
	
	// 체형 정보로 어울리는 핏 예측
	router.get('/fit', (req, res) => {
		const gender = req.query.gender;
		const shoulder = req.query.shoulder;
		const waist = req.query.waist;
		const hip = req.query.hip;
		const thigh = req.query.thigh;
		
		let scriptPath = '../data/BodyShapeToFit/'
		const process = spawn('python', [scriptPath + 'main.py', gender, shoulder, waist, hip, thigh])
		
		process.stdout.on('data', function(data){
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
		process.stderr.on('data', function(data){
			console.log({'result': false})
			console.log(data.toString())
			res.send({'result':false})
		})
	})
	
	router.get('/stylePreference', (req, res) => {
		// favoriteStyleRanking -> stylePreference
		
		if (req.user) {
			//email, pw 대신 session?으로 바꾸기??
			let email = req.user.email
			let pw = req.user.pw
			
			let scriptPath = '../data/StylePreference/'
			let scriptName = 'main.py'
			
			const process = spawn('python', ['-O', scriptPath + scriptName, email, pw])
			
			process.stdout.on('data', function(data){
				tmp = {'data': data.toString(), 'result': true}
				console.log(tmp)
				res.send(tmp)
			})
			process.stderr.on('data', function(data){
				console.log({'result': false})
				res.send({'result': false})
			})
		} else {
			let scriptPath = '../data/StylePreference/'
			let scriptName = 'main.py'
			
			const process = spawn('python', ['-O', scriptPath + scriptName])
			
			process.stdout.on('data', function(data){
				tmp = {'data': data.toString(), 'result': true}
				console.log(tmp)
				res.send(tmp)
			})
			process.stderr.on('data', function(data){
				console.log({'result': false})
				res.send({'result': false})
			})
		}
	})
	
	router.get('/coordination/filter/gender/:gender', (req,res) => {
		let gender = req.params.gender
		console.log('/data/coordination/filter/gender/' + gender)
		
		if(gender!==1 && gender!==2){ // 남자도 여자도 아니라면
			connection.query(`SELECT id, gender, fit, age, season, style FROM coordination`,
				(err, result) => {
					if(result.length === 0)
						res.send({})
					else if (err)
						res.send({result: false})
					else
						res.send(result)
				})
		}
		else{
			connection.query(`select id, gender, fit, age, season, style from coordination where (gender&?)=?`,[gender, gender],
				(err,result)=>{
					if(result.length === 0)
						res.send({})
					else if (err)
						res.send({result: false})
					else
						res.send(result)
				})
		}
	})
	
	router.get("/coordination/all", (req, res) => {
		connection.query(`SELECT id, gender, fit, age, season, style FROM coordination`,
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					let tmp = {'data': result, 'result': true}
					console.log(tmp)
					res.send(tmp)
				}
			})
	})
	
	router.get('/coordination/recommendation/:number', (req, res) => {
		let number = req.params.number
		console.log(`/coordination/recommendation/${number}`)
		
		let scriptPath = '../data/CoordinationRecommendation/'
		let scriptName = 'main.py'
		let process
		
		if(req.user){
			console.log('signInState = true')
			let email = req.user.email
			let pw = req.user.pw
			
			process = spawn('python', ['-O', scriptPath + scriptName, email, pw, number])
		}else{
			console.log('signInState = false')
			
			let style = req.query.style
			if(isNaN(style)){
				style = (1 << 11) - 1 // 모든 스타일
			}
			
			process = spawn('python', ['-O', scriptPath + scriptName, style, number])
		}
		
		process.stdout.on('data', function(data){
			console.log('process.stdout')
			str = data.toString().trim()
			console.log(str)
			sql(str).then(function(result){
				//console.log(result)
				res.send(result)
			})
		})
		process.stderr.on('data', function(){
			console.log('process.stderr')
			res.send({'result': false})
		})
	})
	
	return router
}

function sql(str){
	console.log('sql()')
	let idList = str.trim().split(',')
	
	let whereCluase = ``
	
	i = 0
	for(id of idList){ // where절 생성
		if(i++ !== 0)
			whereCluase += ` or `
		whereCluase += `id = ${id}`
	}
	
	let query = `SELECT * FROM coordination WHERE ` + whereCluase
	console.log(query)
	
	return new Promise(resolve => {
		connection.query(query,
			(err, result) => {
				if(err || result.length===0)
					result = [{result: false}]
				resolve(result)
			})
	})
}