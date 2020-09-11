### Ordinary Command

###### show databases;

###### show tables;

###### show tables from DB_NAME;

###### select database();

​	查看当前在哪个库

###### desc Table_NAME

​	查看表的描述，不能查看数据库的

###### select version();

​	查看数据库的版本

###### show variables like '%character%';

​	查看客户端与服务端的编码格式

###### set names utf8;

​	临时设置客户端编码格式

###### 事务保存点

![58632568576](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586325685766.png)

###### show engines

​	查看存储引擎

###### show variables like '%storage_engine%'

​	查看默认的引擎信息

###### query_cache_type

​	全局属性

​	是否开启缓存

​	ON		如果用户查询不指定NO_CACHE，默认缓存

​	OFF		如果用户查询不指定SQL_CACHE，默认不缓存

​	DEMAND	根据用户决定



###### innodb_file_per_table

​	datadir/ibdata1	默认所有数据表存储的位置

​	此选项为ON表示每张表创建一个独立的表空间，可以实现单表备份等高级功能

​	在innodb存储引擎下，表空间文件后缀名为ibd，存储数据和索引





###### show charset

​	显示支持的字符集



### DML

​	Data Manipulation Language	数据操纵语言

##### 表插入数据

###### 方式1

​	insert into tab_name (column1,column2,...) values(value1,value2)

###### 方式2

​	insert into tab_name values(全值)

​	**可以以子查询的结果作为插入的值，将来可以批量插入**

```
insert into tab_name
select xxx
```

###### 方式3

​	insert into tab_name set column1=value1,column2=value2...

###### 方式4

​	insert into tab_name          `   select-expr`



##### 表更新数据

###### 更新单表

​	update table_name set c1=v1,c2=v2...

###### 更新多表

​	级联更新，先连接，再更新连接后的虚拟表

```
92sql语法:
	update tab_name1,tab_name2
	set c1=v1,c2=v2...
	where 连接条件
	and	筛选条件
	
	
99sql语法
	update tab_name1
	[连接类型] join
	ON	连接条件
	set c1=v1,c2=v2...
	where 筛选条件
```



##### 表删除数据

###### 单表删除

​	delete from tab_name where xxx

###### 多表删除

​	如果是删除多表的信息，那么就只能使用连接删除

​	如果只是删除一表的信息，但是此表用到了其他表的条件，那么可以使用子查询代替

```
sql92语法
	delete 表1的别名,表2的别名...
	from 表1 别名1,表2 别名2
	where 连接条件
	and 筛选条件
	
	

sql99语法
	delete 表1的别名,表2的别名...
	from 表1 别名1
	join 表2 别名2
	ON	连接条件
	join...
	ON	xxx
	where 筛选条件
	
```



​	**删除张无忌女朋友的信息**

```
可以使用子查询完成删除
DELETE 
FROM beauty b
WHERE b.boyfriend_id = (
		SELECT id
		FROM boys
		WHERE boyName = '张无忌'
)


使用内连接完成删除
DELETE b1
FROM beauty b1
JOIN boys b2
ON b1.boyfriend_id = b2.id
WHERE b2.boyName = '张无忌'
```



##### truncate和delete

1. ​	truncate不能加where，delete可以加
2. ​        truncate删除，效率高一点
3. ​        truncate重置自增，delete不重置
4. ​        truncate删除没有返回值，delete返回影响的行数
5. ​        truncate删除对于事务不能回滚
6. ​        delete没有真正物理删除，truncate物理删除







### DDL

​	Data Definition Language	数据定义语言

##### 创建

###### 创建数据库

​	create database name

​	create database if not exists name

###### 创建表

```
create table tb_name (
		列名1 数据类型 [长度，约束]
		列名1 数据类型 [长度，约束]
		列名1 数据类型 [长度，约束]
		列名1 数据类型 [长度，约束]
		...
)
```





##### 修改

###### 修改数据库

```
重命名:
		直接rename数据文件夹里的文件

修改字符集:
		alter database db01 default character set utf8;
		
```



###### 修改表

​	**修改列名**

```
ALTRR TABLE tb_name CHANGE COLUMN column_name new_name DATATYPE 

alert table book change column publishdate pubDate datatime		#最后一个要写此列的数据类型
```



​	**修改列的类型**

```
ALTER TABLE tb_name MODIFY COLUMN column_name DATATYPE

alert table book modify column pubDate DATESTAMP	#修改列的数据类型
```



​	**添加新列**

```
ALTER TABLE tb_name ADD COLUMN column_name DATATYPE

alert table author add column annual DOUBLE
```



​	**删除列**

```
ALTER TABLE tb_name DROP COLUMN column_name

alter table author drop column annual
```



​	**修改表名**

```
ALTER TABLE author RENAME TO new_name
```



​	**修改表的字符集**

```
alter table 表名 convert to character set 字符集;
```





##### 删除

###### 删除数据库

​	drop database if exists db_name







##### 查询



##### 表的复制

###### 	只复制结构

