import sys
import requests

import url as URL
from auth import signin, signout
from get_favorite_style import getStyleRanking

def is_json_key_present(json, key):
    try:
        buf = json[key]
    except KeyError:
        return False

    return True

if __name__ == '__main__':
    # ================================
    lastIndex = len(sys.argv)-1
    email   = sys.argv[lastIndex-1]
    pw      = sys.argv[lastIndex]
    # ================================
    # email, pw 말고 session 받아오도록..????

    signout()

    with requests.Session() as session: # with문이 끝나면 session 닫아준다..?
        with signin(session, email, pw) as response:
            cookies = response.cookies
            headers = session.headers

            user = session.get(URL.user_url).json()

            if __debug__:
                print('{:<10}: {}'.format('response', response.json()))
                print('{:<10}: {}'.format('user', user))
                print('{:<10}: {}'.format('cookies', cookies))
                print('{:<10}: {}'.format('headers', headers))
                print('\n==============================================\n')


    response = session.get(URL.favorite_product_url).json()

    favoriteProductList = []
    if not 'result' in response:
        for res in response:
            favoriteProductList.append(res['productID'])


    response = session.get(URL.favorite_coordination_url).json()

    favoriteCoordinationList = []
    if not 'result' in response:
        for res in response:
            print(res)
            favoriteCoordinationList.append(res.get('coordinationID'))

    userStyleRanking = getStyleRanking(favoriteProductList, favoriteCoordinationList)

    print(userStyleRanking)

    if __debug__:
        print('\n===== {}\'s style ranking ====='.format(user.get('name')))
        for i, style in enumerate(userStyleRanking):
            print('{:>3}. {:>10} ({:>5}%)'.format(i+1, style[0], style[1]))
        print('=================================')
















'''
def getUserFit(user):
    shoulder = user.get('shoulder')
    waist = user.get('waist')
    hip = user.get('hip')
    thigh = user.get('thigh')

    bodyShape = [shoulder, waist, hip, thigh]

    fit = getFit() # 기존 모델에 넣어서 결과값만 받아옴

    return fit
'''

