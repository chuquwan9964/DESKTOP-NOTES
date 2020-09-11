# Mybatis

### Config

##### pom.xml

```
    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.4</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.48</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
            <version>3.4.2</version>
        </dependency>
    </dependencies>
```



#### 全局配置文件

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/test"/>
                <property name="username" value="root"/>
                <property name="password" value="205032"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="daoMappers/UserDao.xml"/>
    </mappers>
</configuration>
```



​	自己上官网查去

<https://mybatis.org/mybatis-3/zh/getting-started.html>

​	**下面讲解一些常用的标签**

​	标签严格按照顺序写，顺序请参考官网的标签顺序

##### Properties

​	<https://mybatis.org/mybatis-3/zh/configuration.html#properties>

​	相当于spring的property-placeHolder

​	引入外部的配置文件

​	**resource**	：	引入类路径下的文件

​	**url**			:	引入磁盘路径的文件

​	![58580396683](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585803966838.png)



##### settings

###### 	mapUnderscoreToCamelCase

​		是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。

​		默认为false

![58580483351](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585804833510.png)



###### 	lazyLoadingEnabled

​		默认为false

​		延迟加载的类是一个代理对象

```
延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。 特定关联关系中可通过设置 fetchType 属性来覆盖该项的开关状态。
```



###### 	aggressiveLazyLoading

​		默认为false

​		调用宿主类的任意方法就会加载延迟加载对象

```
开启时，任一方法的调用都会加载该对象的所有延迟加载属性。 否则，每个延迟加载属性会按需加载（参考 lazyLoadTriggerMethods)。
```



###### cacheEnabled

​		是否开启二级缓存

​		默认为true











##### typeAlias

​	为javabean类型起别名	，这样在Sql映射文件中就不用写全类名了

![58580490188](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585804901889.png)



###### 	**批量起别名**

​		默认别名就是类名

![58580503705](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585805037057.png)



###### 	@Alias

​		用在javaBean上，当批量起别名时，你还想使用别名，在bean上加@Alias



##### typeHandler

​	自定义类型处理器，mybatis底层调用了preparedStatement，因此调用preparedStatement.setXXX方法设置参数

​	自定义类型处理器继承BaseTypeHandler\<T\>类

```
<typeHandlers>
  <typeHandler handler="org.mybatis.example.ExampleTypeHandler"/>
</typeHandlers>
```





##### databaseIdProvider

​	可以根据数据库不同，切换sql语句

​	**在全局配置文件中设置**

```
<databaseIdProvider type="DB_VENDOR">
  <property name="SQL Server" value="sqlserver"/>
  <property name="DB2" value="db2"/>
  <property name="Oracle" value="oracle" />
</databaseIdProvider>
```

​	**在sql映射文件中写语句时设置以下内容**

![58580841867](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585808418671.png)



##### mappers

```
<mapper resource=""/>		写类路径下的
<mapper class=""/>			写全类名
<mapper url=""/>			写url，比如file:///或者http://
<package name="com.chuquwan.dao"/>	批量扫描，一定要这么写
```







### Sql映射文件

​	<https://mybatis.org/mybatis-3/zh/sqlmap-xml.html>

##### 	Ordinary CRUD

​		先写一个简单的CRUD的mapper映射文件

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.chuquwan.dao.UserDao">
    <select id="findUserById" resultType="User">
        select * from tab_user where id = #{id}
    </select>
    <insert id="insertUser">
        insert into tab_user values(null,#{name},#{password})
    </insert>
    <update id="updateUser">
        update tab_user set name = #{name},password = #{password} where id = #{id}
    </update>
    <delete id="deleteUser">
        delete from tab_user where id = #{id}
    </delete>
</mapper>
```

#### 	mapper

​		mapper在sql映射文件中为根标签

##### 	<u>namespace</u>

​		规定此sql映射文件映射的哪一个dao

```
<mapper namespace=""></mapper>
```

​	

##### 	cache

​	表明此mapper应用二级缓存

​	**但是实体类必须实现serializable接口**，因为二级缓存要实现序列化

​	**mybatis首先查询二级缓存，再查询一级缓存**

###### 	<u>eviction</u>

​		对二级缓存的清除策略，默认是LRU

```
LRU – 最近最少使用：移除最长时间不被使用的对象。
FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
SOFT – 软引用：基于垃圾回收器状态和软引用规则移除对象。
WEAK – 弱引用：更积极地基于垃圾收集器状态和弱引用规则移除对象。
```



###### 	<u>flushInternal</u>

```
flushInterval（刷新间隔）属性可以被设置为任意的正整数，设置的值应该是一个以毫秒为单位的合理时间量。 默认情况是不设置，也就是没有刷新间隔，缓存仅仅会在调用语句时刷新。
```

​	

###### 	<u>size</u>

