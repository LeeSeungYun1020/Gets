import sys, os
import numpy as np
import joblib

path = os.path.dirname(__file__) + '/'

def getMaleFit(body_shape):
    saved_name = path + 'bodyShapeToFitModel_male.pkl'
    model = joblib.load(saved_name)

    fit_pred = model.predict(body_shape)[0]

    print(fit_pred, end='')
    sys.stdout.flush()

def getFemaleFit(body_shape):
    saved_name = path + 'bodyShapeToFitModel_male.pkl'
    model = joblib.load(saved_name)

    fit_pred = model.predict(body_shape)[0]

    print(fit_pred, end='')
    sys.stdout.flush()


if __name__ == '__main__':
    ###################################################
    gender      = int(sys.argv[1])  # 성별 (1: male, 2: female)
    shoulder    = int(sys.argv[2])  # 체형 중 어깨
    waist       = int(sys.argv[3])  # 체형 중 허리
    hip         = int(sys.argv[4])  # 체형 중 엉덩이
    thigh       = int(sys.argv[5])  # 체형 중 허벅지
    ###################################################
    body_shape = np.array([[shoulder, waist, hip, thigh]])

    if gender == 1:
        getMaleFit(body_shape)
    elif gender ==2:
        getFemaleFit(body_shape)