# 导入必要的库
import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib

# 加载模型  ########36
clf = joblib.load('d:/pmodel')

# 测试模型
test_data = []
for i in range(100):
    x1 = np.random.randint(1, 31)
    x2 = np.random.randint(1, 31)
    label = 1 if x1 == x2 else 0
    test_data.append([x1, x2, label])

# 划分特征和标签
test_data = np.array(test_data)
X_test, y_test = test_data[:, :-1], test_data[:, -1]

# 预测
y_pred = clf.predict(X_test)

# 输出准确率
accuracy = np.sum(y_pred == y_test) / len(y_test)
print("Accuracy:", accuracy)

# 预测新数据
X_new = np.array([[10, 10], [20, 30],[19,19], [5, 7],[6,6]])
y_pred = clf.predict(X_new)
print(y_pred)