```sql
create table new_table like old_table
```

###### 	结构和数据一起复制

```sql
create table new_table 
select id,name,...
from old_table
where xxx


create table new_table
select id,name
from old_table
where 1=2		#你懂的!!!
```



##### 添加约束

​	列级约束可以添加所有约束，但是外键约束没作用

​	表级约束不可以添加非空和默认约束，其他都可以

###### 	非空约束

​		NOT NULL

###### 	默认约束

​		DEFAULT

###### 	唯一约束

​		UNIQUE

###### 	主键约束

​		PRIMARY KEY

###### 	检查约束

​		CHECK

###### 	外键约束

​		FOREIGN KEY

###### 	综合写法

```
create table manager (
		id int primary key auto_increment,
		name varchar(20) not null
)


create table student (
		id primary key auto_increment,
		name varchar(20) not null,
		manager_id int ,
		constraint pk_student_manager foreign key(manager_id) references manager(id)
)
```



##### 修改约束

###### 给存在的表添加非空约束

```
alter table tab_name modify column column_name datatype 约束

alter table student modify column name varchar(20) not null
```

###### 给存在的表添加唯一约束

```
alter table student modify column name varchar(20) unique
```



###### 给存在的表添加默认约束

```
alter table student modify column name varchar(20) default 'sjh'
```



###### 给存在的表添加主键约束

```
alter table student modify column name varchar(20) primary key

alter table student add primary key(id)
```



###### 给存在的表添加外键约束

​	在建表语句中添加外键约束是不管用滴

```
alter table student add foreign key(manager_id) references manager(id)
```

###### 给存在的表删除约束

​	主键，唯一约束，外键都会添加索引，索引不可以使用普通方法删除

```
如果是普通约束，而不是索引的话，可以普通删除
alter table tab_name modify column column_name datatype 约束

alter table student modify column name varchar(20) null	去掉非空约束
```



```
删除索引的约束
alter table student drop index xxx		#xxx是index的名字,使用show index from student查看

alter table student drop primary key pk_name	#删除主键约束

alter table student drop foreign key fk_name	#删除外键约束
```

###### auto_increment

![58632452699](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586324526993.png)



修改表的auto_increment

```
alter table student modify column id int primary key auto_increment
```

删除表的auto_increment

```
alter table student modify column id int		#不写auto_increment就行了
```







### DQL

​	Data Query Language	数据查询语言

###### 去重

```
SELECT DISTINCT salary FROM employees
```



###### concat

​	连接两个字段

```
SELECT concat(first_name,last_name) FROM employees;

如果是下面这样,查询到的是12
SELECT concat(1,2) FROM employees;	//12

如果是下面这样,查询到的是helloworld连起来
SELECT concat('hello','world') FROM employees;	//helloworld
```



###### between and

​	包含临界值，两个值不可以颠倒顺序

```
SELECT * FROM employees WHERE id BETWEEN 100 AND 120;
```

###### is null

​	=号不能判断null值

###### is not null

​	判断不等于null值

###### order by

​	排序查询

```
SELECT * FROM employees ORDER BY id desc;	根据id降序查询
```

###### ifnull()

```
ifnull(obj)函数，如果函数里的参数为null，函数返回0
```

##### 字符串函数

###### length(str)

```函数
length()函数，返回字符串的长度
SELECT LENGTH(name) FROM employees;	查询名字的长度
```

###### upper(str)

![58566346164](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585663461645.png)

###### lower(str)

​	将字符串转换为小写

###### substr()

​	**索引从1开始**

​	![58566374044](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585663740444.png)

​	**截取中间子串**

![58566381754](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585663817544.png)



###### instr()

​	返回子串在父串中第一次出现的位置

​	索引从1开始

![58566403306](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585664033062.png)



###### trim()

​	去掉字符串两边的空格或者其他指定的字符

![58566422532](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585664225323.png)



###### lpad()

​	用指定的字符填充到左边，直至指定的长度

```
SELECT LPAD('商佳辉',10,'*');	//*******商佳辉

SELECT LPAD('商佳辉',2,'*');	//商佳
```



###### rpad()

​	用指定的字符填充到右边，直至指定的长度

```
SELECT RPAD('商佳辉',10,'*');	//商佳辉*******

SELECT RPAD('商佳辉',2,'*');	//商佳
```



###### replace()

​	替换

```
SELECT REPLACE('aaa','a','b');	//把a替换成b
```





##### 数学函数

###### round()

​	四舍五入

```
select round(1.5)	//2
select round(1.4)	//1

//保留两位小数的四舍五入
select round(1.567,2)	//1.57
```



###### ceil()

​	向上取整，返回大于等于参数的第一个整数

```
ceil(1.001)	//2
ceil(1.00)	//1

ceil(-1.001)	//-1
```



###### floor()

​	向下取整，返回小于等于参数的第一个整数

```
floor(1.001)	//1
floor(-1.001)	//-2
```



truncate()

​	截断，参数为小数点后的位数

