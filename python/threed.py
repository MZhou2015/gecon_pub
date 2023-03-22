import random
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

# 生成数据集
data = []
labels = []
for i in range(1, 48):
    # 三个数一样
    data.append([i, i, i])
    labels.append(1)
    # 三个数连续
    data.append([i, i+1, i+2])
    labels.append(2)
    # 其他情况
    data.append([random.randint(1, 50), random.randint(1, 50), random.randint(1, 50)])
    labels.append(0)

# 将数据集划分为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, random_state=42)

# 训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 在测试集上进行预测
y_pred = model.predict(X_test)

# 计算模型的准确率
accuracy = accuracy_score(y_test, y_pred)
print("模型的准确率为：", accuracy)

# 生成新的数据进行预测
new_data = [[1, 2, 3], [3, 3, 3], [50, 49, 48], [10, 11, 12]]
new_labels = model.predict(new_data)

# 显示预测结果
for i in range(len(new_data)):
    print("输入数据：", new_data[i], "预测结果：", new_labels[i])

# 将模型保存到本地
with open("d:/tmodel", "wb") as f:
    pickle.dump(model, f)