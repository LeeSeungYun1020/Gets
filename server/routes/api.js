const express = require('express');
const router = express.Router();
const got = require('got');
const weather = require('../lib/weather')
// API Center
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render("api")
});
// 로그인
router.post("/signin", (req, res) => {
  const id = req.body.id
  const pw = req.body.pw
  res.send(req.body.id)
})
// 회원가입 - 이메일 중복 확인
router.post("/signup/check", (req, res) => {
  const email = req.body.email
})
// 회원가입 - 기본 정보 입력
router.post("/signup/basic", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const phone = req.body.phone
  const year = req.body.year
  const month = req.body.month
  const day = req.body.date
  const address = req.body.address
  const addressDetail = req.body.addressDetail
})
// 회원가입 - 추가 정보 입력
router.post("/signup/info", (req, res) => {
  const gender = req.body.gender
  const height = req.body.height
  const weight = req.body.weight
  const topSize = req.body.top_size
  const bottomSize = req.body.bottom_size
  const style = req.body.style
})
// 날씨
router.get("/weather", (req, res) => {
  const key = 'QlJXfpDq9oWm1PKEG0hZBbX06NXjih1QpY1ZqHXEWqx4aJQ2eqbU1dx4spZGGCR%2FLWwjq9RSXKM0UHFgGjeNTw%3D%3D'
  const today = new Date()
  let hour = today.getHours()
  if(hour < 2)
    today.hours -= 2
  const date = weather.getDateString(today)
  const time = weather.getNearestTimeString(hour)
  const pos = weather.conversion(35.1256193, 129.0903112)
  let url = `http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=${key}&pageNo=1&numOfRows=100&dataType=JSON&base_date=${date}&base_time=${time}&nx=${pos.x}&ny=${pos.y}`
  console.log(url);

  (async () => {
    try {
      const response = await got(url);
      const json = JSON.parse(response.body)
      if (json.response.header.resultCode !== '00')
        res.send({error: true})
      res.send(json.response.body.items.item)
    } catch (error) {
      res.send({error: true})
    }
  })();
})
module.exports = router