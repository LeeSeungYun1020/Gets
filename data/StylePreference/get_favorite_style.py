import requests
import math
import url as URL
from data import styleList, styleCode

def oneHotDecoder(fit):
    singleValuelist = []
    value = 1

    while fit>0:
        if fit%2 == 1:
            singleValuelist.append(value)
        fit = fit >> 1
        value = value << 1

    return singleValuelist


def getStylePreference(favoriteProductList, favoriteCoordinationList):
    scoreList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    # 선호 제품보다 선호 코디에 가중치를 더 많이 준다.
    productWeight = 1
    coordinationWeight = 10

    if __debug__:
        print('favoriteProductList\n: {}\n'.format(favoriteProductList))
        print('favoriteCoordinationList\n: {}\n'.format(favoriteCoordinationList))

    if __debug__:
        print('\n== favorite product analysis ==')

    for productID in favoriteProductList:
        url = URL.product_url + str(productID)
        res = requests.get(url).json()
        style = res.get('style')

        if __debug__:
            print('{:>5} : {:<10} \t-> {}'.format(productID, style, oneHotDecoder(style)))

        for style in oneHotDecoder(style):
            index = int(math.log2(style))
            scoreList[index] += productWeight

    if __debug__:
        print('\n== favorite coordination analysis ==')

    for coordinationID in favoriteCoordinationList:
        url = URL.coordination_url + str(coordinationID)
        res = requests.get(url).json()
        style = res.get('style')

        if __debug__:
            print('{:>5} : {:<10} \t-> {}'.format(coordinationID, style, oneHotDecoder(style)))

        for style in oneHotDecoder(style):
            index = int(math.log2(style))
            scoreList[index] += coordinationWeight

    s = sum(scoreList)

    if __debug__:
        print('\nscoreList: {}'.format(scoreList))
        print('sum: {}'.format(s))

    percentageList = []
    if s==0: # 찜제품, 찜코디 하나도 없는 경우
        per = round(100/len(styleList), 1)
        for i in range(len(styleList)):
            percentageList.append(per)
    else:
        for score in scoreList:
            per = round(score / s * 100, 1)
            percentageList.append(per)

    if __debug__:
        print('percentageList: {}\n'.format(percentageList))

    result = []
    for i in range(len(percentageList)):
        element = (styleList[i], percentageList[i])
        result.append(element)

    result.sort(key=lambda x:x[1], reverse=True) # percentage를 기준으로 내림차순 정렬

    return result