​		缓存对象的size

```
（引用数目）属性可以被设置为任意正整数，要注意欲缓存对象的大小和运行环境中可用的内存资源。默认值是 1024。
```



###### 	<u>readOnly</u>

​		缓存对象是否只读

​		因为如果是false的话，对象要每次都深拷贝一下，深拷贝需要实现serializable接口

```
（只读）属性可以被设置为 true 或 false。只读的缓存会给所有调用者返回缓存对象的相同实例。 因此这些对象不能被修改。这就提供了可观的性能提升。而可读写的缓存会（通过序列化）返回缓存对象的拷贝。 速度上会慢一些，但是更安全，因此默认值是 false。
```







##### 	cache-ref



##### 	sql

​	抽取重用的sql

```
<sql id="sql1">select * from tab_user</sql>
```

​	然后在select标签或者其他标签中引用

```
<include refid="sql1"></include>
```







##### 	insert

###### 		<u>parameterType</u>

​			**公有属性**

​			可以不设置，mybatis自动推导

```
将会传入这条语句的参数的类全限定名或别名。这个属性是可选的，因为 MyBatis 可以通过类型处理器（TypeHandler）推断出具体传入语句的参数，默认值为未设置（unset）。
```



###### 		<u>statementType</u>

​			**公有属性**

```
可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。

STATEMENT
PREPARED
CALLABLE	:	调用存储过程
```

###### 		<u>useGeneratedKeys</u>

​			**仅适用于 insert 和 update**

```
指定能够唯一识别对象的属性，MyBatis 会使用 getGeneratedKeys 的返回值或 insert 语句的 selectKey 子元素设置它的值，默认值：未设置（unset）。如果生成列不止一个，可以用逗号分隔多个属性名称。
```

###### 		

​		![58581391762](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585813917629.png)	



###### 		<u>keyProperty</u>

​			**仅适用于 insert 和 update**

```
仅适用于 insert 和 update）指定能够唯一识别对象的属性，MyBatis 会使用 getGeneratedKeys 的返回值或 insert 语句的 selectKey 子元素设置它的值，默认值：未设置（unset）。如果生成列不止一个，可以用逗号分隔多个属性名称。
```



###### 		<u>oracle的获取非自增主键</u>

​			order="BEFORE"	在插入语句之前执行

![58581418560](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585814185601.png)

##### 	

###### 		<u>databaseId</u>

​			**公有属性**

​			设置特定的数据库id



##### 	update

##### 	delete

##### 	select

###### 		<u>resultMap</u>

​			resultMap属性，指定使用哪一个map的映射关系

​			此resultMap不同于mapper根标签下的resultMap标签

​	

###### <u>useCache</u>

​	此Select查询是否保存到二级缓存中(如果开启了的话)，一级缓存一直都是开启的



###### <u>flushCache</u>

​	**全局属性(select,update,insert,delete都可以使用)**

​	每次执行操作后是否刷新缓存(清空1,2级缓存)



###### 		查询返回集合

​		返回值写集合中泛型的类型(想想为什么)

```
<select id="findAllUser" resultType="com.chuquwan.bean.User">
	select * from tab_user
</select>
```

###### 		返回map

​			**查询单个对象返回map**

​			map里key是表的列名，value是列名对应的属性

```
<select id="findUserByIdReturnMap" resultType="map">
	select * from tab_user where id=#{id}
</select>
```



​			**查询多个对象返回map**

​			**应用场景:**	当需要查询很多数据时，又要根据查询的数据找到某一个对象，使用hashMap查找效率高，需要使用@MapKey指定map的key是对象的哪一个属性

​			map里要指定key是谁，value也要指定

​			一般指定的key为表的主键，value为查询的对象

![58581881671](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585818816711.png)





###### 		@MapKey

​			指定map的key是哪一个属性，加在dao接口上的方法上

![58581875196](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585818751962.png)



##### resultMap

​	<https://mybatis.org/mybatis-3/zh/sqlmap-xml.html>

###### 	<u>type</u>

​		type属性，指定javabean的类型

###### 	<u>id</u>

​		此resultMap的唯一标识

​	**simple demo**

```
<resultMap id="userMap" type="com.chuquwan.bean.User">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <result property="address" column="address"></result>
</resultMap>
```

###### 	constructor

​		resultMap的子标签，规定创建对象时的构造器

​	

###### 	association

​		设置javabean的复杂属性的映射关系

​	**simple demo**

```
    <resultMap id="keyMap1" type="com.chuquwan.bean.Key">
        <id property="id" column="id"/>
        <result property="name" column="key_name"/>
        <association property="lock">
            <id property="id" column="id"/>
            <result property="name" column="lock_name"/>
        </association>
    </resultMap>
```

