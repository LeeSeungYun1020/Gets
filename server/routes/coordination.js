const express = require('express')
const router = express.Router()
const path = require('path');
const connection = require('../lib/mysql')
const fs = require('fs')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("coordination")
	});
	
	router.get('/res/coordi',  (req, res)=> {
		connection.query("select * from `product` where `id` IN (?,?,?,?,?,?,?,?)",
			[undefined, 9, 57, undefined, undefined, 269, undefined, undefined], (err, result) => {
				if (err) {
					throw err
				}
				console.log(result)
				res.send(result)
			})
	});
	
	//코디 찜하기, 찜삭제하기
	router.post('/favoriteCoordination/:coordination', (req, res) => {
		if (req.user) {
			let user = req.user
			let coordination = req.params.coordination
			connection.query(`insert into favoriteCoordination(userEmail, coordinationID)
                          values (?, ?)`, [user, coordination],
				(err, result) => {
					if (err)
						res.send({result: false})
					else {
						console.log(result)
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
	})
	
	router.post('/unfavoriteCoordination/:coordination', (req, res) => {
		if (req.user) {
			let user = req.user
			let coordination = req.params.coordination
			connection.query(`delete
                          from favoriteCoordination
                          where userEmail = ?
                            and coordinationID = ?`, [user, coordination],
				(err, result) => {
					if (err)
						res.send({result: false})
					else {
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
	})
	
	router.get("/:id", (req, res) => {
		const id = req.params.id
		connection.query("select * from `coordination` where `id`=?",
			[id],
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					result[0].result = true
					res.send(result[0])
				}
			})
	})
	
	router.get("/image/:imageID", (req, res) => {
		const imageID = req.params.imageID
		const filePath = path.join(__dirname, '../coordination/image')
		const options = {
			root: filePath,
		}
		fs.promises.access(`${filePath}/${imageID}.png`, fs.constants.F_OK)
		.then(() => res.sendFile(`${imageID}.png`, options))
		.catch(() => res.sendFile(`${imageID}.jpg`, options, err => {
			res.sendFile(`error.png`, options)
		}))
	})
	return router
}