```
truncate(1.6999999,1)	//1.6	保留1位小数
```



###### mod()

​	取余

​	比如a%b	那么公式为a-a/b*b

```
mod(-10,3)	//-1
mod(10,-3)	//1
```



##### 日期函数



###### now()

​	返回当前时间格式为yyyy-MM-dd HH:mm:ss

```
select now();	// 2020-04-04 22:24:49

```



###### curdate()

​	返回日期，不返回时间

```
sekect curdate();	//2020-04-04
```



###### curtime()

​	返回时间

```
select curtime();	//22:24:49
```



###### year()

​	返回年,需要一个date参数，或者传入字符串常量值也可以

```
select year(now())	//2020
select year('2020-1-1')	//2020
```

###### mouth()

​	返回月，需要date参数，或者传入字符串常量值也可以

```
select mouth(now())	//4
select year('2020-1-1')	//1
```

###### day()

###### hour()

###### minute()

###### second()



###### str_to_date(str,format)

​	将合法的日期字符串转换为日期格式

![58601088428](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586010884288.png)

```
 select * from employees where hiredate=str_to_date('4-3-1992','%c-%d-%Y');
 
 select str_to_date('4-3-1992','%c-%d-%Y');	//1992-04-03
```



###### date_format(date,format)

```
select date_format('1999-01-20','%Y年%c月%d日');	//1999年1月20日
 select date_format('1999-01-20','%Y/%c/%d');	//1999/1/20
```

###### datediff(date1,date2)

​	算出date1和date2相差的天数

```
#最大员工入职时间和最小员工入职时间差值
select datediff(max(hiredate),min(hiredate)) from employees;	//8735
```









##### 流程控制函数

###### if(expr1,expr2,expr3)

​	类似于三元运算符

```
select if(10>5,'大','小');	//大
```



###### case流程控制语句

```
case 要判断的字段或表达式
	when  常量1  then  要显示的值1或语句1;
	when  常量2  then  要显示的值2或语句2;
	when  常量3  then  要显示的值3或语句3;
	else  要显示的默认值或语句;
	end
```



```sql
case
	when  判断的表达式  then  值
	when  判断的表达式  then  值
	else  默认值
	end



#判断薪资如果大于15000则B级别，如果大于20000则A级别
select employee_id,
				case 
					when salary>20000 then 'A级别' 
					when salary>15000 then 'B级别' 
					else 'C级别' end from employees;
```





##### 聚合函数

###### 	sum()

​		计算数值型，忽略**NULL**值

###### 	avg()

​		计算数值型，忽略**NULL**值

###### 	count()

​		都可以计算，计算非空的值的个数

```sql
select count(null) from employees;	//0	null值不算
select count(1) from employees;	//107	
select count(*) from employees;	//107	和上面的效率差不多
select count('str') from employees	//107	效率没有上面的快，因为要判断字符串是否为null
```



###### 	min()

​		可以计算字符型，数值型，日期型，忽略**NULL**值

###### 	max()

​		可以计算字符型，数值型，日期型，忽略**NULL**值

###### 	xxx(distinct,value)

​		去重之后再进行聚合

​		**其他的都可以使用distinct**

```
#去重之后再求和
select sum(distinct,salary),sum(salary) from employees;
```





##### 分组查询

​	group by

###### having的用法

​	**查询员工个数大于2的部门**

```

select department_id,count(*) 员工个数 from employees group by department_id having count(*)>=2;

where是对分组前的表进行过滤，having是对分组后的表进行过滤,可以使用别名
select department_id,count(*) num from employees group by department_id having num>2;
```

​	**查询相同工种的员工的最大工资大于12000的工种编号和工资**

```
select max(salary) from employees where commission_pct is not null group by job_id having max(salary)>12000;
```

​	**查询领导编号大于102的领导手下最低工资大于5000的员工的领导编号和员工的最低工资**

```
 select manager_id, min(salary) from employees where manager_id>102 group by manager_id having min(salary)>5000;
```

​	**查询员工姓名长度大于5的每个长度下的员工个数**

```
 select length(concat(first_name,last_name)) len,count(*) from employees group by len having len>5;
```



​	**按照多个分组进行查询**

​	**查询每个部门每个工种的员工的平均工资**

```
select avg(salary),department_id,job_id from employees group by department_id,job_id;

#可以起别名
select avg(salary),department_id di,job_id ji from employees group by di,ji;
```







​	**where不支持别名**

```
select salary s from employees where s>10000;
```



​	**having和group by支持别名**

​	为什么?	因为where规定条件是在原表上规定的，原表上没有别名那个字段，而having和group by是建立在where查询后的基础上，也就是建立在有别名字段的新表上，所以可以使用别名(因为有这个字段了)





#### 连接查询

##### sql92内连接

###### 等值连接

​	**查询员工名和对应的部门名**

```
SELECT e.first_name '员工名',d.department_name '部门名' 
FROM employees e,departments d
WHERE e.department_id = d.department_id
```

​	**查询员工名，工种号，工种名 **

