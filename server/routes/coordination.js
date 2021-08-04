const express = require('express')
const router = express.Router()
const path = require('path');
const connection = require('../lib/mysql')
const fs = require('fs')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("coordination")
	});
	
	//코디 찜하기, 찜삭제하기
	router.get('/favorite/:coordinationID', (req, res) => {
		if (req.user) {
			let user = req.user.email
			let coordination = req.params.coordinationID
			connection.query(`insert into favoriteCoordination(userEmail, coordinationID)
                          values (?, ?)`, [user, coordination],
				(err, result) => {
					if (err)
						res.send({result: false})
					else {
						connection.query(`select favorite from coordination where id=${coordination}`,(err,result)=>{
							const change=parseInt(Object.values(result[0]))+1
							connection.query(`update coordination set favorite=${change} where id=${coordination}`,(err,result)=>{
								if(err)
									res.send({result: false})
							})
						})
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
	})
	
	router.post('/unfavorite/:coordinationID', (req, res) => {
		if (req.user) {
			let user = req.user.email
			let coordination = req.params.coordinationID
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