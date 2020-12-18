## Python-Foundation

#### Basic Operation

##### 字符串

###### 字符串运算

​	`字符串可以乘一个数字`

```python
>>> 3 * 'HELLO WORLD'
'HELLO WORLDHELLO WORLDHELLO WORLD'
```

​	`字符串直接相连`

```python
print("HELLO" "WORLD")
PS E:\web-code> & C:/py3.9/python.exe e:/web-code/python-code/11-26/01.py
HELLOWORLD
```

###### 字符串下标

​	`字符串下从0开始`

```python
name="王欢"
print(name[0])
PS E:\web-code> & C:/py3.9/python.exe e:/web-code/python-code/11-26/01.py
王
```

​	`如果下标为负的呢?`

```python
name="我爱你王欢"
print(name[-1])
PS E:\web-code> & C:/py3.9/python.exe e:/web-code/python-code/11-26/01.py
欢
```

​	`截取字符串`

```python
name="我爱你王欢"
print(name[0:2])	# 0:included	2:excluded
PS E:\web-code> & C:/py3.9/python.exe e:/web-code/python-code/11-26/01.py
我爱


name="我爱你王欢"
love = name[0:]
print(love)	# "我爱你王欢"

name="我爱你王欢"
love = name[:-1] # 其实就是 name[:(name.length)-1] = name[:4]
print(love)	# "我爱你王"
```



​	`格式化字符串`

```python
print("""
    HELLO WORLD
    HELLO WORLD
    HELLO WORLD
""")
# or
print('''
    HELLO WORLD
    HELLO WORLD
    HELLO WORLD
''')
```





#### Control Operator

##### while

```python
a = 10;
while a < 100:
    print(a)
    a+=1
```

##### if

```python
i = int(input("Please Input An Integer: "))
if i < 50:
    print("The integer you input is small than 50")
elif i < 100:
    print("The integer you input is small than 100")
else:
    print("I can't guess it ~~~")               
```

##### for

```python
words = ["cat","dog","dragon","bird"]
for animal in words:
    print(animal,len(animal))
```

##### 循环语句的else

> Loop statements may have an `else` clause; it is executed when the loop terminates through exhaustion of the iterable (with [`for`](https://docs.python.org/3/reference/compound_stmts.html#for)) or when the condition becomes false (with [`while`](https://docs.python.org/3/reference/compound_stmts.html#while)), but not when the loop is terminated by a [`break`](https://docs.python.org/3/reference/simple_stmts.html#break) statement

```python
for i in range(10):
    print(i)
    if i == 5:
        break
else:
    print("Else clause")	# 因为break了，所以不会打印
```

##### def

> 定义函数

```python
def FUNCTION_NAME(ARG_LIST):
    STATEMENTS
```

`默认参数`

```python
def say(name,age=10):
    ...
```





#### Built-in Data Structure

#### Modules

#### IO

#### Errors And Exception

#### Object-Oriented Programming

#### Standard Library

#### Appendix

##### range

```python
for i in range(10):
    print(i)
    
for i in range(10,20,2):	# 10-20 步长为2 不包含20
    print(i)
```

##### sum

```python
print(sum(range(10)))	# 45
```

