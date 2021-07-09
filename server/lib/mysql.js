const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'leeseungyun',
	password: 'lsy1020',
	database: 'gets'
});

module.exports = connection