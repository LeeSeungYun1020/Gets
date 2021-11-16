/*
* Home
* 맞춤 추천 코디, 스타일별 코디, 대표 코디, 인기 코디 제공
* */
const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const spawn = require('child_process').spawn

module.exports = function (passport) {
	router.get('/', function (req, res) {
		res.send("home")
	});
	
	// 맞춤 추천 (+버튼 눌러서 옵션 선택 시, query 있음)
	router.get("/getStyle/:number", (req, res) => {
		const number = req.params.number
		const gender = req.query.gender ?? (1 << 2) - 1 // all gender
		const age = req.query.age ?? (1 << 5) - 1 // all age
		const topFit = req.query.topFit ?? 1 // regular
		const bottomFit = req.query.bottomFit ?? 1 // regular
		const style = req.query.style ?? (1 << 11) - 1 // all style
		
		const fit = getFit(topFit, bottomFit)
		const stylePreference = getStylePreferenceWithStyle(style)
		
		getRecommendation(gender, age, fit, stylePreference, number).then((result) => {
			res.send(result)
		})
	})
	
	// 맞춤 추천 (로그인하고 +버튼 누르기 전, query 없음)
	router.get("/custom/:number", async (req, res) => {
		if (!req.user) {
			res.send([{result: false}])
		} else {
			const number = req.params.number
			const gender = req.user.gender ?? 3
			const age = getAge(req.user.birthday)
			const fit = await getFitFromBodyShape(req.user)
			const favoriteProductList = await getFavoriteProductList(req.user.email)
			const favoriteCoordinationList = await getFavoriteCoordinationList(req.user.email)
			getStylePreference(favoriteProductList, favoriteCoordinationList)
			.then(stylePreference => {
				getRecommendation(gender, age, fit, stylePreference, number).then((result) => {
					res.send(result)
				})
			})
			
		}
	})
	
	// 스타일(최신순)
	router.get("/style/:styleID/:number", (req, res) => {
		connection.query(`SELECT *
                          FROM coordination
                          WHERE (style & ?) != 0
                          ORDER BY id desc
                          LIMIT ${req.params.number}`,
			[req.params.styleID],
			(err, result) => {
				if (err || result.length === 0)
					res.send([{result: false}])
				else {
					result[0]["result"] = true
					res.send(result)
				}
			})
	})
	
	//각 스타일에 맞는 코디를 대표 1개씩 표시
	router.get("/representative/style", (req, res) => {
		let list = []
		let casual = [], minimal = [], campus = [], street = [], rockchic = [],
			amekaji = [], cityboy = [], office = [], sexyglam = [], feminine = [], lovely = []
		connection.query(`select id, style
                          from coordination`, (err, result) => {
			if (err || result.length === 0)
				res.send({result: false})
			let temp, digit
			for (let i = 0; i < result.length; i++) {
				temp = result[i].style.toString(2)
				digit = temp.length - 1
				for (let j = 0; j < temp.length; j++) {
					if (temp[j] === '1') {
						switch (2 ** digit) {
							case 1:
								minimal.push(result[i].id);
								break
							case 2:
								casual.push(result[i].id);
								break
							case 4:
								campus.push(result[i].id);
								break
							case 8:
								street.push(result[i].id);
								break
							case 16:
								rockchic.push(result[i].id);
								break
							case 32:
								amekaji.push(result[i].id);
								break
							case 64:
								cityboy.push(result[i].id);
								break
							case 128:
								office.push(result[i].id);
								break
							case 256:
								sexyglam.push(result[i].id);
								break
							case 512:
								feminine.push(result[i].id);
								break
							default:
								lovely.push(result[i].id);
						}
					}
					digit--
				}
			}
			for (let i = 0; i < 11; i++) {
				switch (i) {
					case 0:
						list[i] = minimal[Math.floor(Math.random() * minimal.length)];
						break
					case 1:
						list[i] = casual[Math.floor(Math.random() * casual.length)];
						break
					case 2:
						list[i] = campus[Math.floor(Math.random() * campus.length)];
						break
					case 3:
						list[i] = street[Math.floor(Math.random() * street.length)];
						break
					case 4:
						list[i] = rockchic[Math.floor(Math.random() * rockchic.length)];
						break
					case 5:
						list[i] = amekaji[Math.floor(Math.random() * amekaji.length)];
						break
					case 6:
						list[i] = cityboy[Math.floor(Math.random() * cityboy.length)];
						break
					case 7:
						list[i] = office[Math.floor(Math.random() * office.length)];
						break
					case 8:
						list[i] = sexyglam[Math.floor(Math.random() * sexyglam.length)];
						break
					case 9:
						list[i] = feminine[Math.floor(Math.random() * feminine.length)];
						break
					case 10:
						list[i] = lovely[Math.floor(Math.random() * lovely.length)];
						break
				}
			}
			res.send(list)
		})
	})
	
	//홈화면_탑트렌드에 있는 제품을 number 수만큼표시
	router.get("/toptrends/:number", (req, res) => {
		connection.query(`select productID, count(productID) as cnt
                          from favoriteProduct
                          group by productID
                          order by cnt desc
                          limit ${req.params.number}`, (err, result) => {
			if (err)
				res.send({result: false})
			else {
				let obj = []
				for (let i = 0; i < result.length; i++) {
					obj.push(result[i].productID)
				}
				connection.query(`select *
                                  from product
                                  where id in (${obj})
                                  order by field(id, ${obj})`, (err, result) => {
					if (err || result.length === 0)
						res.send([{result: false}])
					else {
						result[0]["result"] = true
						res.send(result)
					}
				})
			}
		})
	})
	return router
}

