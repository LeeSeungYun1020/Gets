const express = require('express')
const router = express.Router()
const path = require('path');
const connection = require('../lib/mysql')
const fs = require('fs')

module.exports = function (passport) {
	router.get('/', function (req, res) {
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
	
	router.get('/count/favorite/:coordinationID', (req, res) => {
		connection.query(`select count(coordinationID) as favorite
                          from favoriteCoordination
                          where coordinationID = ?`,
			[req.params.coordinationID],
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					result[0]["result"] = true
					res.send(result[0])
				}
			})
	})
	
	router.get('/check/favorite/:coordinationID', (req, res) => {
		if (req.user) {
			connection.query(`select *
                              from favoriteCoordination
                              where userEmail = ?
                                and coordinationID = ?`,
				[req.user.email, req.params.coordinationID],
				(err, result) => {
					if (err || result.length === 0)
						res.send({result: false})
					else
						res.send({result: true})
				})
		} else res.send({"result": false})
		
	})
	
	router.get('/user/favorite', (req, res) => {
		if (req.user) {
			connection.query(`select coordinationID
                              from favoriteCoordination
                              where userEmail = ?`, [req.user.email],
				(err, result) => {
					if (err || result.length === 0)
						res.send({result: false})
					else
						res.send(result)
				})
		} else res.send({result: false})
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
			// console.log(err)
			res.sendFile(`error.png`, options)
		}))
	})
	
	//마지막 id번호
	router.get("/number", (req, res) => {
		connection.query(`select id
                          from coordination
                          order by id desc
                          limit 1`,
			(err, result) => {
				if (err || result.length === 0)
					res.send({result: false})
				else {
					console.log(result[0])
					res.send(result)
				}
			})
	})
	
	router.get("/:id", (req, res) => {
		const id = req.params.id
		connection.query(`SELECT *
                          FROM coordination
                          WHERE id = ?`,
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