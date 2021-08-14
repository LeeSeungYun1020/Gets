import numpy as np
import csv

def load_fit(gender):
    file_name = ''
    if gender == 1: # male
        file_name = 'data/fit_male.csv'
    elif gender == 2: # female
        file_name = 'data/fit_female.csv'

    print('load_fit(gender= {})'.format(gender))

    X_data = []
    y_data = []

    file = open(file_name, 'r', encoding='utf-8-sig')
    reader = csv.reader(file)

    for line in reader:
        tmp = []

        # x_data
        for i in line[:4]:
            tmp.append(int(i))
        X_data.append(tmp)

        # y_data
        for i in line[4:5]:
            y_data.append(int(i))
    file.close

    return np.array(X_data), np.array(y_data)




