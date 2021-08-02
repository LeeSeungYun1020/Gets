const express = require('express')
const router = express.Router()

module.exports=function(passport){
	router.post('/signin',
		passport.authenticate('local', {
			session: true,
			failureRedirect: '/api/signin/fail'
		}),
		(req, res) => {
			res.send({user: req.user, result: true})
		})
	
	router.get("/signin/fail", (req, res) => {
		res.send({result: false})
	})
	
	router.get("/sign/user", (req, res) => {
		if (req.user) {
			let user = req.user
			user["pw"] = null
			user["result"] = true
			res.send(user)
		} else res.send({"result": false})
	})
	
	router.get('/signout', function (req, res, next) {
		req.logout()
		req.session.save(function () {
			res.redirect('/');
		});
	});
	return router
}