function getRecommendation(gender, age, fit, stylePreference, number) {
	let scriptPath = '../data/CoordinationRecommendation/'
	let scriptName = 'main.py'
	let data = `{\"gender\": ${gender}, \"age\": ${age}, \"fit\": ${fit}, \"stylePreference\": ${stylePreference}}`
	let array = ['-O', scriptPath + scriptName, number, data]
	
	return new Promise(resolve => {
		let process = spawn('python3', array)
		
		process.stdout.on('data', function (data) {
			let str = data.toString().trim()
			sql(str).then(function (result) {
				result[0]["result"] = true
				resolve(result)
			})
		})
		process.stderr.on('data', function () {
			resolve([{result: false}])
		})
	})
	
}

function sql(str) {
	let idList = str.trim().split(',')
	
	let whereCluase = ``
	
	let i = 0
	for (id of idList) { // where절 생성
		if (i++ !== 0)
			whereCluase += ` or `
		whereCluase += `id = ${id}`
	}
	
	let query = `SELECT *
                 FROM coordination
                 WHERE ` + whereCluase
	
	return new Promise(resolve => {
		connection.query(query,
			(err, result) => {
				if (err || result.length === 0)
					result = [{result: false}]
				resolve(result)
			})
	})
}

function getAge(birthday) {
	let now = new Date()
	let currentYear = (now.toString().split(' ')[3]) * 1
	let birthYear = (birthday.toString().split(' ')[3]) * 1
	let age = currentYear - birthYear + 1
	
	let tmp = parseInt(age / 10)
	if (tmp < 1) tmp = 1
	if (tmp > 5) tmp = 5
	
	return 1 << (tmp - 1)
}

function getCoordination(id) {
	return new Promise(resolve => {
		connection.query(`SELECT *
                          FROM coordination
                          WHERE id = ?`,
			[id],
			(err, result) => {
				let value
				if (err || result.length === 0)
					value = ({result: false})
				else {
					result[0].result = true
					value = (result[0])
				}
				resolve(value)
			})
	})
}

function getProduct(id) {
	return new Promise(resolve => {
		connection.query(`select *
                          from product
                          where product.id = ?;`,
			[id],
			(err, result) => {
				let value
				if (err || result.length === 0)
					value = ({result: false})
				else {
					result[0].result = true
					value = (result[0])
				}
				resolve(value)
			})
	})
}

function getFavoriteProductList(email) {
	return new Promise(resolve => {
		connection.query(`select productID
                          from favoriteProduct
                          where userEmail = ?`, [email],
			(err, result) => {
				let value
				if (err || result.length === 0)
					value = ([{result: false}])
				else {
					result[0]['result'] = true
					value = (result)
				}
				resolve(value)
			})
	})
}

function getFavoriteCoordinationList(email) {
	return new Promise(resolve => {
		connection.query(`select coordinationID
                          from favoritecoordination
                          where userEmail = ?`, [email],
			(err, result) => {
				let value
				if (err || result.length === 0)
					value = ([{result: false}])
				else {
					result[0]['result'] = true
					value = (result)
				}
				resolve(value)
			})
	})
}

function getFitFromBodyShape(user) {
	let gender = user.gender ?? 3
	let shoulder = user.shouler ?? 2
	let waist = user.waist ?? 2
	let hip = user.hip ?? 2
	let thigh = user.thigh ?? 2
	
	if (gender === 3) {
		return (1 << 21) - 1 // all fit
	}
	
	let scriptPath = '../data/BodyShapeToFit/'
	return new Promise(resolve => {
		let process = spawn('python3', [scriptPath + 'main.py', gender, shoulder, waist, hip, thigh])
		
		process.stdout.on('data', function (data) {
			resolve(data.toString())
		})
		process.stderr.on('data', function (data) {
			resolve({'result': false})
		})
	})
}

