import requests
from url import coordination_url
from get_fit import getFit, fitDecoder

if __name__ == '__main__':
    i = 0 # 요청할 coordination ID
    while True:
        i += 1

        response = requests.get(coordination_url + str(i)).json()

        if not response.get('result'):
            break

        #print('======== [{}] ========'.format(i))
        #print(response)

        fit = getFit(response)
        #print('fit : {} <-- {}'.format(fit, fitDecoder(fit)))
        print('{}\t{}'.format(response.get('id'), fit))





