import requests
import url as URL
from data import StyleList, StyleName

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

    if __debug__:
        print('favoriteProductList\n: {}\n'.format(favoriteProductList))
        print('favoriteCoordinationList\n: {}\n'.format(favoriteCoordinationList))

    # 선호 제품보다 선호 코디에 가중치를 더 많이 준다.
    productWeight = 1
    coordinationWeight = 10


    # 찜 제품 목록에서 점수를 구한다. ############################3
    if __debug__:
        print('\n== favorite product analysis ==')

    for productID in favoriteProductList:
        res = requests.get(URL.product_url + str(productID)).json()
        style = res.get('style')

        if __debug__:
            print('{:>5} : {:<10} \t-> {}'.format(productID, style, oneHotDecoder(style)))

        for code in oneHotDecoder(style):
            index = StyleList.index(StyleName[code])
            scoreList[index] += productWeight

    if __debug__:
        print('\nscoreList: {}'.format(scoreList))


    # 찜 코디 목록에서 점수를 구한다. #################################
    if __debug__:
        print('\n== favorite coordination analysis ==')

    for coordinationID in favoriteCoordinationList:
        url = URL.coordination_url + str(coordinationID)
        res = requests.get(url).json()
        style = res.get('style')

        if __debug__:
            print('{:>5} : {:<10} \t-> {}'.format(coordinationID, style, oneHotDecoder(style)))

        for code in oneHotDecoder(style):
            index = StyleList.index(StyleName[code])
            scoreList[index] += coordinationWeight

    if __debug__:
        print('\nscoreList: {}'.format(scoreList))


    # 합이 100이 되도록 값을 변환한다. ###############################3
    s = sum(scoreList)
    if __debug__:
        print('sum: {}'.format(s))

    percentageList = []
    if s==0: # 찜제품, 찜코디 하나도 없는 경우
        value = round(100/len(StyleList), 1)
        for i in range(len(StyleList)):
            percentageList.append(value)
    else:
        for score in scoreList:
            per = round(score / s * 100, 1)
            percentageList.append(per)

    if __debug__:
        print('percentageList: {}\n'.format(percentageList))


    # 결과값을 반환하기 위해 형변환 ######################################3
    result = {}
    for i, percentage in enumerate(percentageList):
        result[StyleList[i]] = percentage


    return result
