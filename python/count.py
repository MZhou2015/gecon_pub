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