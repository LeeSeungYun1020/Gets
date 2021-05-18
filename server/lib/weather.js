
// 위도 경도를 기상청 x, y좌표로 변경
function conversion(latitude, longitude){
    const deg_rad = Math.PI / 180.0
    const re = 6371.00877 / 5.0
    const slat1 = 30.0 * deg_rad
    const slat2 = 60.0 * deg_rad
    const olon = 126.0 * deg_rad
    const olat = 38.0 * deg_rad

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
    ro = re * sf / Math.pow(ro, sn)

    let ra = Math.tan(Math.PI * 0.25 + latitude * deg_rad * 0.5)
    ra = re * sf / Math.pow(ra, sn)
    let theta = longitude * deg_rad - olon
    if (theta > Math.PI) theta -= 2.0 * Math.PI
    if (theta < -(Math.PI)) theta += 2.0 * Math.PI
    theta *= sn
    let x = ra * Math.sin(theta) + 210 / 5.0
    let y = (ro - ra * Math.cos(theta)) + 675 / 5.0
    return {x: parseInt(x + 1.5, 10), y: parseInt(y + 1.5, 10)}
}
// 동네 예보 조회 일자
function getDateString(date){
    let month = date.getMonth() + 1
    if(month < 10)
        month = '0' + month
    let day = date.getDate()
    if(day < 10)
        day = '0' + day
    return `${date.getFullYear()}${month}${day}`
}
// 동네 예보 조회 시간
function getNearestTimeString(hour){
    // 동네 예보는 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300만 가능
    let time
    if (hour < 2)
        time = '2300'
    else if (2 <= hour && hour < 5)
        time = '0200'
    else if (5 <= hour && hour < 8)
        time = '0500'
    else if (8 <= hour && hour < 11)
        time = '0800'
    else if (11 <= hour && hour < 14)
        time = '1100'
    else if (14 <= hour && hour < 17)
        time = '1400'
    else if (17 <= hour && hour < 20)
        time = '1700'
    else if (20 <= hour && hour < 23)
        time = '2000'
    else if (23 <= hour)
        time = '2300'
    return time
}
// 받아온 날씨 데이터 출력
function printWeatherData(json, isSet){
    if (isSet == undefined)
        isSet = [false, false, false, false, false, false]
    let type = ['POP', 'PTY', 'SKY', 'REH', 'TMX', 'TMN']
    let state = false
    for(let i = 0; i < 100 && state == false; i++){
        try{
            let category = json.response.body.items.item[i].category
            let value = json.response.body.items.item[i].fcstValue
            for(let j in type){
                if (!isSet[j] && category == type[j]){
                    isSet[j] = true
                    let element = document.getElementById(type[j])
                    element.innerHTML += convertWeatherData(category, value)
                }
            }
        } finally {
            for(let k in isSet){
                if (!isSet[k])
                    break
                else if (k == isSet.length - 1)
                    state = true
            }
        }
    }
    return [state, isSet]
}
// 날씨 데이터 변환
function convertWeatherData(category, value){
    const ptyValue = ['없음', '비', '비/눈', '눈', '소나기']
    const skyValue = ['없음', '맑음', '구름조금', '구름많음', '흐림']
    if(category == 'POP' || category == 'REH')
        return value += '%'
    else if(category == 'TMX' || category == 'TMN')
        return value += '°C'
    else if(category == 'PTY')
        return ptyValue[value]
    else if(category == 'SKY')
        return skyValue[value]
    else
        return ''
}

exports.conversion = conversion
exports.getDateString = getDateString
exports.getNearestTimeString = getNearestTimeString