import requests
from url import signout_url, signin_url

def signin(session, email, pw): # 로그인
    data = {
        'email': email,
        'pw': pw
    }

    return session.post(signin_url, data=data)


def signout(): # 로그아웃
    return requests.get(signout_url)