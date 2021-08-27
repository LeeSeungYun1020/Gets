import sys, requests, json
import auth
import url as URL
from get_favorite_style import getStylePreference


if __name__ == '__main__':
    if __debug__:
        print(sys.argv)

    lastIndex = len(sys.argv)-1

    session = requests.Session()

    favoriteProductList = []
    favoriteCoordinationList = []

    if lastIndex <= 1: # 로그인 안 했을 경우
        if __debug__:
            print('signInState = false')

    else: # 로그인 했을 경우
        if __debug__:
            print('signInState = true')

        email = sys.argv[lastIndex - 1]
        pw = sys.argv[lastIndex]

        auth.signout()

        with session:
            with auth.signin(session, email, pw) as response:
                cookies = response.cookies
                headers = session.headers
                user = session.get(URL.user_url).json()

                if __debug__:
                    print('{:<10}: {}'.format('response', response.json()))
                    print('{:<10}: {}'.format('user', user))
                    print('{:<10}: {}'.format('cookies', cookies))
                    print('{:<10}: {}'.format('headers', headers))
                    print('\n==============================================\n')


        # user의 찜 제품 목록을 가져온다. ##################################
        response = session.get(URL.favorite_product_url).json()

        if not 'result' in response: # 정상
            for res in response:
                favoriteProductList.append(res['productID'])


        # user의 찜 코디 목록을 가져온다.
        response = session.get(URL.favorite_coordination_url).json()

        if not 'result' in response: # 정상
            for res in response:
                favoriteCoordinationList.append(res.get('coordinationID'))


    # stylePrefence를 구한다. ######################################
    userStylePreference = getStylePreference(favoriteProductList, favoriteCoordinationList)
    result = json.dumps(userStylePreference) # json으로 변환

    print(result)

    if __debug__:
        if lastIndex <= 1: # 로그인 안 했을 경우
            userName = '김깡식이'
        else:
            userName = user.get('name')

        print('\n===== {}\'s style preference ====='.format(userName))
        for style in userStylePreference:
            print('{:>10} ({:>5}%)'.format(style, userStylePreference[style]))
        print('=================================')