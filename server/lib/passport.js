module.exports = function (app, mysql) {
	const passport = require('passport')
	const LocalStrategy = require('passport-local').Strategy
	const bcrypt = require('bcrypt')
	
	app.use(passport.initialize());
	app.use(passport.session());
// 로그인 성공
	passport.serializeUser(function (user, done) {
		done(null, user.email);
	});
// 이후 페이지 방문
	passport.deserializeUser(function (email, done) {
		mysql.query(
			"SELECT * from user WHERE email=?",
			[email],
			function (error, results, fields) {
				done(error, results[0])
			})
		
	});
	
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'pw'
		},
		function (username, password, done) {
			mysql.query(
				"SELECT * from user WHERE email=?",
				[username],
				function (err, result) {
					const user = result[0]
					if (err || result.length === 0)
						return done(null, false, {message: "username"})
					else {
						bcrypt.compare(password, user.pw, function(err, result) {
							if (result === true) {
								return done(null, user)
							} else {
								return done(null, false, {message: "password"})
							}
						})
					}
				})
		}
	))
	return passport
}