import sys
import requests
import data

import url as URL
from auth import signin, signout
from get_favorite_style import getStylePreference

def is_json_key_present(json, key):
    try:
        buf = json[key]
    except KeyError:
        return False

    return True

if __name__ == '__main__':
    lastIndex = len(sys.argv)-1

    if lastIndex <= 1:
        result = []
        value = round(100/len(data.styleList), 1)
        for style in data.styleList:
            item = (style, value)
            result.append(item)

        print(result)

    else:
        # email, pw 말고 session 받아오도록..????
        email = sys.argv[lastIndex - 1]
        pw = sys.argv[lastIndex]

        signout()

        with requests.Session() as session:  # with문이 끝나면 session 닫아준다..?
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
                favoriteCoordinationList.append(res.get('coordinationID'))

        userStylePreference = getStylePreference(favoriteProductList, favoriteCoordinationList)

        print(userStylePreference)

        if __debug__:
            print('\n===== {}\'s style ranking ====='.format(user.get('name')))
            for i, style in enumerate(userStylePreference):
                print('{:>3}. {:>10} ({:>5}%)'.format(i + 1, style[0], style[1]))
            print('=================================')