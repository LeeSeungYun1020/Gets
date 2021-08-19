const express = require('express')
const router = express.Router()
const path = require('path')
const connection = require('../lib/mysql')
const fs = require('fs')
const spawn = require('child_process').spawn


module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		console.log(req.user)
		res.send('data')
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
		connection.query(`select id, gender, fit, age, weather, style from coordination where (gender&?)=?`,[gender, gender],
			(err,result)=>{
				if(result.length === 0)
					res.send({})
				else if (err)
					res.send({result: false})
				else
					res.send(result)
			})
	})
	
	return router
}