```
SELECT e.first_name,e.job_id,j.job_title
FROM employees e,jobs j
WHERE e.job_id = j.job_id
```

​	**查询部门所在地第二个字符为o的部门名和城市名**

```
SELECT d.department_name,l.city
FROM departments d,locations l
WHERE d.location_id = l.location_id and l.city like '%o%';
```

​	**查询每个城市的部门个数**

```
SELECT count(*),l.city
FROM departments d, locations l
WHERE d.location_id = l.location_id
GROUP BY d.location_id
```



​	**查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资**

```
SELECT min(e.salary) '最低工资',d.department_name '部门名',d.manager_id '领导编号'
FROM employees e,departments d
WHERE e.commission_pct is not NULL and e.department_id = d.department_id
GROUP BY d.department_name,d.manager_id
```



​	**查询每个工种的工种名和员工的个数，并按员工个数排序**

```
SELECT count(*) num,j.job_id
FROM jobs j,employees e
WHERE e.job_id = j.job_id
GROUP BY j.job_id
ORDER BY num desc
```



​	**查询员工名，部门名，和所在的城市**

```
SELECT e.first_name,d.department_name,l.city
FROM employees e,departments d,locations l
WHERE e.department_id = d.department_id and d.location_id = l.location_id
```



###### 非等值连接

​	**查询员工的工资和工资级别**

```
SELECT e.salary,jg.grade_level
FROM employees e,job_grades jg
WHERE e.salary BETWEEN jg.lowest_sal and jg.highest_sal
```



###### 自连接

​	**查询员工名和上级的名称**

```
SELECT e1.first_name '员工名',e2.first_name '上级名'
FROM employees e1,employees e2
WHERE e1.manager_id = e2.employee_id
```





##### sql99内连接

​	所有连接格式:

```
select 查询列表
from 表1
[连接类型] join 表2
on
[where]
[group by]
[having]
[order by]
```

###### 等值连接

​	**查询员工名，部门名**

```
SELECT e.first_name,d.department_name
FROM employees e
Inner JOIN departments d
ON e.department_id = d.department_id
```

​	**查询名字中包含e的员工名和工种名**

```
SELECT e.first_name,j.job_title
FROM employees e
INNER JOIN jobs j
ON e.job_id = j.job_id
WHERE e.first_name LIKE '%e%'
```

​	**查询部门个数大于3的城市名和部门个数**

```
SELECT count(*) num,l.city
FROM departments d
INNER JOIN locations l
ON d.location_id = l.location_id
GROUP BY l.city
HAVING num>3
```

​	**查询哪个部门的员工个数>3的部门名和员工个数，并按员工个数降序**

```
SELECT count(*) num,d.department_name
FROM departments d
INNER JOIN employees e
ON e.department_id = d.department_id
GROUP BY department_name
HAVING num>3
ORDER BY num DESC
```

​	**查询员工名，部门名，工种名，并按部门名降序**

```
SELECT e.last_name,d.department_name,j.job_title
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN jobs j ON e.job_id = j.job_id
ORDER BY d.department_name DESC
```







###### 非等值连接

​	**查询员工的工资和工资级别**

```
SELECT e.salary,jg.grade_level
FROM employees e
INNER JOIN job_grades jg
WHERE e.salary BETWEEN jg.lowest_sal and jg.highest_sal
```



###### 自连接

​	**查询员工名和上级的名称**

```
SELECT e1.first_name '员工',e2.first_name '上级'
FROM employees e1
INNER JOIN employees e2
ON e1.manager_id = e2.employee_id
```





##### sql99外连接 

###### 左外连接

​	left [outer] join

###### 右外连接

​	right [outer] join

###### 全外连接

​	full[outer] join

​	MYSQL不支持

##### 交叉连接

​	cross  join

​	其实就是笛卡尔积，脱裤子放屁





#### 子查询

##### where后面跟标量子查询

​	标量子查询是子查询的结果为一行一列，就是只有 一个结果

​	**查询跟141员工id相同且salary比143员工多的所有员工信息**

```
SELECT * 
FROM employees
WHERE job_id = (
		SELECT job_id
		FROM employees
		WHERE employee_id = 141
) AND salary > (
		SELECT salary 
		FROM employees
		WHERE employee_id = 143
)
```

​	**查询工资最少的员工信息**

```
SELECT e.last_name,e.job_id,e.salary
FROM employees e
WHERE e.salary = (
		SELECT min(salary)
		FROM employees
)
```



##### where后面跟列子查询

​	列子查询是一列多行

###### 	in/not in

​		不说了

###### 	any/some

​		any：只要满足结果集中的任意一个即可

​		where a < any(select xxx)	a小于任意一个即可

###### 	all

​		all：需要满足结果集中的所有条件



##### where后面跟行子查询

​	行子查询是一行多列

​	![58625058827](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586250588272.png)



##### select后面跟子查询

​	**查询部门id和部门人数**

