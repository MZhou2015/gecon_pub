import random
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

# 加载模型
with open("d:/tmodel", "rb") as f:
    model = pickle.load(f)

# 生成新的数据集
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

# 再训练模型50次
for i in range(3):
    model.fit(X_train, y_train)

# 在测试集上进行预测
y_pred = model.predict(X_test)

# 计算模型的准确率
accuracy = accuracy_score(y_test, y_pred)
print("模型的准确率为：", accuracy)

# 将模型保存回原文件
with open("d:/tmodel", "wb") as f:
    pickle.dump(model, f)