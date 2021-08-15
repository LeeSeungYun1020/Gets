import requests
from url import product_url
from fit_data import productFit, coordinationFit, topFitList, bottomFitList


def getItemIDList(res):
    keys = ["outerID", "topID", "bottomID", "skirtID", "setID"]
    itemID_list = []

    for key in keys:
        itemID_list.append(res[key])

    return itemID_list

def isSingleValue(value, type):
    # type : {coordination, top, bottom, set}

    if type == 'coordination':
        values = coordinationFit.values()
    elif type == 'top' or type == 'set':
        values = topFitList
    elif type == 'bottom':
        values = bottomFitList
    else:
        values = coordinationFit.values()

    return (value in values)


def fitDecoder(fit):
    singleValuelist = []
    value = 1

    while fit>0:
        if fit%2 == 1:
            singleValuelist.append(value)
        fit = fit >> 1
        value = value << 1

    return singleValuelist


def getSetFit(setFit):
    # 상의, 하의 fit값 분리 후 getTopBottomFit()
    singleValue = fitDecoder(setFit)

    topFit = 0
    bottomFit = 0

    for value in singleValue:
        if value in topFitList:
            topFit |= value
        if value in bottomFitList:
            bottomFit |= value

    #print('{} -> {}, {}'.format(setFit, topFit, bottomFit))

    return topFit, bottomFit

def getTopBottomFit(topFit, bottomFit):
    fit = 0

    for t in fitDecoder(topFit):
        for b in fitDecoder(bottomFit):
            tmp = coordinationFit[(t, b)]
            fit |= tmp

    return fit


def getItemFit(resCoordination):
    types = ["outer", "top", "bottom", "skirt", "set"]

    itemIDList = getItemIDList(resCoordination)

    i = 0
    for item in itemIDList:
        resProduct = requests.get(product_url + str(item)).json()

        if resProduct.get('result'):
            print('{}: '.format(types[i]), end='')
            print(resProduct.get('fit'))
        i += 1


    print('==============')


def getProductFitList(itemIDList):
    result = []

    for id in itemIDList:
        if id == 0:
            result.append(0)
        else:
            res = requests.get(product_url + str(id)).json()
            result.append(res.get('fit'))

    return result

def getFit(res):
    # [outer, top, pants, skirt, set]
    itemIDList = getItemIDList(res)
    itemFitList = getProductFitList(itemIDList)

    #print('itemIDList : {}'.format(itemIDList))
    #print('itemFitList : {}'.format(itemFitList))

    topFit = 0
    bottomFit = 0

    if itemFitList[4] != 0: # set
        topFit, bottomFit = getSetFit(itemFitList[4])

    if itemFitList[1] != 0: # top
        topFit |= itemFitList[1]
    if itemFitList[2] | itemFitList[3] != 0: # pants or skirt
        bottomFit |= (itemFitList[2] | itemFitList[3])

    if itemFitList[0] != 0: # outer
        topFit = itemFitList[0]

    fit = getTopBottomFit(topFit, bottomFit)
    return fit