```
SELECT d.department_id,(
	SELECT count(*)
	FROM employees
	WHERE department_id = d.department_id
	GROUP BY department_id
) '人数'
FROM departments d
ORDER BY d.department_id
```



##### from后面跟子查询

​	**查询每个部门的平均工资的工资等级**

```
SELECT tab1.val '薪资',(
		SELECT grade_level
		FROM job_grades
		WHERE tab1.val BETWEEN lowest_sal AND highest_sal
) '等级'
FROM (
	SELECT avg(e.salary) val
	FROM employees e
	GROUP BY e.department_id
) tab1



#因为employees表和job_grade没有直接联系，因此如果需要连接并分组的话，应该先将employees分组再跟其他表连接

SELECT tab1.*,j.grade_level
FROM (
		SELECT e.department_id id,avg(e.salary) ag
		FROM employees e
		GROUP BY e.department_id
)tab1
JOIN job_grades j
ON tab1.ag BETWEEN j.lowest_sal AND j.highest_sal

```



##### 老大工资和小弟最高工资

```
SELECT e1.manager_id,max(salary),(
		SELECT salary
		FROM employees
		WHERE employee_id = e1.manager_id
) '老大工资'
FROM employees e1
GROUP BY e1.manager_id
HAVING e1.manager_id is not null



SELECT e1.salary,e1.employee_id,max(e2.salary)
FROM employees e1
JOIN employees e2
ON e1.employee_id = e2.manager_id
WHERE e1.employee_id IN (
		SELECT manager_id
		FROM employees
)
GROUP BY e1.employee_id



SELECT e1.employee_id '老大ID',e1.salary '老大工资', (
		SELECT max(salary)
		FROM employees 
		WHERE e1.employee_id = manager_id
		GROUP BY manager_id
		HAVING manager_id is not NULL
) '小弟最大工资'
FROM employees e1
WHERE e1.employee_id IN(
		SELECT manager_id
		FROM employees
)

```



##### exists子查询

​	又称相关子查询

```
SELECT EXISTS(SELECT * FROM employees)	//1
SELECT EXISTS(SELECT * FROM employees where id = -10000)	//对于不存在的值，返回0
```



​	**查询有员工的部门名称**

```
SELECT d.department_name
FROM departments d
WHERE EXISTS(
		SELECT *
		FROM employees e
		WHERE e.department_id = d.department_id
)
```





#### 分页查询

```
select 查询列表
from 表1
[连接类型] join 表2
on
[where]
[group by]
[having]
[order by]
[limit] offset,size		offset从0开始,size是查询的数量
```



###### 	巧夺天工

​		**查询平均工资最高的job信息**

```
SELECT j.*
FROM employees e
JOIN jobs j
ON e.job_id = j.job_id
GROUP BY job_id
ORDER BY avg(salary) DESC
LIMIT 1
```



#### 联合查询

##### union

​	会自动去重

​	如果列数不一样，则爆错

​	如果列数顺序不一致，那么按照错误的顺序来显示

​	用于将两次不同的查询合并

```
select xxx from xxx
union
select xxx from xxx
union...
```



##### union all

​	不去重







### 数据类型

##### 整型

​	创建出来默认就是有符号的(也就是可以为负)

​	插入超过范围的值会报错

|    类型     | 字节 |        范围         |
| :---------: | :--: | :-----------------: |
|   Tinyint   |  1   | -128-127<br />0-255 |
|  Smallint   |  2   |      以此类推       |
|  Mediumint  |  3   |                     |
| Int,integer |  4   |                     |
|   Bigint    |  8   |                     |

```
如何创建无符号？
create table test (
		id int unsigned
)
```



###### 声明时长度问题

```
我们在创建表时，会这样创建
	create table test (
			id int(11)
	)
那么这个int(11)代表什么呢？
int(11)里面的11不代表此字段的数据范围，因为数据范围已经由int这个类型决定了
这个11代表的是数据库显示时，显示的宽度，如果你的数小于这个宽度，那么把0填充到前面
当然，要这样声明才可以将0填充到前面，并且此字段就是无符号的
		create table test (
				id int(11) zerofill
		)
```



##### 浮点型

​	无限接近于真实值

​	(M,D)	一共M位，D为位小数

​	(5,2)	最大值999.99	插入144.256结果为144.26	插入144.2结果为144.20

|    类型     | 字节 | 范围 |
| :---------: | :--: | :--: |
| float(M,D)  |  4   |      |
| double(M,D) |  8   |      |

##### 定点型

​	比浮点型还精确

|     类型     | 字节 |                             范围                             |
| :----------: | :--: | :----------------------------------------------------------: |
|   DEC(M,D)   | M+2  | 最大取值范围与double相同，给定decimal的有效取值范围由M和D决定 |
| DECIMAL(M,D) | M+2  | 最大取值范围与double相同，给定decimal的有效取值范围由M和D决定 |



##### 字符型

