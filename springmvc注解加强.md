# SpringMvc注解

##### url-pattern

​	精确路径匹配>部分路径结合通配符匹配>通配符匹配>后缀名匹配

​	之前分不清/和/*的区别以及拦截静态资源的规则

​	总结一下:

​		/		默认拦截器，当没有servlet的路径匹配时，会匹配到此servlet，而且还会拦截静态资源

​		/*		此路径拦截不了全路径匹配，但是此路径优先级大于后缀名匹配

​	为什么不能用/xxx/*.jsp？反而能用 \*.jsp和/xxx/\*

/context/pattern1	>	/context/*	>	/*	>	*.pattern



```
maven就引spring-webmvc一个就行了
```







##### 路径问题

![58570915449](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585709154492.png)

###### request.getContextPath()

​	一个context就是一个web项目

​	此方法返回/_2020springmvc_war

​	以"/"开始，不以"/"结束

###### request.getServletPath()

​	此方法返回servlet的路径

​	/demo/m1



###### ServletContext.getRealPath(String str)

​	将str映射为真实路径：是文件系统中的真实路径



###### html页面路径问题

​	如果此页面是由浏览器直接请求的，那么此页面上的路径都是以浏览器地址栏上的路径为主

​	\<a href="/demo/m1"\>

​	上面的路径会被映射为http://localhost:8080/demo/m1(没有项目名称)

​	在html页面中写相对路径，不要写开头是/的绝对路径，可以写真实的URI

​	







##### No Web.xml

​	不使用web.xml配置dispatcherServlet

```
package com.chuquwan.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * 此类可以代替web.xml
 */
public class SpittrWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    /**
     * spring的应用程序上下文
     *  相当于在web.xml中配置了ContextLoaderListener
     */
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    @Override
    /**
     * spring mvc的应用程序上下文
     *  指定webmvc的配置类在哪里
     */
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}

```



##### @EnableWebMvc

​	开启支持webmvc注解，相当于xml中的\<mvc:annotation-driven\>

​	在配置类中使用

```
package com.chuquwan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@EnableWebMvc
@Configuration
@ComponentScan(basePackages = "com.chuquwan.web")
public class WebConfig extends WebMvcConfigurerAdapter {

    @Bean
    /**
     * 配置视图解析器
     */
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver i = new InternalResourceViewResolver();
        i.setPrefix("");
        i.setSuffix("");
        return i;
    }

    @Override
    /**
     * 如果必要的话，将静态资源重新移交给defaultServlet处理
     */
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

```

###### 此注解导入了一个配置类

​	此配置类导入了很多的组件，因此@EnableWebMvc就是springmvc的开挂模式

![58564333727](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585643337273.png)



![58564334592](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585643345921.png)











##### @RequestMapping

​	method属性，规定请求的方法，错误的话给客户端反馈405错误

​	params属性，规定请求携带的参数，没带就是404

​		eg:

​			@RequestMapping(params={"..."})

​			{"username"}	:	必须带有username参数，否则反馈客户端404

​			{"!username"}	:	必须不带username参数，否则反馈客户端404

​			{"username=123"}	:	必须带有username并且值为123，否则反馈客户端404

​			{"username!=123"}	:	如果携带了username参数，那么值必须不等于123，否则反馈客户端404



​	headers属性，规定请求头信息

​		eg:

​			@RequestMapping(headers={"User-Agent=xxx"})



##### Ant风格路径

​	?		任意单个字符

​	*		任意多个字符(只能匹配一层路径)

​	**		多路径任意多个字符



##### @RequestParam

​	如果没有指定参数，报400错误(Bad Request)

​	当然，也可以通过required属性设置此参数是否必须

    用于映射当前方法参数与请求资源的名字
    		public String parsePara(@RequestParam(name = "name") String username, 		    @RequestParam(name = "passwd") String password)
##### @RequestHeader

​	拿到请求头信息

​	参数为key

##### @CookieValue

​	@CookieValue("JSESSIONID")String jid

​	默认如果没有这个cookie就会报错500

​	value

​	required

​	defaultValue

**SpringMvc给参数赋值是调用了set方法，所以一定要添加set方法**



##### POST中文乱码

```
  <filter>
    <filter-name>encodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>utf-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>encodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

**CharacterEncodingFilter一定放在web.xml过滤器的第一位，因为request如果获取了请求参数，那么再设置编码格式就没用了**

##### @RequestBody

​	拿到请求体信息，注意啊，一般get请求没有请求体

​	可以封装对象

##### @PathVariable

```
解析restful风格url的占位符
@RequestMapping("pathVariable/{id}")
public String pathVariable(@PathVariable(value = "id") Integer id) {
	System.out.println(id);
	return "success";
}
```

###### 在页面发送PUT或者DELETE请求

​	在form表单中添加一项

​		\<input type="text" name="_method" value="PUT"/\>

​	或者使用AJAX的话，在data中添加(其实道理都一样):



​		data:{_method:"PUT"}

​	然后在后台添加一个filter

