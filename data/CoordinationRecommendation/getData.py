import requests
import url as URL
from data import Season

def getSeason(): # 현재 날씨를 가져온다. ######################
    latitude = 35.1304075
    longitude = 129.092138

    data = {
        'latitude': latitude,
        'longitude': longitude
    }

    response = requests.post(URL.weather_url, data=data).json()
    tem = int(response.get('tem'))

    season = 0

    if tem > 17 and tem < 26:
        season += Season['spring']

    if tem > 22:
        season += Season['summer']

    if tem > 11 and tem < 26:
        season += Season['fall']

    if tem < 9:
        season += Season['winter']

    if __debug__:
        print('getSeason(): {}'.format(season))

    return season