|   类型    |           描述           |
| :-------: | :----------------------: |
|   char    |        不可变长度        |
|  varchar  |        可变的长度        |
|   enum    |           枚举           |
|    set    |           集合           |
|  binary   | 保存不可变长度二进制数据 |
| varbinary |  保存可变长度二进制数据  |
|   text    |        较长的文本        |
|   blog    |     较长的二进制数据     |

###### char和varchar的区别

​	char		:	最多255个**字节(注意)**，定长

​	varchar	:	最多65535个**字节(注意)**	，变长，需要额外计算存入的字符长度以分配空间存储这个长度值(需要额外的空间存储这个字符的长度，对性能和存储空间都有损耗)





###### enum的用法

```
create table test (
		sex enum('男','女')
)

insert into test set sex='男'
```



##### 日期

|   类型    |     描述      | 字节 |
| :-------: | :-----------: | :--: |
|   date    |  只保存日期   |  4   |
| datetime  | 保存日期+时间 |  8   |
| timestamp | 保存日期+时间 |  4   |
|   year    |    保存年     |  1   |
|   time    |   保存时间    |  3   |

###### 区别

​	<https://segmentfault.com/a/1190000017393602>



### 视图

##### 创建视图

```
create view 视图名
as
select xxx
from xxx
join xxx
on	xxx
where	xxx
group by	xxx
having	xxx
order by	xxx
limit	xxx
```

##### 修改视图

```
create or replace view 视图名
as
```

```
alter view 视图名
as
```

##### 删除视图

```
drop view view1,view2,......
```

##### 查看视图

```
desc 视图名
show create view 视图名
```



### sql编程

##### 系统变量

​	查看所有的系统变量

```
show global variables
show session variables

```

​	查看满足条件的系统变量

```
show global variables like '%xxx%'
show session variables like	'%xxx%'
```

​	查看某一特定的系统变量

```
select @@global.变量名		#查看全局变量
select @@session.变量名	#查看会话变量
```

​	设置某一系统变量

```
set @@global.变量名		#设置全局变量
set @@session.变量名		#设置会话变量
```



###### 全局变量

###### 会话变量

##### 自定义变量

###### 用户变量

​	作用域：本次会话有效

​	**声明时必须初始化**

```
#声明方式

set @变量1=值1
set @变量1:=值1
select @变量1:=值1



#案例
set @name = '商佳辉';
SELECT @`name`		#商佳辉
```

​	**赋值**(或更新)

```
#赋值，更新方式
set @变量1=值1
set @变量1:=值1
select @变量1:=值1

#还有新的方式(一定要先声明)
select 字段 into 变量名
from 表


#案例
SELECT last_name into @name
FROM employees
WHERE employee_id = 100

SELECT @name	//K_ing
```

![58633023956](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586330239569.png)



###### 局部变量

​	作用域：仅仅在定义它的begin-end语句块中有效

​	**必须放在begin-end语句块中**

![58633067121](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586330671212.png)







##### 存储过程

​	没有返回值





​	DELIMITER $		#声明结束符

​	CREATE PROCEDURE 存储过程名 (模式	参数名	参数类型)

​	BEGIN

​		CONTENT	#书写存储过程内容，每一句必须以分号结尾

​	END $			#加上这个结束符



```
关于这个DELIMITER定界符:
		因为SQL编译器遇到分号自动停止编译，就开始运行了，因此我们需要自定义一个结束符，让在存储过程中的语句不结束，直到END才结束此次编译
```









###### 空参的存储过程DEMO

![58633541132](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586335411321.png)

![58633567063](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586335670637.png)



###### 有参的存储过程DEMO

​	**传入参数的存储过程**

![58633639653](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586336396538.png)

​	

**传出参数的存储过程**

```
DELIMITER $
CREATE PROCEDURE pc6(IN beautyName VARCHAR(20),OUT boyName VARCHAR(20))
BEGIN
	SELECT b.boyName INTO boyName
	FROM boys b
	WHERE b.id = (
			SELECT boyfriend_id
			FROM beauty
			WHERE name = beautyName
	);
END $

CALL pc6('王语嫣',@bName);
SELECT @bName	#段誉
```

###### INOUT模式存储过程

![58633878544](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586338785444.png)



###### 存储过程的删除

```
DROP PROCEDURE 存储过程名
```

###### 查看存储过程的信息

```
SHOW CREATE PROCEDURE 存储过程名
```



**创建存储过程，传入一个日期，格式化成xx年xx月xx日并返回**

```
#创建存储过程，传入一个日期，格式化成xx年xx月xx日并返回
CREATE PROCEDURE pc8(IN d date,OUT str VARCHAR(20))
BEGIN
		SET str = DATE_FORMAT(d,'%Y年%c月%d日');
END

CALL pc8('1999-01-20',@str);
SELECT @str
```





##### 存储函数

​	set global log_bin_trust_function_creators=TRUE;这是啥错误啊

​	有返回值

​	如果内容只有一行，BEGIN和END可以省略

​	CREATE FUNCTION 函数名(参数1 类型1,参数2 类型2...)	RETURNS	返回类型

​	BEGIN

​			CONTENT

​	END

