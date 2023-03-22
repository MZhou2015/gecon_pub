# 导入必要的库
import numpy as np
from sklearn.linear_model import LogisticRegression
#import joblib
import pickle

# 加载模型
with open("d:/tmodel", "rb") as f:
    model = pickle.load(f)

# 测试模型
# 预测新数据
X_new = [[14,14,14], [20,21, 22],[19,32,17], [8,8,8],[6,15,6]]
y_pred = model.predict(X_new)
print(y_pred)