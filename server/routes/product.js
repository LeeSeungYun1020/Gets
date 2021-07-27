const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')


module.exports = function (passport) {
	router.get('/', function (req, res, next) {
		res.send("product")
	});
	
	router.get('/detail/:productID', function (req, res, next) {
		res.send("product" + req.params.productID)
	});
	
	router.get('/res/coordi', function (req, res) {
		connection.query("select * from `product` where `id` IN (?,?,?,?,?,?,?,?)",
			[undefined, 9, 57, undefined, undefined, 269, undefined, undefined], (err, result) => {
				if (err) {
					throw err
				}
				console.log(result)
				res.send(result)
			})
	});
	
//찜하기, 찜삭제하기
	router.post('/favorite/:product',(req,res)=>{
		var user=req.body.email
		var product=req.params.product
		connection.query(`insert into favorite(userEmail, productID) values(?,?)`,[user,product],
			(err,result)=>{
				if (err)
					res.send({result: false})
				else{
					console.log(result)
					res.send({result: true})
				}
		})
	})
	
	router.post('/unfavorite/:product',(req,res)=>{
		var user=req.body.email
		var product=req.params.product
		connection.query(`delete from favorite where userEmail=? and productID=?`,[user,product],
			(err,result)=>{
				if (err)
					res.send({result: false})
				else{
					res.send({result: true})
				}
			})
	})
	
	return router
}