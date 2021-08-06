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
			connection.query(`insert into favoriteCoordination(userEmail, coordinationID)
                              values (?, ?)`, [req.user.email, req.params.coordinationID],
				(err, result) => {
					if (err)
						res.send({result: false, isDuplicate: err["errno"] === 1062})
					else {
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
	})
	
	router.get('/unfavorite/:coordinationID', (req, res) => {
		if (req.user) {
			connection.query(`delete
                              from favoriteCoordination
                              where userEmail = ?
                                and coordinationID = ?`,
				[req.user.email, req.params.coordinationID],
				(err, result) => {
					if (err)
						res.send({result: false})
					else {
						res.send({result: true})
					}
				})
		} else res.send({"result": false})
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
	
	router.get("/:id", (req, res) => {
		const id = req.params.id
		connection.query(`SELECT coordination.*, COUNT(favoriteCoordination.coordinationID) as favorite
                          FROM coordination,
                               favoritecoordination
                          WHERE coordinationID = ?
                            and coordination.id = favoriteCoordination.coordinationID`,
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
	return router
}