```
	
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

​	**为什么不用AJAX的type:"put"**

​		因为tomcat里只将post请求的参数封装为map，其他请求不会封装参数，也就导致数据传不到controller中(因为controller中是依靠request.getParameter(String key)方法获取参数的)



##### @ResponseBody

​	响应前端json数据

##### @DateTimeFormat

​	对日期进行格式转换，要开启@EnbaleWebMvc，因为它往容器里添加了**FormattingConversionService**这个格式转换的组件

![58565144929](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585651449291.png)

##### @NumberFormat

​	对特殊的数字进行转换的组件，将1,000,000可以转换成1000000

@NumberFormat(pattern = "###,###,###.##")



##### HttpEntity

​	**注意!不是注解**

​	放在方法参数上，可以获得请求头的所有信息(@RequestHeader只能获取某一个指定的请求头)

##### ResponseEntity

​	**注意!不是注解**

​	放在方法的返回值，可以自己定制response

![58570841777](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585708417778.png)



##### 文件下载

![58571007460](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585710074606.png)



##### 文件上传

```
<form enctype="mutipart/form-data" method="post">
```

![58572142525](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585721425258.png)

![58572145110](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585721451108.png)



###### 多文件上传

![58572153605](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585721536056.png)



##### 异常处理

​	HandlerExceptionResolver是springMvc的九大组件之一，springMvc的九大组件都是先到IOC容器中查找，如果没有的话就使用默认的

```
实现HandlerExceptionResolver接口
```

##### @ExceptionHandler

​	规定此方法是处理此类异常的方法

![58574577406](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585745774060.png)





##### @ControllerAdvice

​	带此注解的类是全局的异常处理类

​	类上的方法还是要添加@ExceptionHandler



##### @ResponseStatus

​	@ResponseStatus(reason = "反正我错了",value = {HttpStatus.XXX})

​	此注解，标注在自定义异常类上，当抛出此异常时，并且没有异常处理器处理此异常，那么将自定义的错误信息和status返回给客户端



##### JSR-303

​	java校验API

​	Java Validation API，又称JSR-303

​	javax.validation.constraints包中

###### maven坐标

```
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>5.2.1.Final</version>
</dependency>
```

```
空检查
@Null       验证对象是否为null
@NotNull    验证对象是否不为null, 无法查检长度为0的字符串
@NotBlank 检查约束字符串是不是Null还有被Trim的长度是否大于0,只对字符串,且会去掉前后空格.
@NotEmpty 检查约束元素是否为NULL或者是EMPTY.
 
Booelan检查
@AssertTrue     验证 Boolean 对象是否为 true  
@AssertFalse    验证 Boolean 对象是否为 false  
 
长度检查
@Size(min=, max=) 验证对象（Array,Collection,Map,String）长度是否在给定的范围之内  
@Length(min=, max=) Validates that the annotated string is between min and max included.
 
日期检查
@Past           验证 Date 和 Calendar 对象是否在当前时间之前  
@Future     验证 Date 和 Calendar 对象是否在当前时间之后  
@Pattern    验证 String 对象是否符合正则表达式的规则
 
数值检查，建议使用在Stirng,Integer类型，不建议使用在int类型上，因为表单值为“”时无法转换为int，但可以转换为Stirng为"",Integer为null
@Min            验证 Number 和 String 对象是否大等于指定的值  
@Max            验证 Number 和 String 对象是否小等于指定的值  
@DecimalMax 被标注的值必须不大于约束中指定的最大值. 这个约束的参数是一个通过BigDecimal定义的最大值的字符串表示.小数存在精度
@DecimalMin 被标注的值必须不小于约束中指定的最小值. 这个约束的参数是一个通过BigDecimal定义的最小值的字符串表示.小数存在精度
@Digits     验证 Number 和 String 的构成是否合法  
@Digits(integer=,fraction=) 验证字符串是否是符合指定格式的数字，interger指定整数精度，fraction指定小数精度。
 
@Range(min=, max=) 检查数字是否介于min和max之间.
@Range(min=10000,max=50000,message="range.bean.wage")
private BigDecimal wage;
 
@Valid 递归的对关联对象进行校验, 如果关联对象是个集合或者数组,那么对其中的元素进行递归校验,如果是一个map,则对其中的值部分进行校验.(是否进行递归验证)
@CreditCardNumber信用卡验证
@Email  验证是否是邮件地址，如果为null,不进行验证，算通过验证。
@ScriptAssert(lang= ,script=, alias=)
@URL(protocol=,host=, port=,regexp=, flags=)
```



###### 使用JSR-303校验

​	但是不懂底层实现原理，哎

![58235028925](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582350289252.png)



如果参数不加Errors的话，客户端请求参数如果校验不通过，会直接返回400错误

为什么加上@Valid注解就会校验?



###### @Valid

​	校验注解，属于JSR-303规范



##### Converter

​	**添加自定义类型转换器**

​	自定义类型转换器在FormattingConversionService里存着

![58564327060](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585643270602.png)



#### 拦截器

##### HandlerInterceptor

/*是匹配单层路径

​	只能匹配到/a	而不能匹配到/a/b

/**是匹配多层路径

​	全部都可以匹配到

##### error-page

<https://www.cnblogs.com/Hdaydayup/p/6854030.html>















#### Use Jsp

​	将来如果使用jsp的话，就要往页面上渲染值

##### 	Model

![58538118584](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585381185841.png)

##### 	Map

![58538122764](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585381227642.png)

##### 	ModelAndView

![58538129518](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585381295180.png)



​	上面三个类型，SpringMvc传入的都是BindingAwareModelMap类型，SpringMvc会将其中设置的属性添加到**request**域中



##### @SessionAttributes

​	values	:	String[]	指明需要往session中保存的键值

​	type	:	Class[]	如果底下的方法有存对应类型的，就放在session中

​		eg:

​			@SessionAttributes(type = {String.class})

​			下面的方法有存String类型的，就将此键值对放在session中

​	**只能作用在类上**

​	@SessionAttributes("msg")

​		表示下面方法往Model、Map、ModelAndView中添加的**key**为**msg**的键值对，都往session中添加一份



##### @SessionAttribute

​	给参数加，获取指定session的值