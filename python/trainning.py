from sklearn.linear_model import LogisticRegression
import numpy as np
import joblib

# Train the model as before
clf = joblib.load('d:/pmodel')
new_train_data = []
for i in range(8000):
    x1 = np.random.randint(1, 31)
    x2 = np.random.randint(1, 31)
    label = 1 if x1 == x2 else 0
    new_train_data.append([x1, x2, label])
# Split the features and labels
new_train_data = np.array(new_train_data)
X_train, y_train = new_train_data[:, :-1], new_train_data[:, -1]

clf.fit(X_train, y_train)

# Save the trained model back to file
joblib.dump(clf, 'd:/pmodel')
print("\n Trained 8000 time . ")