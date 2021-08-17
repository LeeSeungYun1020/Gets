const express = require('express')
const router = express.Router()
const path = require('path')
const connection = require('../lib/mysql')
const fs = require('fs')
const exec = require('child_process').exec
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
			console.log(data.toString())
			res.send(data.toString())
		})
	})
	
	router.get('/favoriteStyleRanking', (req, res) => {
		if (req.user) {
			let email = req.user.email
			let pw = req.user.pw
			//session?으로 바꾸기??
			
			let exePath = '../data/getFavoriteStyleRanking/'
			let myPath = path.resolve(exePath) + '\\'
			let fileName = 'getFavoriteStyleRanking.exe'
			//let debugFileName = 'getFavoriteStyleRanking_debug.exe'
			
			const process = exec(myPath + fileName + ' ' + email + ' ' + pw)
			
			console.log(myPath + fileName + ' ' + email + ' ' + pw)
			
			process.stdout.on('data', function(data){
				console.log('==============================\n')
				console.log(data)
				console.log('==============================')
				
				res.send(data.toString())
			})
			process.stderr.on('data', function(data){
				console.log(data.toString())
				res.send(data.toString())
			})
		} else res.send({"result": false})
		
	})
	
	
	router.get('/coordination/filter/gender/:gender', (req,res) => {
		let gender = req.params.gender
		
		console.log('/data/coordination/filter/gender/' + gender)
		
		if(req.user){
			connection.query(`select id, gender, style, fit, weather from coordination where (gender&?)=?`,[gender, gender],
				(err,result)=>{
					if (err || result.length === 0)
						res.send({result: false})
					else
						res.send(result)
				})
		}else res.send({result:false})
	})
	
	return router
}