###### 无参有返回DEMO

```
#返回公司的员工个数
CREATE FUNCTION f1() RETURNS INT
BEGIN
		DECLARE num INT DEFAULT 0;
		SELECT count(*) INTO num
		FROM employees;
		RETURN num;
END $
```

其他的就自己想吧，很简单

###### 查看函数信息

```
SHOW CREATE FUNCTION f2
```

###### 删除函数

```
DROP FUNCTION f2
```



##### 流程控制结构

###### if

```
if		条件1	
	then	语句1
elseif	条件2	
	then	语句2
elseif	条件3
	then	语句3
...
else	语句n
end if
```



###### case

```
CREATE PROCEDURE p2(IN grade INT)
BEGIN
		CASE floor(grade/10)
	WHEN 9 THEN
		SELECT 'A' 成绩;
	WHEN 8 THEN
		SELECT 'B' 成绩;
	WHEN 7 THEN
		SELECT 'C' 成绩;
	WHEN 6 THEN
		SELECT 'C' 成绩;
	ELSE SELECT 'D';
END CASE;
END

CALL p2(79);
```



###### 循环

​	iterate就是continue

​	leave就是break

​	要想使用上面的控制，必须给循环加标签

###### while

```
[标签:]	while 条件 do
			语句
		 end while [标签]
```

###### loop

```
[标签:]	loop
			循环体
		 end loop [标签]
```

###### repeat

​	相当于dowhile

```
[标签:]	repeat
			循环体
		 until	循环结束的条件
		 end repeat
```







### Advanced

#### 在Linux上安装

```
#安装一系列包，下面只是举个栗子
yum install -y mariadb
```



##### 安装完后，执行命令设置密码

```
mysqladmin -u root password 205032
```

将配置文件拷贝到/etc/mysql/my.cnf

​	启动服务时，配置文件扫描顺序为	/etc/my.cnf	->	/etc/mysql/my.cnf

```
cp /usr/share/mysql/my-huge.cnf  /etc/mysql/my.cnf
```



删除所有匿名用户

```
drop user ''@'localhost'
```



刚安装完后修改密码和删除匿名用户可以通过命令实现

```
[root@chuquwan7 usr]# mysql_secure_installation
```









###### 修改默认字符集

​	在/etc/mysql/my.cnf中[client]下添加

```
default-character-set=utf8
```



​	在/etc/mysql/my.cnf中[mysqld]下添加

```
default-storage-engine=INNODB
character-set-server=utf8
collation-server=utf8_general_ci
```



##### 索引

​	主键和唯一约束都添加索引

###### 添加

​	**方式1**

```
create [unique] index index_name on table_name(column_list(length))
```

​	**方式2**

```
alter table user add index index_user_name(name);
```

###### 修改

###### 删除

```
drop index index_name on table_name
```



###### 查看

```
show index from table_name
```



###### 添加全文索引

```
alter table table_name add fulltext index_name (column_list)
```



###### 索引失效情况

​	如果不是从最左列开始，索引无效(联合索引的情况下)

​	如果跳过索引中的列，索引无效

​	如果查询时某个列为范围查询，那么这个列后面的查询都不能使用索引了

​	索引列失效，统计信息没有实时更新

​	索引列使用了数学运算，失效

​		select * from user where id-1=9;	失效

​	查询使用!=或者not in，不走索引

​	查询时的数据类型与定义的数据类型不一致，不走索引

​		select * from user where name = 123		不走

​		select * from user where name = '123'		走





#### Explain

###### 小demo

```
MariaDB [db03]> explain select * from user where id = 1;
+------+-------------+-------+-------+---------------+---------+---------+-------+------+-------+
| id   | select_type | table | type  | possible_keys | key     | key_len | ref   | rows | Extra |
+------+-------------+-------+-------+---------------+---------+---------+-------+------+-------+
|    1 | SIMPLE      | user  | const | PRIMARY       | PRIMARY | 4       | const |    1 |       |
+------+-------------+-------+-------+---------------+---------+---------+-------+------+-------+
1 row in set (0.00 sec)


```

表中各个字段的含义

###### id

​	id字段表示 各个表的加载顺序，值越大越优先，值相同，从上到下

###### select_type



​	**查询类型**，下面介绍:

​	**SIMPLE**

​		简单的select查询，查询中不包含子查询或者union(联合)查询

​	**PRIMARY**

​		子查询的爹

​	**SUBQUERY**

​		子查询

​	**DERIVED**

​		在from后添加的子查询，会被标记为DERIVED(衍生),MYSQL会递归执行这些子查询，并把结果放在临时表里(浪费性能)

​	**UNION**

​		标记此查询是union之后的查询

​		若UNION包含在from子句的子查询中，外层SELECT标记为DERIVED

​	**UNION RESULT**

​		就是多个union查询后合并到一起的结果集





###### table





###### type

​	**此查询经历的查询次数**

​	性能由好到差:

​	system>const>eq_ref>ref>range>index>ALL	

​	

​	**system**

