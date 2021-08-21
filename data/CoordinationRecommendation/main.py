import sys
import requests
import url as URL
import auth
import getData
from getScore import getCoordinationScore

# 기준점 이하의 코디는 잘라버리고
# 점수를 기반으로 랜덤 선택하도록 수정?

if __name__ == '__main__':
    lastIndex = len(sys.argv) - 1
    count = int(sys.argv[lastIndex])
    session = requests.Session()


    if lastIndex <= 2: # 로그인 안했을 경우 #########################################
        session = None

        style = int(sys.argv[lastIndex - 1])
        if style==None:
            style = getData.AllStyle

        if __debug__:
            print(style, count)


        # 데이터를 가져온다. ####################
        user = {
            'style': style,
        }
        userData = getData.getUserData(session, user)
        
        if __debug__:
            print('userData: {}'.format(userData))
        
    else: # 로그인 했을 경우 ########################################################
        # email, pw 말고 session 받아오도록..????
        email = sys.argv[lastIndex - 2]
        pw = sys.argv[lastIndex - 1]

        if __debug__:
            print(email, pw, count)

        auth.signout()

        with session:
            with auth.signin(session, email, pw) as response:
                # 로그인 정보를 확인한다. #############################
                cookies = response.cookies
                headers = session.headers
                user = session.get(URL.user_url).json()

                if __debug__:
                    print('{:<10}: {}'.format('response', response.json()))
                    print('{:<10}: {}'.format('user', user))
                    print('{:<10}: {}'.format('cookies', cookies))
                    print('{:<10}: {}'.format('headers', headers))

                    print('\n==============================================\n')

                # 데이터를 가져온다. #############################
                userData = getData.getUserData(session, user)

            if __debug__:
                print('\nuserData: {}'.format(userData))


    # 성별로 필터링하여 코디 리스트를 가져온다. ############################
    url = URL.coordination_gender_url + str(userData['gender'])
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

        score = getCoordinationScore(res, userData)

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
    
    
    # 상위 {count}개 코디의 ID를 구한다. ################################
    # count 값 조정
    if count > len(coordinationScoreList):
        count = len(coordinationScoreList)
    
    IDList = []
    for i in range(count):
        IDList.append(coordinationScoreList[i][0])

    if __debug__:
        print('\n=======================================')
        print('count: {}'.format(count))

    if __debug__:
        print('IDList: {}'.format(IDList))


    # ID를 사용하여 상위 {count}개의 코디 정보를 가져온다. #####################
    result = []
    for i, ID in enumerate(IDList):
        res = requests.get(URL.coordination_url + str(ID)).json()
        if __debug__:
            print('{:>3}. {}'.format(i+1, res))
        result.append(res)


    # 최종 결과값
    print(result)