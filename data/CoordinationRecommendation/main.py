import sys
import requests
import random
import url as URL
from getScore import getCoordinationScore
from getData import getSeason
from ast import literal_eval

if __name__ == '__main__':
    number = int(sys.argv[1])

    if __debug__:
        print('number: {}'.format(number))

    data_string = ''
    for argv in sys.argv[2:]:
        data_string += ' ' + argv
    data = literal_eval(data_string[1:])

    data['season'] = getSeason()

    if __debug__:
        print(data)

    gender = data['gender']


    # 성별로 필터링하여 코디 리스트를 가져온다. ############################
    url = URL.coordination_gender_url + str(gender)
    if __debug__:
        print(url)
    response = requests.get(url).json()

    if __debug__:
        print(response)


    # 코디별 점수를 구한다. ###########################################
    coordinationScoreList = []

    for res in response:
        if __debug__:
            print(res)

        score = getCoordinationScore(res, data)

        item = (res.get('id'), score)
        coordinationScoreList.append(item)

    if __debug__:
        print('before sort by score')
        print(coordinationScoreList)
        print()

    # score를 기준으로 내림차순 정렬한다. ###############################
    coordinationScoreList.sort(key=lambda x: x[1], reverse=True)

    if __debug__:
        print('after sort by score')
        print(coordinationScoreList)
        print()

    # 상위 {candidateNum}개 코디의 ID를 구한다. ################################
    candidateNum = number * 2
    if candidateNum > len(coordinationScoreList):
        candidateNum = len(coordinationScoreList)


    candidateList = []
    for i in range(candidateNum):
        candidateList.append(coordinationScoreList[i][0])

    if __debug__:
        print('candidateList: {}'.format(candidateList))

    # number 값 조정
    if number > len(candidateList):
        number = len(candidateList)

    if __debug__:
        print('\n=======================================')
        print('number: {}'.format(number))

    choiceList = random.sample(candidateList, number)
    result = '{}'.format(choiceList)[1:-1]

    if __debug__:
        print('choiceList: {}'.format(choiceList))

    print(result) # id 리스트를 반환하고 코디 정보는 node에서 mysql로 구함