function oneHotDecoder(fit) {
	let singleValueList = []
	let value = 1
	
	while (fit > 0) {
		if (fit % 2 === 1) {
			singleValueList.push(value)
		}
		fit = fit >> 1
		value = value << 1
	}
	
	return singleValueList
}

const TopFit = {
	32: "slim",
	1: "regular",
	2: "over"
}
const BottomFit = {
	32: "slim",
	1: "regular",
	16: "straight",
	8: "semi wide",
	4: "wide",
	64: "tapered",
	128: "bootcut"
}

const coordiFit = {
	"slim_slim": 1 << 0,
	"slim_regular": 1 << 1,
	"slim_straight": 1 << 2,
	"slim_semi wide": 1 << 3,
	"slim_wide": 1 << 4,
	"slim_tapered": 1 << 5,
	"slim_bootcut": 1 << 6,
	
	"regular_slim": 1 << 7,
	"regular_regular": 1 << 8,
	"regular_straight": 1 << 9,
	"regular_semi wide": 1 << 10,
	"regular_wide": 1 << 11,
	"regular_tapered": 1 << 12,
	"regular_bootcut": 1 << 13,
	
	"over_slim": 1 << 14,
	"over_regular": 1 << 15,
	"over_straight": 1 << 16,
	"over_semi wide": 1 << 17,
	"over_wide": 1 << 18,
	"over_tapered": 1 << 19,
	"over_bootcut": 1 << 20
}

function getFit(topFit, bottomFit) {
	return coordiFit[TopFit[topFit] + '_' + BottomFit[bottomFit]]
}

const Style = [
	"minimal",
	"casual",
	"campus",
	"street",
	"rock chic",
	"amekaji",
	"city boy",
	"office",
	"sexy glam",
	"feminine",
	"lovely"
]

function getStylePreferenceWithStyle(style) {
	if (style === 0) style = (1 << 11) - 1
	let preferenceList = new Array(Style.length)
	let list = oneHotDecoder(style)
	let value = (100 / list.length).toFixed(2)
	
	for (let i of list) {
		preferenceList[Math.log2(i)] = value
	}
	
	let result = `{`
	for (let i = 0; i < Style.length; i++) {
		let preference = preferenceList[i] ?? 0
		result += `\"${Style[i]}\":${preference}`
		if (i !== Style.length - 1) result += `,`
	}
	result += `}`
	
	return result
}

async function getStylePreference(favoriteProductList, favoriteCoordinationList) {
	if (favoriteProductList[0]['result'] === false) favoriteProductList = []
	if (favoriteCoordinationList[0]['result'] === false) favoriteCoordinationList = []
	
	let productWeight = 2
	let coordinationWeight = 10
	
	let preferenceList = new Array(Style.length)
	for (let i = 0; i < Style.length; i++) preferenceList[i] = 0
	
	// 찜 제품 목록에서 점수를 구한다.
	for (let item of favoriteProductList) {
		let product = await getProduct(item['productID'])
		let style = product['style']
		
		for (let code of oneHotDecoder(style)) {
			preferenceList[Math.log2(code)] += productWeight
		}
	}
	
	// 찜 코디 목록에서 점수를 구한다.
	for (let item of favoriteCoordinationList) {
		let coordination = await getCoordination(item['coordinationID'])
		let style = coordination['style']
		
		for (let code of oneHotDecoder(style)) {
			preferenceList[Math.log2(code)] += coordinationWeight
		}
	}
	
	// 합이 100이 되도록 값을 변환한다.
	let sum = 0
	for (let i = 0; i < preferenceList.length; i++)
		sum += preferenceList[i]
	
	let result
	if (sum === 0) {
		result = `{\"minimal\":9.1,\"casual\":9.1,\"campus\":9.1,\"street\":9.1,\"rock chic\":9.1,\"amekaji\":9.1,\"city boy\":9.1,\"office\":9.1,\"sexy glam\":9.1,\"feminine\":9.1,\"lovely\":9.1}`
	} else {
		for (let i = 0; i < preferenceList.length; i++) {
			preferenceList[i] = Math.round((preferenceList[i] / sum * 100) * 10) / 10
		}
		
		// 결과값을 반환하기 위해 형변환
		result = `{`
		for (let i = 0; i < Style.length; i++) {
			let preference = preferenceList[i] ?? 0
			result += `\"${Style[i]}\":${preference}`
			if (i !== Style.length - 1) result += `,`
		}
		result += `}`
	}
	return result
}


