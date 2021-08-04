const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

// components
const commonHead = require('../components/commonHead')
const string = require('../components/string_article')
const fstring = require('../components/string_footer')
const quill = require('../components/quill')

router.get('/', function (req, res, next) {
	res.render("articleList", {
		commonHead: commonHead,
		string: string[req.body.locale],
		fstring: fstring[req.body.locale]
	})
})

router.post('/', function (req, res, next) {
	connection.query("select `id`, `title` from `article` limit 30", (err, result) => {
		if (err) // 등록된 기사가 없음
			res.send([{id: 0, title: 'NULL'}])
		else
			res.send(result)
	})
})

router.get('/magazine/:id', function (req, res, next) {
	res.render("articleRead", {
		commonHead: commonHead,
		quill: quill,
		string: string[req.body.locale],
		fstring: fstring[req.body.locale],
		id: req.params.id,
	})
})

router.post('/magazine/:id', function (req, res, next) {
	connection.query("select * from `magazine` where id=?", [req.params.id], (err, result) => {
		const str = string[req.body.locale]
		if (err || result.length < 1) {// 등록된 기사가 없음
			res.send({title: str.title_null, contents: JSON.parse(str.contents_null).ops})
		} else {
			res.send({title: result[0].title, contents: result[0].contents.ops})
		}
	})
})

module.exports = router