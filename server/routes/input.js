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
		const parser = fs
		.createReadStream(`./coordination/coordination.csv`)
		.pipe(parse({}))
		for await(const record of parser) {
			const id = record[1]
			const outerID = record[2] || 0
			const outerImageID = record[3] || 0
			const topID = record[4] || 0
			const topImageID = record[5] || 0
			const top2ID = record[6] || 0
			const top2ImageID = record[7] || 0
			const bottomID = record[8] || 0
			const bottomImageID = record[9] || 0
			const skirtID = record[10] || 0
			const skirtImageID = record[11] || 0
			const setID = record[12] || 0
			const setImageID = record[13] || 0
			const shoesID = record[14] || 0
			const shoesImageID = record[15] || 0
			const bagID = record[16] || 0
			const bagImageID = record[17] || 0
			const hatID = record[18] || 0
			const hatImageID = record[19] || 0
			const title = record[20]
			const style = coordination.getStyleCode(record[21])
			const gender = coordination.getGenderCode(record[22])
			const age = coordination.getAgeCode(record[23])
			const season = coordination.getSeasonCode(record[24])
			const fit = record[25] //coordination.getFitCode(record[23])
			const price = record[26]
			const imageID = record[27] //record[27].split(".")[0]
			//console.log(fit)
			connection.query(`insert into coordination
                              (id, title, outerID, outerImageID, topID, topImageID, top2ID, top2ImageID,
                               bottomID, bottomImageID, skirtID, skirtImageID,
                               setID, setImageID, shoesID, shoesImageID, bagID, bagImageID, hatID, hatImageID, style,
                               gender, age, season, fit, price, imageID)
                              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[id, title, outerID, outerImageID, topID, topImageID, top2ID, top2ImageID, bottomID, bottomImageID, skirtID, skirtImageID,
					setID, setImageID, shoesID, shoesImageID, bagID, bagImageID, hatID, hatImageID, style, gender, age, season, fit, price, imageID],
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
                "미니멈은 최소의, 극히 미소한이란 뜻으로, 아주 극도로 심플함을 추구한 패션 전반을 가리킨다. \n\n미니멀 모드나 미니멀 룩이라고도 하여, 장식적인 패션표현의 대극에 있다고 할 수 있다.\n\n한마디로 장식적인것 없이 깔끔한 것.", \
                "“Minimum” means minimal, extremely minimal, and refers to the overall fashion that pursues extremely simple simplicity. \n\nAlso called minimal mode or minimal look, it can be said that it is at the apex of decorative fashion expression. \n\nIn other words, it is neat without being decorative." \
               ); \
        insert into article \
        values (2, "casual", \
                "편함, 일상, 익숙함", \
                "comfort, daily, familiarity", \
                "T.P.O(Time, Place, Occasion)에서 크게 벗어나지 않는 한도 내에서 부담 없이 입을 수 있는 자연스럽고 편한 느낌의 의류. \n\n가격대도 저가부터 고가까지 넓게 퍼져 있어서 자기 경제 사정에 맞춰 구매 가능하다. \n\n달리 말하자면, 상황에 어긋나지만 않으면 입고 싶은 것을 아무거나 매칭하여 편하게 입으면 그것이 케주얼 웨어가 된다.", \
                "Natural and comfortable clothing that can be worn casually within the limits of T.P.O (Time, Place, Occasion). \n\nThe price range is also widely spread from low to high, so you can purchase it according to your economic situation. \n\nIn other words, as long as it doesn't go against the situation, if you wear it comfortably by matching anything you want to wear, it becomes casual wear." \
               ); \
        insert into article \
        values (4, "campus", \
                "캐주얼, 스포티, 새내기", \
                "casual, sporty, newbie", \
                "캠퍼스룩은 말그대로 캠퍼스 즉 학교에서 입을만한 패션을 말하며 요즘 캠퍼스룩의 기본 베이스는 바로 ‘꾸안꾸’이다. \n\n일명 놈코어(Norm Core), 표준을 뜻하는 ‘놈(norm)’과 핵심을 뜻하는 ‘코어(core)’의 합성어로 평범함(놈)을 추구하면서도 포인트(코어)가 있는 스타일을 말한다. \n\n그중에서도 요즘은 캐주얼과 스포티즘 룩(Sportism Look)에 쓰이는 아이템들을 활용한 스타일들이 많이 보이고 있는 추세이다.", \
                "Campus look literally refers to fashion that can be worn on campus, that is, at school. \n\nNorm Core, a compound word of 'norm' meaning standard and 'core' meaning core, refers to a style with a point (core) while pursuing normality (norm). \n\nAmong them, there are a lot of styles using items used for casual and sportism look these days."); \
        insert into article \
        values (8, "street", \
                "젊음, 길거리, 트렌드", \
                "young, street, trend", \
                "‘스트리트 패션(Street Fashion)’ 말 그대로 길거리 사람들의 패션을 일컫는 말이다. \n\n그리고 거리의 유행 현상/ 패션 트렌드를 말하기도 한다. \n\n젊은이들의 길거리 유행으로 시작되는 패션 분야이기 때문에 정의는 상당히 애매하다. \n\n또한 유행을 따라가기 때문에 어느 시점에서는 어떤 아이템이 스트리트 패션이라고 불리다가 그렇지 않게 되는 경우도 있고, 갑자기 스트릿 패션으로 불릴 수도 있다. \n\n그래서 다양한 의미로 해석할 수 있고 그에 따라 다양한 종류의 룩이 파생된다.",
                "“Street Fashion” literally refers to the fashion of street people. \n\nThey also talk about street fashion/fashion trends. \n\nThe definition is quite ambiguous because it is a fashion field that starts with young people's street fashion. \n\nAlso, because it follows the trend, at some point an item is called street fashion, and sometimes it is not, or suddenly it is called street fashion. \n\nTherefore, it can be interpreted in various meanings, and various kinds of looks are derived accordingly." \
               ); \
        insert into article \
        values (16, "rock_chic", \
                "터프, 시크, 섹시", \
                "tough, chic, sexy", \
                "락(Rock)과 시크(Chic)의 합성어로 자유분방하고 터프한 느낌을 주는 스타일을 칭하는 용어다. \n\n보통은 거칠고 투박한 느낌이지만 뒤에 붙어 있는 ‘시크’의 영향으로 도도하고 멋진 이미지까지 포함한다. \n\n격동적 변화의 시기였던 70년대를 주름잡았던 락은 본능적이고 야성적인 매력을 느낄 수 있는 음악이었다. \n\n그와 같이 락시크 스타일 또한 거칠면서도 세련되고 섹시한 스타일을 동시에 추구하는 패션계의 까칠하고 영민한 반항아 격이다.", \
                "It is a compound word of rock and chic, and refers to a style that gives a free-spirited and tough feeling. \n\nIt usually feels rough and crude, but it also includes a pompous and cool image due to the influence of the 'chic' attached to the back. \n\nRock, which dominated the 70s, a period of turbulent change, was music that could feel instinctive and wild charm. \n\nAs such, the rock chic style is also a tough and agile rebel in the fashion world that pursues a rough, sophisticated and sexy style at the same time." \
               ); \
        insert into article \
        values (32, "amekaji", \
                "아메리칸, 워크 웨어, 복고", \
                "american, work wear, retro", \
                "아메카지란 아메리칸 캐주얼(American Casual)을 일본식으로 줄인 말로, 아메카지는 20세기 중반 미국의 워크웨어 룩이 일본의 복고풍과 결합하면서 캐주얼하게 재해석 된 스타일을 의미한다. \n\n아메카지 룩의 특징은 노동자들만 입는 워크웨어와는 달리 사무직도 입을 수 있게 변형된 스타일이다. \n\n때문에 옷의 원단도 워크웨어 대비 한층 더 부드러워지고 통은 그대로 넓지만 동양인의 체격에 맞게 기장이 짧아지고 봉제선들이 전체적으로 좁아진다.", \
                "Amekaji is a Japanese abbreviation for American Casual, and American casual style refers to a casual reinterpretation of mid-20th century American workwear look combined with Japanese retro style. \n\nThe distinctive feature of the American casual look is that it is a style modified to be worn by office workers, unlike workwear worn only by workers. \n\nTherefore, the fabric of the clothes is also softer than that of the workwear, and the barrel is wide as it is, but the length is shortened to fit the physique of an Asian, and the seams are narrow overall." \
               ); \
        insert into article \
        values (64, "city_boy", \
                "오버사이즈, 성숙, 소년 감성", \
                "oversize, mature, boy sensibility", \
                "시티보이룩은 기본적으로 아메카지(아메리칸 캐주얼)라는 큰 카테고리 안에서 세부적으로 파생된 스타일의 한 부분이라고 말할 수 있다. \n\n실루엣적으로 봤을 때는 크지만 결코 크지않은 그 애매한 경계의 자연스러운 오버사이징 핏이 압권이다.", \
                "It can be said that the city boy look is basically a part of a style derived in detail within the large category of American casual. \n\nFrom a silhouette perspective, the natural oversizing fit with the ambiguous boundary that is large but not large at all is the highlight." \
               ); \
        insert into article \
        values (128, "office", \
                "클래식, 모던, 깔끔", \
                "classic, modern, clean", \
                "오피스룩(Office Look), 말 그대로 오피스(사무실)에서 입는 옷이라고 이해할 수 있다. \n\n보통 클래식한 정장부터 모던한 세미 정장을 많이 착용하지만 요즘은 자유로운 분위기의 회사가 많아져 나름 깔끔한 느낌의 패션이라면 충분이 오피스룩으로 착용가능하다.", \
                "Office Look, literally, can be understood as clothes worn in the office. \n\nI usually wear a lot of classic suits to modern semi suits, but these days, there are a lot of companies with a free atmosphere." \
               ); \
        insert into article \
        values (256, "sexy_glam", \
                "섹시, 매혹, 볼륨", \
                "sexy, fascination, volume", \
                "“매혹적인”이란 뜻을 가진 글래머러스(Glamorous)란 말에 어원을 둔 패션 스타일을 칭하는 말로써, 상의는 볼륨감 있게, 하의는 슬림하게 입어 글래머러스한 Y자 실루엣을 만드는 것이 관건. \n\n섹시그램 룩은 결국 섹시(Sexy)와 매혹적인(글래머러스)를 통합한 섹시하면서도 매혹적인 스타일을 나타내는 신체를 부각할 수 있는 스타일을 말한다.", \
                "It is a term referring to a fashion style that has its origins in the word glamorous, which means “glamorous”. \n\nThe sexygram look is a style that can highlight the body, which is a sexy yet seductive style that combines sexy and seductive (glamorous)." \
               ); \
        insert into article \
        values (512, "feminine", \
                "우아함, 여성스러움", \
                "elegance, femininity", \
                "페미닌은 ‘여성스러운’의 의미를 담고 있는 말로 스타일이나 성격에 있어서 정교하고 부드러우며 무겁지 않을 때 이 표현을 사용한다. \n\n패션에서 말하는 페미닌 스타일은 여성스러우면서 우아한 분위기를 연출하는 스타일을 말한다. \n\n둥근 어깨선, 부풀린 가슴, 잘록한 허리 등 인체의 곡선미를 살려서 나타내지만 일정한 형식은 없다. \n\n시대를 반영한 우아함이 포인트이다.", \
                "Feminin is a word that has the meaning of ‘feminine’ and is used when it is sophisticated, soft, and not heavy in style or personality. \n\nFeminine style in fashion refers to a style that creates a feminine and elegant atmosphere. \n\nThe curves of the human body, such as round shoulders, inflated chest, and narrow waist, are used to express the beauty of the body, but there is no specific form. \n\nElegance that reflects the times is the point." \
               ); \
        insert into article \
        values (1024, "lovely", \
                "사랑스러운, 여친룩, 데이트룩", \
                "date look, girl friend", \
                "원피스, 블라우스와 같은 풍성하면서 하늘하늘한 재질의 의류를 활용한 코디로써, 러블리한 느낌을 주는 코디 스타일링", \
                "Coordination styling that gives a lovely feeling by coordinating clothes made of rich and airy materials such as dresses and blouses." \
               ); \
		insert into articleImage values (2, 1); \
		insert into articleImage values (2, 2); \
		insert into articleImage values (2, 3); \
		insert into articleImage values (2, 4); \
		insert into articleImage values (4, 5); \
		insert into articleImage values (4, 6); \
		insert into articleImage values (4, 7); \
		insert into articleImage values (4, 8); \
		insert into articleImage values (8, 9); \
		insert into articleImage values (8, 10); \
		insert into articleImage values (8, 11); \
		insert into articleImage values (8, 12); \
		insert into articleImage values (32, 13); \
		insert into articleImage values (32, 14); \
		insert into articleImage values (32, 15); \
		insert into articleImage values (64, 16); \
		insert into articleImage values (64, 17); \
		insert into articleImage values (64, 18); \
		insert into articleImage values (64, 19); \
		insert into articleImage values (16, 20); \
		insert into articleImage values (16, 21); \
		insert into articleImage values (16, 22); \
		insert into articleImage values (16, 23); \
		insert into articleImage values (128, 24); \
		insert into articleImage values (128, 25); \
		insert into articleImage values (128, 26); \
		insert into articleImage values (128, 27); \
		insert into articleImage values (1024, 28); \
		insert into articleImage values (1024, 29); \
		insert into articleImage values (256, 30); \
		insert into articleImage values (256, 31); \
		insert into articleImage values (256, 32); \
		insert into articleImage values (256, 33); \
		insert into articleImage values (512, 34); \
		insert into articleImage values (512, 35); \
		insert into articleImage values (512, 36); \
		insert into articleImage values (512, 37); \
		insert into articleImage values (1, 38); \
		insert into articleImage values (1, 39); \
		insert into articleImage values (1, 40); \
		insert into articleImage values (1, 41); \
	`.trim(), (err, result) => {
		res.send(err || result)
	})
})

router.get("/ready", (req, res) => {
	connection.query(`
        create table IF NOT EXISTS user
        (
            email         VARCHAR(64) PRIMARY KEY,
            pw            VARCHAR(64)  NOT NULL,
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

        create table IF NOT EXISTS coordination
        (
            id            INT PRIMARY KEY AUTO_INCREMENT,
            title         VARCHAR(64),
            outerID       INT,
            outerImageID  INT,
            topID         INT,
            topImageID    INT,
            top2ID        INT,
            top2ImageID   INT,
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
            season        INT,
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
	connection.query("delete from article; delete from articleImage", (err, result) => {
		res.send(result)
	})
})

module.exports = router
