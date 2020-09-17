# mysql

### 1.数据库的相关概念

- DB

  > 数据库(database) : 存储数据的仓库。保存了一系列有组织的数据

- DBMS

  > 数据库管理系统(Database Management System).数据库是通过DBMS创建和操作的容器\

  - 基于共享文件系统的DBMS(access)
  - 基于客户机-服务端的DBMS(MySQl,Oracle,SqlServer)

- SQL

  > 结构化查询语言(Structure Query Language). 专门用来与数据库通信的语言

### 2. 安装

- 启动/停止服务

  ```shell
  命令行
  net start mysql
  # (服务名安装的时候可以自定义)
  
  net stop mysql
  
  
  ```

- 服务端的登录

  ```shell
  mysql -h localhost -P 3306 -u root -ppassword
  # h - host
  # P - Port
  # 3306 - 端口号
  # u - user
  # 前三个有无空格都可以
  # p - password 和-p不能有空格
  
  # 简写
  mysql -uroot -ppassword
  exit 
  # 退出
  ```

- 常见命令

  ```shell
  # 先登录
  show databases;
  # 显示当前数据库
  drop database if exists 库名
  # 如果存在这个库删除这个库
  create database 库名 character set utf8
  # 创建数据库 设置字符编码
  use test
  # test(库名) 进入test库
  show tables;
  # 显示表
  show tables from test;
  # 显示test下的表
  select database();
  # 显示当前在哪个库
  select version();
  # 显示当前版本
  mysql --version 
  mysql -V
  # 显示当前版本 要先退出服务
  
  
  
  create table 表名(
  	列名 列类型,
  	列名 列类型,
  	...
  );
  
  create table info(
  	id int not null primary key auto_increment,
  	# 整型 不为空 主键 id 自动增长 
  	name varchar(5)
  );
  # 创建表
  desc 表名
  # 查看表结构
  ```

- 语法规范

  - 不区分大小写(建议关键字大写,其他小写)

  - 分号结尾

  - 可以缩进,换行

  - 注释

    ```shell
    #注释
    -- 注释
    /*多行注释*/
    ```




### 3. 数据类型

- 数值类型

  - 整型： int(最多10位整数)
  - 单精度浮点： float
  - 双精度浮点： double

- 字符串

  - varchar (长度不固定)

    > varchar(10) 字符串长度区间[0-10]

  - char(长度固定)

    > char(10) 字符串长度固定为10

- 布尔

- 日期类型

### 4. 增删改查

- 添加

  ```sql
  insert into stuinfo(id,name,age,sex,phone) values(1,'jack',18,'male','12345678900');
  
  -- insert into 表名(字段1,字段2...) values(值1,值2...);
  -- 如果所有字段都添加信息,则可以省略
  -- 主键不能重复
  -- 值和字段**一一对应**,类型不对应会强制转换,转换不了强制转成0
  -- 如果值为非数值类型,需要加引号 数值类型不要加引号
  ```

- 删除

  ```sql
  delete from stuinfo where id=0;
  -- delete from 表名 where 条件
  drop table stuinfo -- 删除表
  drop database sd_db -- 删除数据库
  -- 如果没有表,那么会删除所有信息
  ```

- 查询

  ```sql
  select id,name,age,sex,phone from stuinfo;
  -- select 字段1,字段2... from stuinfo
  select * from stuinfo; -- 效率低
  -- 可以用*来表示所有字段
  
  -- 多个查询返回多个结果
  
  select * from stuinfo where name='jack';
  -- 不能根据id查(根据题目查信息)
  ```

- 修改

  ```sql
  update stuinfo set sex='female',age=19 where name='jack';
  -- update 表名 set 字段1=值1,字段2=值2 where 条件;
  
  -- 不写条件默认修改所有
  
  ```



### 5. 方法

```sql
- 平均数(avg)
select avg(age) as 'avg_age' from stuinfo where sex='female';
-- 不写别称 默认用avg(age)
-- 不写条件 默认全部


- 计数(count)
select count(id) as 'male_count' from stuinfo where sex='male';
-- 不写条件 统计表中有多少数据

- 最大值(max)
- 最小值(min)
- 求和(sum)
```

### 6. 条件查询

```sql
select * from stuinfo where age = (select max(age) from stuinfo);
```

- 比较运算符

  ```text
  =
  >
  >=
  <
  <=
  !=
  <> 不等于
  ```

- 逻辑运算符

  ```text
  and 与
  
  or 或
  ```

- 模糊查询

  ```sql
  select * from stuinfo where name like '_马%';
  -- like 关键字
  -- % 0个或多个字符
  -- _ 1个任意字符
  ```

- 范围查询

  ```sql
  - 连续范围
  between ... and ...
  
  - 不连续范围
  in(1,2,3)
  not in()
  
  - 空判断
  is null  
  is not null
  
  ```

### 7. 外键查询

- 外键的含义

  > 作用: 检查数据合法性
  >
  > 两张有关联的表,对从表的数据进行约束
  >
  > 从表外键的字段必须存在于主表对应字段中

```sql
-- 创建一张学生表
create table stuinfo(
    id int not null primary key auto_increment,
    stuname varchar(10),
    stuNo int,
    sex char(2),
    phone char(11),
    birthday date
)

-- 创建一张学科表
create table ssinfo(
	id int not null primary key auto_increment,
    stuid int,
    subid int,
    -- 外键 指向stuinfo的id
    foreign key stuid references stuinfo(id),
)
```