```
    <select id="findById" resultMap="keyMap1">
        select k.*,l.id lid,l.lock_name
        from tab_key k
        left join tab_lock l
        on k.lock_id = l.id
        WHERE k.id = #{id}
    </select>
```



###### 	collection

​		设置复杂类型的集合数据映射

![58583138603](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585831386039.png)



###### 	association-select

​		利用别人的方法达到查询的目的

![58583239552](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585832395525.png)

###### 	collection-select

​		利用别人的方法达到查询的目的

![58583347241](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585833472410.png)







##### 	参数传递

​	![58581645999](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585816459990.png)



**基本类型参数**	

​	**单个参数:**	直接使用#{任意名字}

​	**多个参数:**	使用#{0}或者#{param1}或者使用@Param起名字

**POJO**

​	**单个参数:**	直接使用#{属性名}

​	**多个参数:**	使用#{属性名}

###### @Param

​	给参数上加，表明此参数在Map中的key，以便用#{key}来取

![58581665911](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585816659117.png)

```
<select resultType="com.chuquwan.bean.User">
	<!--  根据@Param中的value取值	-->
	select * from tab_user where name=#{name} and address=#{address}
</select>
```





###### #{}和${}

​	**\#{}**:		是支持预编译的，也就是preparedStatement的语法格式

​	**${}**:		不支持预编译，直接sql字符串拼串

​			在某些场景下可以使用，当我们的表不确定的时候，比如日志表，名字就不确定，是个变量，这个时候我们可以使用${}取出日志表的名字(也是在参数列表中取得，当参数比较多时，我们就将其封装为一个map)，但是表明不支持预编译

```
select * from ${tabName}
```





#### Dynamic Sql

​	<https://mybatis.org/mybatis-3/zh/dynamic-sql.html>

​	**动态sql**

##### if

​	**test**：if成立的条件

![58587975277](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585879752779.png)



##### where

​	where语句可以去除掉if语句前面的and

```
where 元素只会在子元素返回任何内容的情况下才插入 “WHERE” 子句。而且，若子句的开头为 “AND” 或 “OR”，where 元素也会将它们去除
```



![58587984982](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585879849827.png)

##### trim

​	自定义添加和去除规则

​	和where等价的语句

```
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  ...
</trim>
```

![58588002744](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585880027445.png)

##### set

​	通常用于更新字段

​	*set* 元素可以用于动态包含需要更新的列，忽略其它不更新的列

```
<update id="updateAuthorIfNecessary">
  update Author
    <set>
      <if test="username != null">username=#{username},</if>
      <if test="password != null">password=#{password},</if>
      <if test="email != null">email=#{email},</if>
      <if test="bio != null">bio=#{bio}</if>
    </set>
  where id=#{id}
</update>
```



​	

##### for-each

![58588214117](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585882141179.png)



##### bind

​	模糊查询情况下，不想每次都写两个%号，可以使用bind自己声明变量

```
<bind name="_name" value="'%'+name+'%'"></bind>
```



##### include

​	包含sql标签

```
<include refid="sql1"></include>
```





#### 使用第三方二级缓存

​	因为mybatis的二级缓存做的很简陋，只是一个hashMap

​	我们的缓存都应该实现Cache接口

​	**EG**

```
<cache type="com.domain.something.MyCustomCache">
  <property name="cacheFile" value="/tmp/my-custom-cache.tmp"/>
</cache>
```



#### MBG

​	MyBatis Generator

​	逆向代码生成器

​	<http://mybatis.org/generator/quickstart.html>

​	

##### 引入约束

```
<dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.4.0</version>
</dependency>
```

##### mbg.xml

```
<!DOCTYPE generatorConfiguration PUBLIC
        "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
<!--    数据库的链接信息-->
    <context id="dsql" targetRuntime="MyBatis3">
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/word?serverTimezone=UTC"
                        userId="root"
                        password="205032"/>

<!--        生成POJO-->
        <javaModelGenerator targetPackage="com.chuquwan.bean" targetProject="./src/main/java"/>
<!--        生成的mapper配置文件-->
        <sqlMapGenerator targetPackage="com.chuquwan.dao" targetProject="./src/main/resources"></sqlMapGenerator>
<!--        生成的dao接口-->
        <javaClientGenerator targetPackage="com.chuquwan.dao" targetProject="./src/main/java" type="XMLMAPPER"/>

<!--        生成的表-->
        <table tableName="city" domainObjectName="City"/>
        <table tableName="country" domainObjectName="Country"/>
        <table tableName="countrylanguage" domainObjectName="CountryLanguage"/>
    </context>
</generatorConfiguration>
```



##### java程序生成

```
List<String> warnings = new ArrayList<String>();
boolean overwrite = true;
File configFile = new File("mbg.xml");
ConfigurationParser cp = new ConfigurationParser(warnings);
Configuration config = cp.parseConfiguration(configFile);
DefaultShellCallback callback = new DefaultShellCallback(overwrite);
MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
myBatisGenerator.generate(null);
```





