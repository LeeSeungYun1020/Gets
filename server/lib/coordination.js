const re = /\s*(?:,|$)\s*/;

const Style = Object.freeze({
	"미니멀": 1,
	"케쥬얼": 2,
	"캠퍼스": 4,
	"스트릿": 8,
	"락시크": 16,
	"아메카지": 32,
	"시티보이": 64,
	"오피스": 128,
	"섹시글램": 256,
	"페미닌": 512,
	"러블리": 1024
})

function getStyleCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Style[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}

const Gender = Object.freeze({
	"남": 1,
	"여": 2,
	"남,여": 3,
})

function getGenderCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Gender[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}

const Age = Object.freeze({
	"10대": 1,
	"20대": 2,
	"30대": 4,
	"40대": 8,
	"50대": 16,
})

function getAgeCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Age[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}


//	체형 객체, 변환함수 구현해야함
const Fit = Object.freeze({
	"하체통통": 1,
})

function getFitCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += BodyShape[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}

const Price = Object.freeze({
	"10만원이하": 1,
	"10만원대": 2,
	"20만원대": 4,
	"30만원대": 8,
	"40만원대": 16,
	"50만원대이상": 32,
})

function getPriceCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Price[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}

const Season = Object.freeze({
	"봄": 1,
	"여름": 2,
	"가을": 4,
	"겨울": 8,
})

function getSeasonCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Season[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}

exports.getStyleCode = getStyleCode
exports.getSeasonCode = getSeasonCode
exports.getAgeCode = getAgeCode
exports.getFitCode = getFitCode
exports.getPriceCode = getPriceCode
exports.getGenderCode = getGenderCode