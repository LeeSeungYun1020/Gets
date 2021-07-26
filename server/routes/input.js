const express = require('express')
const router = express.Router()
const fs = require('fs')
const parse = require('csv-parse')
const connection = require('../lib/mysql')
const product = require('../lib/product')
const coordination = require('../lib/coordination')

router.get('/', function(req, res, next) {
	const processFile = async () => {
		let records = []
		let index = 1
		const parser = fs
		.createReadStream(`./product/product1.csv`)
		.pipe(parse({
			// CSV options
		}));
		for await (const record of parser) {
			const id = record[0]
			const name = record[1]
			const brand = record[2]
			const code = record[3]
			const gender = product.getGenderCode(record[4])
			const type = product.getTypeCode(record[5])
			const detail = product.getDetailCode(record[6] || record[7] || record[8] || record[9] || record[10] || record[11] || record[12] || record[13])
			const color = product.getColorCode(record[14])
			const fit = product.getFitCode(record[15])
			const season = product.getSeasonCode(record[16])
			const fiber = product.getFiberCode(record[17])
			const age = product.getAgeCode(record[18])
			const style = product.getStyleCode(record[19])
			const price = record[20]
			const size = record[21]
			const image = record[24].split(",")
			// TODO: 이미지 처리
			connection.query("insert into product \
				(id, name, brand, code, gender, type, detail, color, fit, season, fiber, age, style, price, size, image1ID, image2ID, image3ID) \
				values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[id, name, brand, code, gender, type, detail, color, fit, season, fiber, age, style, price, size, image[0], image[1] || null, image[2] || null],
				(err, result) => {
					if (err) {
						console.error(err)
					}
				})
			records.push(record)
		}
		return records
	}
	
	(async () => {
		const records = await processFile()
		res.send(records)
	})()
})

router.get("/coordination", (req, res) => {
	const processFile = async () => {
		let records = []
		let index = 1
		const parser = fs
		.createReadStream(`./coordination/coordination.csv`)
		.pipe(parse({}))
		for await(const record of parser) {
			const id = record[0]
			const outerID = record[1] || 0
			const outerImageID = record[2] || 0
			const topID = record[3] || 0
			const topImageID = record[4] || 0
			const bottomID = record[5] || 0
			const bottomImageID = record[6] || 0
			const skirtID = record[7] || 0
			const skirtImageID = record[8] || 0
			const setID = record[9] || 0
			const setImageID = record[10] || 0
			const shoesID = record[11] || 0
			const shoesImageID = record[12] || 0
			const bagID = record[13] || 0
			const bagImageID = record[14] || 0
			const hatID = record[15] || 0
			const hatImageID = record[16] || 0
			const title = record[17]
			const style = coordination.getStyleCode(record[18])
			const gender = coordination.getGenderCode(record[19])
			const age = coordination.getAgeCode(record[20])
			const bodyshape = coordination.getBodyShapeCode(record[21])
			const price = coordination.getPriceCode(record[22])
			const weather = coordination.getSeasonCode(record[23])
			const imageID = record[24] || 0
			// console.error(imageID)
			connection.query("insert into coordination \
	 			(id, title, outerID, outerImageID, topID, topImageID, bottomID, bottomImageID, skirtID, skirtImageID,\
	 			setID,setImageID,shoesID,shoesImageID,bagID,bagImageID,hatID,hatImageID,style,gender,age,bodyshape,price,weather,imageID) \
	 			values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?)",
				[id, title, outerID, outerImageID, topID, topImageID, bottomID, bottomImageID, skirtID, skirtImageID,
					setID, setImageID, shoesID, shoesImageID, bagID, bagImageID, hatID, hatImageID, style, gender, age, bodyshape, price, weather, imageID],
				(err, result) => {
					if (err) {
						console.error(err)
					}
				})
			records.push(record)
		}
		return records
	}
	(async () => {
		const records = await processFile()
		res.send(records)
	})()
})

router.get("/clear", (req, res) => {
	connection.query("delete from product", (err, result) => {
		res.send(result)
	})
})

module.exports = router