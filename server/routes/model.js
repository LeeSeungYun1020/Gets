const express = require('express')
const router = express.Router()
const path = require('path')
const spawn = require("child_process").spawn

router.get('/', function (req, res, next) {
	res.send("model")
});

// 체형 정보로 핏 예측
// TODO: post로 바꾸기
router.get('/fit/:gender', (req, res) => {
	const gender = req.params.gender;
	const shoulder = req.query.shoulder;
	const waist = req.query.waist;
	const hip = req.query.hip;
	const thigh = req.query.thigh;
	
	var scriptPath = '../data/BodyShapeToFit/'
	const result = spawn('python3', [scriptPath + 'main.py', gender, shoulder, waist, hip, thigh])
	
	let fit = ''
	
	result.stdout.on('data', function(data){
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
	result.stderr.on('data', function(data){
		console.log(data.toString())
		res.send(data.toString())
	})
})

module.exports = router