#### PageHelper

​	mybatis分页插件

​	<https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/HowToUse.md>

##### maven

```
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>5.0.0</version>
        </dependency>
        <dependency>
            <groupId>com.github.jsqlparser</groupId>
            <artifactId>jsqlparser</artifactId>
            <version>0.9.5</version>
        </dependency>
```



##### 设置pageHelper的拦截器

```
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>
```



##### 查询

```
 @Test
    public void test4(){
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringRootConfig.class);
        CityMapper cityMapper = context.getBean(CityMapper.class);
        //必须在查询之前调用此方法，指定从那一页开始查，查几个
        PageHelper.startPage(9,5);
        //这个list是Page类型的，经过包装的
        List<City> list = cityMapper.findCitiesBatch();
        System.out.println(list.getClass());//class com.github.pagehelper.Page
        //pageInfo对象可以送到前台
        PageInfo<City> pageInfo = new PageInfo<>(list,7);
        //本页的最后一行是第几行   5*9=45
        System.out.println(pageInfo.getEndRow());
        //拿到刚才的list对象
        pageInfo.getList().forEach(System.out::println);
        //导航页的首页是第几页
        System.out.println(pageInfo.getNavigateFirstPage());
        //导航页的末页是第几页
        System.out.println(pageInfo.getNavigateLastPage());
        //导航页一共是7页，此方法得到当前所有导航页的页数
        int[] arr = pageInfo.getNavigatepageNums();
        //7
        System.out.println(arr.length);
        //导航页码数
        System.out.println(pageInfo.getNavigatePages());
        //下一页的页码数
        System.out.println(pageInfo.getNextPage());
        //当前页的页码数
        System.out.println(pageInfo.getPageNum());
        //总页数
        System.out.println(pageInfo.getPages());
        //每页的数量
        System.out.println(pageInfo.getPageSize());
        //上一页的页码数
        System.out.println(pageInfo.getPrePage());
        //当前页的行的数量
        System.out.println(pageInfo.getSize());
        //当前页的第一行在表中是第几行
        System.out.println(pageInfo.getStartRow());
        //获取总行数
        System.out.println(pageInfo.getTotal());
    }
```











#### Annotation

##### 	@Select

##### 	@Insert

##### 	@Delete

##### 	@Update







#### SSM

##### pom.xml

```
 <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.4</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.1.4.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.3</version>
        </dependency>
        <dependency>
            <groupId>aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.5.4</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.1.4.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.19</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.0.1</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.1.4.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
<!--            <scope>test</scope>-->
        </dependency>
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
            <version>3.4.2</version>
        </dependency>
</dependencies>
```



##### 纯注解:

​	这里只做spring与mybatis的整合，因为spring和springmvc的整合会了

###### SqlSessionFactoryBean

​	配置此bean

```
    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
        return sqlSessionFactoryBean;
    }
```



###### @MapperScan

​	声明mapper配置文件所在的位置

```
@MapperScan(basePackages = "com.chuquwan.dao")
```

​	





# Mybatis-plus

##### maven

​	引入后无需再引用mybatis与spring的整合包以及mybatis自己的包

​	但是此包依赖于spring-jdbc，因此引入spring-orm

```
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>2.3</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-orm</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
```



##### 继承BaseMapper\<T\>



##### TableId

​	指定id的生成策略以及在数据库中的字段名(可选)

```
@TableId(type = IdType.AUTO)
```



##### TableName

​	指定数据库中的表名

```
@TableName("tbl_employee")
```



##### TableField

​	指定属性相关信息

```
@TableField(value = "last_name")
```

###### value

​	指定数据库中的字段名

###### exist

​	是否在数据库中存在，如果为false就不插入此值



##### 自动获取自增主键值



#### 主要CRUD

##### deleteByMap(Map\<String,Object\>)

​	根据map删除，map为字段名->字段值键值对

##### selectByMap(Map\<String,Object\>)

​	根据map查找

```
EmployeeMapper mapper = context.getBean(EmployeeMapper.class);
HashMap<String, Object> map = new HashMap<>();
//一定要是字段名
map.put("last_name","jiahui");
List<Employee> employees = mapper.selectByMap(map);
employees.forEach(System.out::println);
```

##### selectPage()







##### GlobalConfiguration

​	全局配置策略，配置为bean，并加入到SqlSessionFactory中

###### dbColumnUnderline

​	配置驼峰命名，默认为true(在2.3版本以后)

###### idType

###### ​	配置数据库的主键生成策略

###### tablePrefix

​	配置实体类名到表名的映射

```
tablePrefix = "tbl_"	employee  ->  tbl_employee
```



​	 