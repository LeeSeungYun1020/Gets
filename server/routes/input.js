const express = require('express')
const router = express.Router()
const fs = require('fs')
const parse = require('csv-parse')
const connection = require('../lib/mysql')
const product = require('../lib/product')

router.get('/', function(req, res, next) {
	const processFile = async () => {
		let records = []
		let index = 1
		const parser = fs
		.createReadStream(`./product/product.csv`)
		.pipe(parse({
			// CSV options
		}));
		for await (const record of parser) {
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
			const image = record[23].split(",")
			// TODO: 이미지 처리
			connection.query("insert into product \
				(name, brand, code, gender, type, detail, color, fit, season, fiber, age, style, price, image1ID, image2ID, image3ID) \
				values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[name, brand, code, gender, type, detail, color, fit, season, fiber, age, style, price, image[0], image[1] || null, image[2] || null],
				(err, result) => {
				if (err)
					console.error(err)
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