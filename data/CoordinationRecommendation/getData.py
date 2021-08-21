import requests
import url as URL
import ast
from datetime import datetime
from data import Age, AllStyle, AllAge, AllFit, StyleList
from getScore import oneHotVector


def getAge(birthday): # 생일정보로 age를 구한다. ############
    if __debug__:
        print('getAge({})'.format(birthday))

    if birthday==None:
        age = AllAge

    else:
        currentYear = datetime.today().year # 현재 연도 가져오기
        birthYear = int(birthday.split('-')[0]) # 출생년도 추출

        tmp = int((currentYear - birthYear + 1) / 10) * 10
        if tmp < 10: tmp = 10 # 10살 미만이라면 10대
        if tmp > 50: tmp = 50 # 60살 이상이라면 50대

        age = Age[str(tmp)+'s']

        if __debug__:
            print('{} -> {}'.format(birthYear, age))

    return age


def getSeason(): # 현재 날씨를 가져온다. ######################3
    # TODO: 날씨 api에서 기온 정보 받아와서 기온으로 계절 결정하도록 수정
    season = 6 # 여름, 가을

    if __debug__:
        print('getSeason(): {}'.format(season))

    return season


def getStylePreference(session, style): # stylePreference를 구한다. ###################

    if session==None: # 로그인 안 했을 경우
        response = requests.get(URL.stylePreference_url).json()
    else: # 로그인 했을 경우
        response = session.get(URL.stylePreference_url).json()

    if __debug__:
        print(response)

    print(response.get('result'))
    if response.get('result'):
        result = {}
        for t in ast.literal_eval(response.get('data')):
            result[t[0]] = t[1]

        if __debug__:
            print(result)

    else:  # TODO: 에러 처리하기
        if __debug__:
            print('error: getPreference()')
        result = {}
        for style in StyleList:
            result[style] = 0


    # stylePreference에 style 정보를 적용한다. #######################
    if style == None: style = AllStyle
    styleVector = oneHotVector(style, len(StyleList))
    styleCount = styleVector.count(1)
    value = round(100 / styleCount, 1)

    ratio = (100 + 100) / 100

    for i, style in enumerate(StyleList):
        if styleVector[i] == 1:
            result[style] += value
        result[style] /= ratio

    if __debug__:
        print(result)


    return result


def getUserData(session, user):
    season = getSeason()  # 현재 계절

    gender = user.get('gender')
    if gender == None:
        gender = 3

    style = user.get('style')
    stylePreference = getStylePreference(session, style)  # (dictionary)

    if session==None:
        age = AllAge
        fit = AllFit
    else:
        birthday = user.get('birthday')
        age = getAge(birthday)

        if gender==3:
            fit = AllFit
            #raise Exception('bodyShapeToFit의 인수 gender의 값은 3이 될 수 없습니다!')
        else:
            shoulder = user.get('shoulder')
            waist = user.get('waist')
            hip = user.get('hip')
            thigh = user.get('thigh')

            if shoulder == None:
                shoulder = 2  # 보통
            if waist == None:
                waist = 2  # 보통
            if hip == None:
                hip = 2  # 보통
            if thigh == None:
                thigh = 2  # 보통

            query = 'gender={}&shoulder={}&waist={}&hip={}&thigh={}'.format(gender, shoulder, waist, hip, thigh)

            if __debug__:
                print('url: {}'.format(URL.fit_url + '?' + query))

            # bodyShapeToFit에서 json형식으로 결과값 보내도록 수정
            fit = requests.get(URL.fit_url + '?' + query).json()

    data = {
        'gender': gender,
        'fit': fit,
        'age': age,
        'season': season,
        'stylePreference': stylePreference
    }

    if __debug__:
        print(data)

    return data
