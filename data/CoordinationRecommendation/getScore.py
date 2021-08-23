import math
import data

#====================================================
# weight (합이 1)
w_fit       = 0.3
w_age       = 0.1
w_season    = 0.1
w_style     = 0.5
#====================================================

def oneHotVector(encoded, len):
    vector = []

    for i in range(len):
        #vector.insert(0, encoded%2)
        vector.append(encoded%2)
        encoded = encoded >> 1

    return vector


def getEuclideanDistance(value, criteria):
    sum = 0
    for i, x in enumerate(criteria):
        if value[i] == x:
            sum += 1

    distance = math.sqrt((sum/len(criteria))*10000)
    return distance

#============================================================

def getAgeScore(coordiAge, userAge):
    return getEuclideanDistance(coordiAge, userAge)

def getSeasonScore(coordiSeason, userSeason):
    return getEuclideanDistance(coordiSeason, userSeason)

def getFitScore(coordiFit, userFit):
    return getEuclideanDistance(coordiFit, userFit)

def getStyleScore(coordiStyle, userStylePreference):
    sum = 0
    count = coordiStyle.count(1)
    for i, style in enumerate(data.StyleList):
        sum += coordiStyle[i] * userStylePreference[style]

    score = sum / count # 평균

    return score

#============================================================

def getCoordinationScore(coordi, userData):

    # coordination data (one-hot encoding)
    coordiFit           = oneHotVector(int(coordi.get('fit')), len(data.CoordinationFit))
    coordiAge           = oneHotVector(int(coordi.get('age')), len(data.Age))
    coordiSeason        = oneHotVector(int(coordi.get('weather')), len(data.Season))
    coordiStyle         = oneHotVector(int(coordi.get('style')), len(data.StyleList))

    # user data (one-hot encoding)
    userFit             = oneHotVector(int(userData.get('fit')), len(data.CoordinationFit))
    userAge             = oneHotVector(int(userData.get('age')), len(data.Age))
    userSeason          = oneHotVector(int(userData.get('season')), len(data.Season))
    userStylePreference = userData.get('stylePreference')

    # score (최대값 100)
    score_fit           = getFitScore(coordiFit, userFit) # 1
    score_age           = getAgeScore(coordiAge, userAge) # 1
    score_season        = getSeasonScore(coordiSeason, userSeason) # 1
    score_style         = getStyleScore(coordiStyle, userStylePreference) # 1

    if __debug__:
        print('{:>20}: {}'.format('coordiFit', coordiFit))
        print('{:>20}: {}'.format('userFit', userFit))
        print('{:>20}: {}'.format('score_fit', score_fit))
        print()
        print('{:>20}: {}'.format('coordiAge', coordiAge))
        print('{:>20}: {}'.format('userAge', userAge))
        print('{:>20}: {}'.format('score_age', score_age))
        print()
        print('{:>20}: {}'.format('coordiSeason', coordiSeason))
        print('{:>20}: {}'.format('userSeason', userSeason))
        print('{:>20}: {}'.format('score_season', score_season))
        print()
        print('{:>20}: {}'.format('coordiStyle', coordiStyle))
        print('{:>20}: {}'.format('userStylePreference', userStylePreference))
        print('{:>20}: {}'.format('score_style', score_style))
        print()

    score_total = score_fit * w_fit + score_age * w_age + score_season * w_season + score_style * w_style
    score_total = round(score_total, 2)
    if __debug__:
        print('{:>20}: {}'.format('score_total', score_total))
        print()

    return score_total