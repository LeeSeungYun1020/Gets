from sklearn.naive_bayes import GaussianNB
from load_data import load_fit
import pickle
import joblib

def makeBodyShapeToFitModel(gender):
# gender(1: male, 2: female)

    X, y = load_fit(gender= gender)
    nb = GaussianNB()

    model = nb.fit(X, y)

    saved_model = pickle.dumps(model)

    if gender == 1:
        gender_str = 'male'
    elif gender == 2:
        gender_str = 'female'

    saved_name = 'bodyShapeToFitModel_{}.pkl'.format(gender_str)
    joblib.dump(model, saved_name)

    print('{} is saved'.format(saved_name))

#makeBodyShapeToFitModel(1) # male
#makeBodyShapeToFitModel(2) # female

'''
X_train = X
y_train = y
X_test = X
y_test = y

model = nb.fit(X_train, y_train)
y_pred = nb.fit(X_train, y_train).predict(X_test)
print("Number of mislabeled points out of  a total %d points : %d" % (X_test.shape[0], (y_test != y_pred).sum()))
'''