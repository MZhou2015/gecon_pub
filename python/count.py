import chardet
with open('d:/save/mdoc.txt', 'rb') as f:
    content = f.read()
    encoding = chardet.detect(content)['encoding']

print("文件编码为：", encoding)

with open('d:/save/mdoc.txt', 'r',encoding='utf-8' ) as file:
    text = file.read()
    word_count = len(text.split())
    print("总共有 %d 个单词" % word_count)
    
str1="hello World"
sl = len(text) 
print(sl)
print(text)

import openpyxl
# 创建一个新的工作簿
workbook = openpyxl.Workbook()

# 选择默认的工作表
sheet = workbook.active

# 将B3和B4单元格分别赋值为45和69
sheet['B3'] = 45
sheet['B4'] = 69

# 保存工作簿
workbook.save('d:/save/test.xlsx')
# 打开工作簿
workbook = openpyxl.load_workbook('d:/save/test.xlsx')

# 选择默认的工作表
sheet = workbook.active

# 从B3和B4单元格分别获取值
a = sheet['B3'].value
b = sheet['B4'].value

# 计算a*b并打印结果
result = a * b
print(result)