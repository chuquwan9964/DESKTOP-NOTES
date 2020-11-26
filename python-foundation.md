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





#### Control Operator

#### Built-in Data Structure

#### Modules

#### IO

#### Errors And Exception

#### Object-Oriented Programming

#### Standard Library

#### Appendix

