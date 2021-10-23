/*
* Article
* 스타일 내용을 소개하는 기사 관련 API
* */

const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const commonHead = require("../components/commonHead");
const string = require("../components/string_index");
const fstring = require("../components/string_footer");
const path = require("path");
const fs = require("fs");

// id로 기사 조회
router.get('/:id', function (req, res, next) {
	connection.query("select * from article where `id`= ?",
		[req.params.id], (err, result) => {
			if (err || result.length === 0)
				res.send({result: false, error: err})
			else {
				result[0]["result"] = true
				res.send(result[0])
			}
		})
})

// 기사별 기사에 포함된 이미지id 조회
router.post('/image/:id', function (req, res, next) {
	connection.query("select * from articleImage where `articleID`= ?",
		[req.params.id], (err, result) => {
			if (err || result.length === 0)
				res.send([{result: false, error: err}])
			else {
				result[0]["result"] = true
				result.forEach(it => it["articleID"] = undefined)
				res.send(result)
			}
		})
})

// 이미지 id로 이미지 불러오기
router.get("/image/:imageID", (req, res) => {
	const imageID = req.params.imageID
	const filePath = path.join(__dirname, '../article/image')
	const options = {
		root: filePath,
	}
	fs.promises.access(`${filePath}/${imageID}.png`, fs.constants.F_OK)
	.then(() => res.sendFile(`${imageID}.png`, options))
	.catch(() => res.sendFile(`${imageID}.jpg`, options, err => {
		res.sendFile(`error.png`, options)
	}))
})

module.exports = router