​		表只有一行记录，相当于系统表，是const类型的特例，一找就找到了。。。

​	**const**

​		表示通过索引一次就找到了，const用于比较primary key或者unique索引，因为只匹配一行数据，所以很快。如将主键置于where的查询条件中，mysql就会将该查询转换为一个常量

```
MariaDB [db03]> explain select * from user where id = 1;
+------+-------------+-------+-------+---------------+---------+---------+-------+------+-------+
| id   | select_type | table | type  | possible_keys | key     | key_len | ref   | rows | Extra |
+------+-------------+-------+-------+---------------+---------+---------+-------+------+-------+
|    1 | SIMPLE      | user  | const | PRIMARY       | PRIMARY | 4       | const |    1 |       |
+------+-------------+-------+-------+---------------+---------+---------+-------+------+-------+
```



​	**eq_ref**

​		唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描

​		也就是根据某个索引查询到的结果只有一个

​		**查询的字段是唯一的**

![58644305573](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586443055733.png)



​	**ref**

​		**查询字段没有唯一约束条件**

​		根据某个索引查询到的结果不止一个，比如说员工的部门外键，一个部门可以有多个员工

![58644359467](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1586443594676.png)



​	**range**

​		只检索给定范围的行，当使用了范围查询时，比如between and，in，> <等查询

​	**index**

​		Full-Index-Scan

​		全索引扫描，比All要好

​	**ALL	**





###### possible_keys

​	是查询的时候可用的索引列表，但不一定使用

###### key

​	真正用到的索引，查询中若使用覆盖索引，则该索引仅出现在key列表，不出现在possible_keys列表中

​	覆盖索引:

​		如果一个索引包含(或覆盖)所有需要查询的字段的值，称为‘覆盖索引’。即只需扫描索引而无须回表。

```
EXPLAIN SELECT id FROM beauty		我只查询id，id所建的索引就是一个单列索引，包含id，所以此查询用到了覆盖索引
```



###### key_len

​	表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度。在不损失精确性的情况下，长度越短越好

​	显示的值为索引字段的最大可能长度，并非实际的长度，既key_len是根据表定义而得，不是通过表内检索出的

###### ref

​	如果没有索引，此值为NULL

​	查找某一表时，where条件后面引用其他表的id，或者where name = '张三'

​	如果引用其他表的id查询此表的字段(例如使用部门ID查询员工的信息)，那么此字段为department.id

​	如果是使用的本表的索引后的字段作为条件，那么此字段就是const

​		例如：EXPLAIN SELECT * FROM beauty WHERE     `name` = '热巴';

###### rows

​	显示MySQL认为它执行查询时必须检查的行数。多行之间的数据相乘可以估算要处理的行数

​	越少越好啊

​	没索引的时候就是全表扫描，此值为表的总行数

###### Extra

​	**Using FileSort**

​		说明mysql会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取

​		MYSQL无法利用索引进行排序，必须再排序一次

​	**Using Temporary(临时)**

​		使用了临时表保存中间结果，MYSQL在对查询结果排序时使用临时表。

​		常见于排序order by和分组group by

​		性能不好的体现

​	**Using Index**

​		使用了覆盖索引



###### 聚集索引和非聚集索引

​	也称为聚簇索引和非聚簇索引

​	`聚集索引`:

​		聚集索引是一种索引，该索引中键值的逻辑顺序决定了表中相应行的物理顺序

​		可以根据键来推出物理地址，键的逻辑顺序与物理地址的顺序一致

​		每个表只能有一个聚集索引，因为每个表的物理顺序只能有一种

​		通常聚集索引都是主键

​		聚集索引检索效率比非聚集索引高，但是插入效率 较低，因为它还要找到对应的物理地址

​	`非聚集索引`

​		根据索引千辛万苦找到物理地址，上面的聚集索引是直接就可以推算出物理地址

​		表的索引指向了表的数据项的物理地址，相当于一个指针















































#### Tips

​	where后不可以加聚合函数

```
原因。

sql语句的执行顺序为

 from子句

where 子句

group by 子句

having 子句

order by 子句

select 子句

首先得知道聚合函数是对结果集运算的，当在where子句使用聚合函数时，此时根据group by 分割结果集的子句还没有执行，此时只有from 后的结果集。

所以无法在where子句中使用聚合函数。
```

















### DBA

##### 1.安装



**5.7以后的版本**



###### 下载mysql的二进制压缩包，开箱即用

```
mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz
```

###### 解压

```
tar -zxvf mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz
```

###### 设置目录

​	我们规定软件安装在/app/database/mysql下

​	我们规定数据在/data/3306下

​	我们规定日志文件在/binlog/3306下

###### 初始化

```
mysqld --initiallize-insecure --user=mysql --basedir=/app/database/mysql --datadir=/data/3306/
```

###### 修改密码

```
上面的初始化后，mysql的root用户是没有密码的，也就是直接敲mysql就能进去，我们需要修改密码


mysqladmin -u root -p password	your_password #指定密码
```





