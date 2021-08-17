const express = require('express')
const router = express.Router()
const fs = require('fs')
const parse = require('csv-parse')
const connection = require('../lib/mysql')
const product = require('../lib/product')
const coordination = require('../lib/coordination')

const commonHead = require('../components/commonHead')
const string = require('../components/string_index')
const fstring = require('../components/string_footer')

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('input', {commonHead: commonHead, string: string[req.body.locale], fstring: fstring[req.body.locale]})
});

router.get('/product', function (req, res, next) {
	const processFile = async () => {
		let records = []
		let index = 1
		const parser = fs
		.createReadStream(`./product/product.csv`)
		.pipe(parse({
			// CSV options
		}));
		for await (const record of parser) {
			const id = record[1]
			const name = record[2]
			const brand = record[3]
			const code = record[4]
			const gender = product.getGenderCode(record[5])
			const type = product.getTypeCode(record[6])
			const detail = product.getDetailCode(record[7] || record[9] || record[11] || record[13] || record[15] || record[17] || record[18] || record[19])
			const color = product.getColorCode(record[21])
			const fit = product.getFitCode(record[8] || record[10] || record[12] || record[14] || record[16])
			const season = product.getSeasonCode(record[23])
			const fiber = product.getFiberCode(record[20])
			const age = product.getAgeCode(record[24])
			const style = product.getStyleCode(record[22])
			const price = record[26]
			const size = record[29]
			const image = record[28].split(",")
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
			const weather = coordination.getSeasonCode(record[21])
			const fit = record[22] //coordination.getFitCode(record[22])
			const price = record[23]
			const imageID = record[24].split(".")[0]
			console.log(fit)
			connection.query(`insert into coordination \
	 			(id, title, outerID, outerImageID, topID, topImageID, bottomID, bottomImageID, skirtID, skirtImageID,\
	 			setID,setImageID,shoesID,shoesImageID,bagID,bagImageID,hatID,hatImageID,style,gender,age,weather,fit,price,imageID) \
	 			values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?)`,
				[id, title, outerID, outerImageID, topID, topImageID, bottomID, bottomImageID, skirtID, skirtImageID,
					setID, setImageID, shoesID, shoesImageID, bagID, bagImageID, hatID, hatImageID, style, gender, age, weather, fit, price, imageID],
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

router.get("/article", (req, res) => {
	connection.query(`
        insert into article \
        values (1, "minimal", \
                "간단, 절제, 깔끔", \
                "simple, moderation, clean", \
                "미니멈은 [최소의.극히 미소한]이란 뜻으로, 아주 극도로 심플함을 추구한 패션 전반을 가리킨다. 미니멀 모드나 미니멀 룩이라고도 하여, 장식적인 패션표현의 대극에 있는 것. 약간 절제된 듯한 미학이 있으며, 그 안에서도 어떻게 표현하고 풀어내는가에 따라서 각각 다른 느낌을 주곤 한다. 단순하면서도 간결하며 또한 우아한 느낌 까지도 준다.", \
                "“Minimum” means [minimum, extremely small], and refers to the overall fashion that pursues extreme simplicity. Also called minimal mode or minimal look, it is at the pole of decorative fashion expression. It has a slightly understated aesthetic, and even within it, it gives a different feeling depending on how it is expressed and solved. It is simple yet concise and also gives an elegant feeling." \
               ); \
        insert into article \
        values (2, "casual", \
                "편함, 일상, 익숙함", \
                "comfort, daily, familiarity", \
                "T.P.O(Time, Place, Occasion)에서 크게 벗어나지 않는 한도 내에서 부담 없이 입을 수 있는 자연스럽고 편한 느낌의 의류. 가격대도 저가부터 고가까지 넓게 퍼져 있어서 자기 경제 사정에 맞춰 구매 가능하다. 달리 말하자면, 상황에 어긋나지만 않으면 입고 싶은 것을 아무거나 매칭하여 편하게 입으면 그것이 케주얼 웨어가 된다.
		 우리가 지금 가장 많이 보고 또 가장 잘 알고 있는 캐주얼은 스마트 캐주얼(smart casual). 캐주얼 스타일에 활동적이고 편하다는 의미로 스마트(smart)를 더해 ‘좀 차려입은 것 같으면서도 편한 옷’이 바로 스마트 캐주얼이다. 격식과 형식을 매우 중요시하는 전통적인 캐주얼과 다르게 ‘활동성’과 ‘생활’에 초점을 두고 일상생활 속에서 하는 다양한 활동에 불편함이 없도록 하는 것을 중요시하기 때문에 그다지 격식을 따지지 않는다.", \
                "Natural and comfortable clothing that can be worn casually within the limits of T.P.O (Time, Place, Occasion). The price range is also widely spread from low to high, so you can purchase it according to your economic situation. In other words, as long as it doesn''t go against the situation, if you wear it comfortably by matching anything you want to wear, it becomes casual wear.
				The casual we see the most and know the most right now is smart casual. Smart casual is a casual style with smart in the sense of being active and comfortable. Unlike traditional casual, which places great importance on formality and formality, it focuses on ''activity'' and ''life'', and it is important not to be uncomfortable in various activities in daily life, so it is not very formal." \
               ); \
        insert into article \
        values (4, "campus", \
                "캐주얼, 스포티, 새내기", \
                "casual, sporty, newbie", \
                "놈코어(Norm Core). 표준을 뜻하는 ‘놈(norm)’과 핵심을 뜻하는 ‘코어(core)’의 합성어로 평범함(놈)을 추구하면서도 포인트(코어)가 있는 스타일을 말한다. 일명 ‘꾸안꾸(꾸민 듯 안 꾸민 듯)’이라고 할 수 있는 정의 내리기 어려운 패션이지만, 간단하게 말하자면 ‘평범함을 추구하는’ 패셔니스타들의 스타일이다. \
		캠퍼스룩은 말그대로 캠퍼스 즉 학교에서 입을만한 패션을 말하는 건데, 요즘 캠퍼스룩의 기본 베이스는 바로 ‘꾸안꾸’이다. 그중에서도 요즘은 캐주얼과 스포티즘 룩(Sportism Look)에 쓰이는 아이템들을 활용한 스타일들이 많이 보이고 있는 추세이다.", \
                "Norm Core. It is a compound word of ''norm'' meaning standard and ''core'' meaning core, and refers to a style with a point (core) while pursuing normality (norm). It is a fashion that is difficult to define, which can be called ''Kuan-ku'' (as if it was decorated or not), but simply put, it is the style of fashionistas who ''pursue ordinary''. \
		Campus look literally refers to fashion that can be worn on campus, that is, at school. Among them, there are a lot of styles using items used for casual and sportism look these days."); \
        insert into article \
        values (8, "street", \
                "길거리, 유행", \
                "street, trend", \
                "스트릿 패션은 청소년과 같은 젊은 층 사이에서 자생적으로 생겨난 일시적 유행 패션이 역으로 오트쿠튀르, 프레타포트테 등의 하이패션에 영향을 주는 바텀 업(bottom up) 현상으로 이어지며, 이를 하이패션과 구분짓기 위해 생겨난 용어이다.",
                "Street fashion is a fad fashion that is spontaneously generated among young people such as teenagers, which leads to a bottom-up phenomenon that inversely affects high fashion such as haute couture and pre-tapotte, which is distinguished from high fashion. It is a term coined to create" \
               ); \
        insert into article \
        values (16, "rock_chic", \
                "록 음악, 설명 불가", \
                "rock music, unexplainable", \
                "록 음악 및 문화에서 파생되어 장르에 따라 스타일이 다르다. 입는 사람의 취향과 타입이 잘 부각되는 형태의 스타일이 많다.", \
                "It is derived from rock music and culture, with different styles depending on the genre. There are many styles that highlight the taste and type of the wearer." \
               ); \
        insert into article \
        values (32, "amekaji", \
                "일본, 아메리칸 캐주얼", \
                "japen, american casual", \
                "미국 복식 수입하던 일본인들이 아메리칸 캐주얼을 지칭하던 것에서 유래했다는 설이 일반적 작업복과 달리 사무직도 입을 수 있도록 부드러운 원단을 사용하고 넓은 통은 그대로 유지하였다. 동양인의 체격에 맞게 기장은 짧아지고 봉제선은 좁아졌다. 굽이 낮은 로퍼, 베스트, 반다나등을 활용한 것이 특징이다.", \
                "Unlike general work clothes, it is said that Japanese importers of American dress refer to American casual. Soft fabric is used so that office workers can wear it, and the wide barrel is maintained as it is. The length is shortened and the seam is narrower to fit the physique of Asians. It is characterized by using low-heeled loafers, vests, and bandanas." \
               ); \
        insert into article \
        values (64, "city_boy", \
                "아메카지", \
                "simple, moderation, clean", \
                "아메카지에서 파생된 스타일로 주로 오버사이즈 제품을 사용하여 심플해 보이면서 성숙한 모습을 담았다. 차분하지만 진취적이고 엉성해 보이지만 문화적 성향이 뛰어난 감성이 담겨있다는 특징이 있다.", \
                "It is a style derived from American casual, mainly using oversized products to look simple and mature. It looks calm, enterprising, and sloppy, but it has the characteristic of having a strong cultural sensibility." \
               ); \
        insert into article \
        values (128, "office", \
                "사무실, 출근", \
                "office, work", \
                "사무실 출근 복장", \
                "Office work clothes" \
               ); \
        insert into article \
        values (256, "sexy_glam", \
                "섹시, 글램", \
                "sexy, glam", \
                "섹시 글램", \
                "Sexy glam" \
               ); \
        insert into article \
        values (512, "feminine", \
                "여성, 가을", \
                "female, fall", \
                "가장 여성스러운 스타일 연출, 우아하면서 여성스럽게 표현하는 스타일, 쉬폰 원피스, 페미닌 블라우스 등의 아이템이 자주 사용되며 파스텔 톤 컬러, 플라워 패턴 등이 특징", \
                "Creating the most feminine style, elegant and feminine styles, chiffon dresses, feminine blouses, and other items are often used, featuring pastel tone colors and flower patterns." \
               ); \
        insert into article \
        values (1024, "lovely", \
                "데이트룩, 사랑스러운", \
                "date look, love", \
                "아메카지에서 파생된 스타일로 주로 오버사이즈 제품을 사용하여 심플해 보이면서 성숙한 모습을 담았다. 차분하지만 진취적이고 엉성해 보이지만 문화적 성향이 뛰어난 감성이 담겨있다는 특징이 있다.", \
                "It is a style derived from American casual, mainly using oversized products to look simple and mature. It looks calm, enterprising, and sloppy, but it has the characteristic of having a strong cultural sensibility." \
               );`.trim(), (err, result) => {
		res.send(err || result)
	})
})

router.get("/ready", (req, res) => {
	connection.query(`
        create table IF NOT EXISTS user
        (
            email         VARCHAR(64) PRIMARY KEY,
            pw            VARCHAR(32)  NOT NULL,
            name          NVARCHAR(16) NOT NULL,
            phone         VARCHAR(16),
            birthday      DATE,
            address       NVARCHAR(128),
            addressDetail NVARCHAR(128),
            gender        INT,
            height        INT,
            weight        INT,
            topSize       INT,
            bottomSize    INT,
            shoulder      INT,
            waist         INT,
            hip           INT,
            thigh         INT,
            style         INT
        );

        create table IF NOT EXISTS product
        (
            id       INT PRIMARY KEY AUTO_INCREMENT,
            name     NVARCHAR(128) NOT NULL,
            brand    NVARCHAR(128) NOT NULL,
            code     NVARCHAR(64),
            gender   INT           NOT NULL,
            type     INT           NOT NULL,
            detail   INT           NOT NULL,
            color    INT           NOT NULL,
            fit      INT           NOT NULL,
            season   INT           NOT NULL,
            fiber    INT           NOT NULL,
            age      INT           NOT NULL,
            style    INT           NOT NULL,
            price    INT           NOT NULL,
            size     VARCHAR(128)  NOT NULL,
            image1ID VARCHAR(32)   NOT NULL,
            image2ID VARCHAR(32) DEFAULT NULL,
            image3ID VARCHAR(32) DEFAULT NULL
        );

        create table IF NOT EXISTS magazine
        (
            id       INT PRIMARY KEY AUTO_INCREMENT,
            title    VARCHAR(256)  NOT NULL,
            keyword  VARCHAR(64) DEFAULT NULL,
            contents VARCHAR(2048) NOT NULL,
            imageID  VARCHAR(32) DEFAULT NULL,
            styleTag INT         DEFAULT NULL
        );

        create table IF NOT EXISTS coordination
        (
            id            INT PRIMARY KEY AUTO_INCREMENT,
            title         VARCHAR(64),
            outerID       INT,
            outerImageID  INT,
            topID         INT,
            topImageID    INT,
            bottomID      INT,
            bottomImageID INT,
            skirtID       INT,
            skirtImageID  INT,
            setID         INT,
            setImageID    INT,
            shoesID       INT,
            shoesImageID  INT,
            bagID         INT,
            bagImageID    INT,
            hatID         INT,
            hatImageID    INT,
            style         INT,
            gender        INT,
            age           INT,
            fit           INT,
            price         INT,
            weather       INT,
            imageID       VARCHAR(64)
        );

        create table IF NOT EXISTS favoriteProduct
        (
            userEmail VARCHAR(64),
            productID INT,
            PRIMARY KEY (userEmail, productID),
            FOREIGN KEY (userEmail) REFERENCES user (email) ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (productID) REFERENCES product (id) ON UPDATE CASCADE ON DELETE CASCADE
        );

        create table IF NOT EXISTS favoriteCoordination
        (
            userEmail      VARCHAR(64),
            coordinationID INT,
            PRIMARY KEY (userEmail, coordinationID),
            FOREIGN KEY (userEmail) REFERENCES user (email) ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (coordinationID) REFERENCES coordination (id) ON UPDATE CASCADE ON DELETE CASCADE
        );

        create table IF NOT EXISTS article
        (
            id             INT PRIMARY KEY AUTO_INCREMENT,
            name           NVARCHAR(128)  NOT NULL,
            tag            NVARCHAR(128)  NOT NULL,
            tag_en         NVARCHAR(128)  NOT NULL,
            description    NVARCHAR(1024) NOT NULL,
            description_en NVARCHAR(1024) NOT NULL
        );

        create table IF NOT EXISTS articleImage
        (
            articleID INT,
            imageID   INT,
            PRIMARY KEY (articleID, imageID)
        );
	`, (err, result) => {
		res.send(result)
	})
})

router.get("/clear", (req, res) => {
	connection.query("drop table articleImage, article;" +
		"drop table favoriteCoordination, favoriteProduct;" +
		"drop table product, coordination, user", (err, result) => {
		res.send(result)
	})
})

router.get("/product/clear", (req, res) => {
	connection.query("delete from product", (err, result) => {
		res.send(result)
	})
})

router.get("/coordination/clear", (req, res) => {
	connection.query("delete from coordination", (err, result) => {
		res.send(result)
	})
})

router.get("/article/clear", (req, res) => {
	connection.query("delete from article", (err, result) => {
		res.send(result)
	})
})

module.exports = router
