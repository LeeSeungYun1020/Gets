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

router.get('/read/:id', function (req, res, next) {
	res.render("articleRead", {
		commonHead: commonHead,
		quill: quill,
		string: string[req.body.locale],
		fstring: fstring[req.body.locale],
		id: req.params.id,
	})
})

router.post('/read/:id', function (req, res, next) {
	connection.query("select * from `article` where id=?", [req.params.id], (err, result) => {
		const str = string[req.body.locale]
		if (err || result.length < 1) {// 등록된 기사가 없음
			res.send({title: str.title_null, contents: JSON.parse(str.contents_null).ops})
		} else {
			res.send({title: result[0].title, contents: result[0].contents.ops})
		}
	})
})

router.get('/create', function (req, res, next) {
	res.render("articleCreate", {
		commonHead: commonHead,
		quill: quill,
		string: string[req.body.locale],
		fstring: fstring[req.body.locale],
		id: 0
	})
})

router.get('/create/:id', function (req, res, next) {
	res.render("articleCreate", {
		commonHead: commonHead,
		quill: quill,
		string: string[req.body.locale],
		fstring: fstring[req.body.locale],
		id: req.params.id
	})
})

router.post('/create', function (req, res, next) {
	//console.error(JSON.stringify(req.body.contents))
	connection.query("INSERT INTO `article` (title, contents) VALUES (?, ?)",
		[req.body.title, req.body.contents],
		(err, result) => {
			console.log(err)
			console.log(result)
			if (err)
				res.send({result: false})
			else
				res.redirect(`/article/read/${result.insertId}`)
		})
})

router.post('/delete/:id', function (req, res, next) {
	connection.query("delete from `article` where id=?", [req.params.id], (err, result) => {
		res.send(err == null)
	})
})

router.post('/update/:id', function (req, res, next) {
	connection.query("update `article` set `title`=?, `contents`=? where `id`=?",
		[req.body.title, req.body.contents, req.params.id],
		(err, result) => {
			console.log(result)
			if (err)
				res.send({result: false})
			else
				res.redirect(`/article/read/${req.params.id}`)
		})
})

module.exports = router