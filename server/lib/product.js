const re = /\s*(?:,|$)\s*/;

const Type = Object.freeze({
	"아우터": 1,
	"상의": 2,
	"하의": 3,
	"치마": 4,
	"세트": 5,
	"신발": 6,
	"가방": 7,
	"모자": 8,
})

function getTypeCode(text) {
	return Type[text]
}

const Detail = Object.freeze({
	"코트": 1,
	"패딩": 2,
	"가디건": 4,
	"블레이저": 8,
	"점퍼": 16,
	"자켓": 32,
	"후드집업": 64,
	"후리스": 128,
	"티셔츠": 1,
	"셔츠/블라우스": 2,
	"롱 슬리브": 4,
	"맨투맨": 8,
	"후드티": 16,
	"니트": 32,
	"나시": 64,
	"조끼": 128,
	"청바지": 1,
	"슬랙스": 2,
	"면바지": 4,
	"트레이닝 팬츠": 8,
	"조거 팬츠": 16,
	"반바지": 32,
	"레깅스": 64,
	"미니 스커트": 1,
	"미들 스커트": 2,
	"롱 스커트": 4,
	"원피스": 1,
	"투피스": 2,
	"수트": 4,
	"점프수트": 8,
	"스니커즈": 1,
	"로퍼": 2,
	"부츠": 4,
	"더비": 8,
	"힐/펌프스": 16,
	"샌들": 32,
	"슬리퍼": 64,
	"백팩": 1,
	"메신저/크로스백": 2,
	"토트백": 4,
	"에코백": 8,
	"가죽백": 16,
	"캡모자": 1,
	"비니": 2,
	"버킷햇": 4,
	"베레모": 8,
})

function getDetailCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Detail[element]
	}
	return code
}

const Color = Object.freeze({
	"블랙": 1,
	"화이트": 2,
	"차콜": 4,
	"그레이": 8,
	"아이보리": 16,
	"베이지": 32,
	"브라운": 64,
	"레드": 128,
	"핑크": 256,
	"오렌지": 512,
	"옐로우": 1024,
	"머스타드": 2048,
	"민트": 4096,
	"그린": 8192,
	"카키": 16384,
	"블루": 32768,
	"스카이블루": 65536,
	"네이비": 131072,
	"보라": 262144,
	"버건디": 524288,
})

function getColorCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Color[element]
		if (code == NaN) {
			console.log(element)
			break
		}
	}
	return code
}

const Fit = Object.freeze({
	"레귤러": 1,
	"오버핏": 2,
	"와이드": 4,
	"세미 와이드": 8,
	"스트레이트": 16,
	"슬림": 32,
	"테이퍼드": 64,
	"부츠컷": 128,
})

function getFitCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Fit[element]
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
	}
	return code
}

const Fiber = Object.freeze({
	"데님": 1,
	"면": 2,
	"가죽": 4,
	"린넨": 8,
	"실크": 16,
	"벨벳": 32,
	"코듀로이": 64,
	"스웨이드": 128,
	"폴리에스터": 256,
	"나일론": 512,
	"레이온": 1024,
	"아크릴": 2048,
	"비스코스": 4096,
	"울": 8192,
	"라이오셀": 16384,
	"폴리우레탄": 32768,
	"합성피혁": 65536,
	"밤부": 131072,
	"기타": 1073741824,
})

function getFiberCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Fiber[element]
	}
	return code
}

const Age = Object.freeze({
	"10대_이하": 1,
	"20대": 2,
	"30대": 4,
	"40대": 8,
	"50대_이상": 16,
})

function getAgeCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Age[element]
	}
	return code
}

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
	"러블리": 1024,
})

function getStyleCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Style[element]
	}
	return code
}

const Gender = Object.freeze({
	"남": 1,
	"여": 2,
})

function getGenderCode(text) {
	let code = 0
	for (const element of text.split(re)) {
		code += Gender[element]
	}
	return code
}

exports.getTypeCode = getTypeCode
exports.getDetailCode = getDetailCode
exports.getColorCode = getColorCode
exports.getFitCode = getFitCode
exports.getSeasonCode = getSeasonCode
exports.getFiberCode = getFiberCode
exports.getAgeCode = getAgeCode
exports.getStyleCode = getStyleCode
exports.getGenderCode = getGenderCode

