const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("closet")
	});
	
	router.get('/product/list',(req,res)=>{
		let user = req.body.email
		connection.query(`select * from favoriteProduct where userEmail=?`,[user],
			(err,result)=>{
				if (err || result.length === 0)
					res.send({result: false,error:"notMatch"})
				else {
					res.send(result)
				}
			})
	})
	
	router.get('/coordination/list',(req,res)=>{
		let user = req.body.email
		connection.query(`select * from favoriteCoordination where userEmail=?`,[user],
			(err,result)=>{
				if (err || result.length === 0)
					res.send({result: false,error:"notMatch"})
				else {
					res.send(result)
				}
			})
	})
	
	return router
}