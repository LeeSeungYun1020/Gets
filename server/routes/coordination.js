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
		let user = req.body.email
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
	})
	
	router.post('/unfavoriteCoordination/:coordination', (req, res) => {
		let user = req.body.email
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
	})
	
	return router
}