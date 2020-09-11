# Spring注解加强

##### Spring注解源码解析

```
public void refresh() throws BeansException, IllegalStateException {
		synchronized (this.startupShutdownMonitor) {
			// Prepare this context for refreshing.
			prepareRefresh();

			// Tell the subclass to refresh the internal bean factory.
			ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

			// Prepare the bean factory for use in this context.
			prepareBeanFactory(beanFactory);

			try {
			
				//啥也没干啊！！！
				postProcessBeanFactory(beanFactory);

				//执行实现了BeanFactoryPostProcessor接口的所有类的方法，并将所有bean定义，但此时并未初始化(定义)
				invokeBeanFactoryPostProcessors(beanFactory);

				//初始化所有的实现了BeanPostProcessor接口的类，此后每有一个bean创建都会走一下BeanPostProcessor之中的前后两个方法(初始化和赋值或创建代理对象)
				registerBeanPostProcessors(beanFactory);

				//国际化
				initMessageSource();

				//初始化程序事件多播组件，当有事件发布时，调用此组件的multicastEvent方法
				//方法会先找容器中是否有名字为applicationEventMulticaster的组件，如果有
				就用这个，也就是说我们可以自定义多播器组件
				initApplicationEventMulticaster();

				//子类
				onRefresh();

				//注册所有的listener到多播器中
				registerListeners();

				//初始化所有未初始化的单实例bean
				finishBeanFactoryInitialization(beanFactory);

				//发布容器刷新完成事件
				finishRefresh();
			}

			catch (BeansException ex) {
				if (logger.isWarnEnabled()) {
					logger.warn("Exception encountered during context initialization - " +
							"cancelling refresh attempt: " + ex);
				}

				// Destroy already created singletons to avoid dangling resources.
				destroyBeans();

				// Reset 'active' flag.
				cancelRefresh(ex);

				// Propagate exception to caller.
				throw ex;
			}

			finally {
				// Reset common introspection caches in Spring's core, since we
				// might not ever need metadata for singleton beans anymore...
				resetCommonCaches();
			}
		}
	}
```



#### 注解讲解:

##### @Configuration

##### @ComponentScan

​	**useDefaultFilters = false**	是否使用默认过滤器，配合**includeFilters**使用

​	**Filter[] includeFilters() default {};**	指定只包含哪些

​	**Filter[] excludeFilters() default {};**	指定排除哪些

​	**@Repeatable(ComponentScans.class)**	可以重复使用@ComponentScan



```
@Configuration	声明该类是一个配置类
@ComponentScan	配置包扫描器

	@ComponentScan(value = "com.chuquwan",useDefaultFilters = false,
                includeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,classes = {UserDao.class}),//根据类型过滤
                @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = Controller.class),//根据注解类型过滤
                @ComponentScan.Filter(type = FilterType.CUSTOM,classes = MyFilterConfig.class)//自定义过滤
                }
)

过滤器有过滤顺序，上面已经通过的类下面的过滤器就不会再过滤


如果使用自定义过滤，则需要制定过滤类，spring会将ComponentScan配置的包扫描路径下的所有类都交给自定义过滤器过滤一遍，不光是带有特定注解的类会被扫描到，普通类也会被扫描，如果过滤通过，也会被加入IOC容器

public class MyFilterConfig implements TypeFilter {
    @Override
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
    	//获取类的元信息
        ClassMetadata classMetadata = metadataReader.getClassMetadata();
        //获取注解的元信息
        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
        return false;
    }
}

```

##### @Bean

​	@Bean(name = "")

##### @Scope

​	SCOPE_PROTOTYPE	多例的	singleton(写这个)

​	SCOPE_SINGLETON	单例的	prototype

​	SCOPE_REQUEST	在一次请求单例	

​	SCOPE_SESSION		在一次会话单例

##### @Lazy

```
@Bean
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
@Lazy	//懒加载，初始化容器时不会初始化这个bean
public User user(){
	return new User("zhangsan","123456");
}
```



##### @Conditional

​	**如果加在配置类上，条件不成立的话，配置类也不会起作用**

​	**Class<? extends Condition>[] value()**		配置条件规则的类的字节码对象数组

```
//根据操作系统的类型来初始化bean
public class MyCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String property = context.getEnvironment().getProperty("os.name");//获取系统的操作系统名称
        Map<String, Object> annotationAttributes = metadata.getAnnotationAttributes(Bean.class.getName());
        
        //getAnnotationAttributes这个方法必须写注解的全限定类名，可以获取带有@Conditional注解的类或方法上的所有注解信息，如果@Bean没有指定value的话，那么获取到的数组长度为0
        
        String[] name = (String[]) annotationAttributes.get("name");
        if (name.length == 0)
            return false;
        if (property.contains(name[0]))
            return true;
        return false;
    }
}
```

```
    @Bean("Windows")
    @Conditional(MyCondition.class)
    public User user1(){
        return new User("bill","123456");
    }

    @Bean("linux")
    @Conditional(MyCondition.class)
    public User user2(){
        return new User("linux","123456");
    }
```

##### @Import

​	向容器中导入组件

​	**@Import(xxx.class...)**	向容器中导入指定组件

​	**@Import(xxxImportSelector.class)**	可以指定多个实现了ImportSelector接口的类，这些类实现方法selectImports返回String数组，spring就将这些String数组中的全类名加载到了IOC容器中(SpringBoot中的注解**@EnableAutoConfiguration**用到)

​	**@Import(ImportBeanDefinitionRegistrar.class)**	手动注册bean，实现ImportBeanDefinitionRegistrar接口，重写方法

```
@Import({Color.class, Blue.class})	//直接导入指定组件

```



##### @ImportResource("classpath:spring.xml")

​	引入xml形式的配置文件



##### 	**ImportSelector**

```
@Import({MyImportSelector.class})
public class BeanConfig {...}


public class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {

        return new String[]{"com.chuquwan.bean.Blue",
                "com.chuquwan.bean.Yellow",
                "com.chuquwan.bean.Red",
                "com.chuquwan.bean.Color"};
    }
}
```

**AnnotationMetadata**当前类的注解信息:

​	**就是标注了@Import的类的所有注解信息**

​	**@Import加载的bean的名称默认为全类名**

```
com.chuquwan.bean.Blue
com.chuquwan.bean.Yellow
com.chuquwan.bean.Red
com.chuquwan.bean.Color
```

##### 	**ImportBeanDefinitionRegistrar**

```
//MyImportBeanDefinitionRegistrar手动添加组件的条件是容器中必须有红黄蓝，但是这个在添加红黄蓝的前面，可见spring是根据在容器中的定义，而不是必须在容器中（可能一开始就将所有的单例bean定义在了容器里，但还没有来得及初始化）

@Import({MyImportBeanDefinitionRegistrar.class,MyImportSelector.class})
public class BeanConfig {...}
```

```
public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    /**
     * AnnotationMetadata   带有@Import注解的类上的所有注解元信息
     * BeanDefinitionRegistry   bean的注册者
     */
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        boolean b = registry.containsBeanDefinition("com.chuquwan.bean.Red");
        boolean b1 = registry.containsBeanDefinition("com.chuquwan.bean.Yellow");
        boolean b2 = registry.containsBeanDefinition("com.chuquwan.bean.Blue");

        //如果IOC容器中有红,黄,蓝,就加入RainBow
        if (b && b1 && b2) {
            registry.registerBeanDefinition("rainBow", new RootBeanDefinition(RainBow.class));
        }
    }
}
```

##### 使用FactoryBean接口来添加组件

​	**还记得SqlSessionFactoryBean吗，使用FactoryBean接口来添加组件主要用来整合**

```
/**
 * Color类的bean工厂
 */
public class ColorFactoryBean implements FactoryBean<Color> {
    @Override
    public Color getObject() throws Exception {
        return new Color();
    }

    @Override
    public Class<?> getObjectType() {
        return Color.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

```
@Bean
public ColorFactoryBean colorFactoryBean(){
    //明面上返回的是bean工厂
    //实际上调用getBean("colorFactoryBean")得到的是ColorFactoryBean.getObject返回的对象
    //getBean("&colorFactoryBean")是返回的工厂对象
    return new ColorFactoryBean();
}
```

```
    @Test
    public void testOne(){
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeanConfig2.class);
        Object colorFactoryBean = applicationContext.getBean("colorFactoryBean");
        System.out.println(colorFactoryBean.getClass());//Color
        Object colorFactoryBean1 = applicationContext.getBean("&colorFactoryBean");
        System.out.println(colorFactoryBean1.getClass());//ColorFactoryBean
    }
```

##### Bean的初始化和销毁

**1)	**通过**@Bean**注解指定初始化和销毁方法:	**@Bean(initMethod=" ",destoryMethod="")**

​	必须无参，可以抛出异常	

```
public class Cat {

    public Cat(){
        System.out.println("Cat Constructor...");
    }

    public void init(){
        System.out.println("init......");
    }

    public void destroy(){
        System.out.println("destroy......");
    }
}
```

```
@Configuration
public class BeanConfig3 {

    @Bean(initMethod = "init",destroyMethod = "destroy")
    public Cat cat(){
        return new Cat();
    }
}
```



**2)** 	通过实现**InitializingBean**接口的**afterPropertiesSet**方法来初始化，

​	实现**DisposableBean**接口的**destroy**方法来执行销毁操作

```
public class Cat implements InitializingBean,DisposableBean {

    public Cat(){
        System.out.println("Cat Constructor...");
    }

    public void destroy(){
        System.out.println("DisposableBean destroy......");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean init");
    }
}
```



```
@Configuration
public class BeanConfig3 {

    @Bean
    public Cat cat(){
        return new Cat();
    }
}
```

**如果@Bean配置了初始化和销毁，而该类又实现了上面两个接口的方法，那么两个初始化方法和销毁方法都会执行**

```
public class Dog implements InitializingBean, DisposableBean {

    public void beanInit(){
        System.out.println("@Bean init");
    }

    public void beanDestroy(){
        System.out.println("@Bean destroy");
    }


    @Override
    public void destroy() throws Exception {
        System.out.println("@DisposableBean destroy");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("@InitializingBean init");
    }
}
```

```
@Configuration
public class BeanConfig3 {


    @Bean(initMethod = "beanInit", destroyMethod = "beanDestroy")
    public Dog dog() {
        return new Dog();
    }
}
```

```
    @Test
    public void test2(){
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeanConfig3.class);
    }
    
    打印结果:
   	 	@InitializingBean init
   	 	@Bean init
```



**3)**	在指定方法上添加**@PostConstruct**注解指定初始化方法，**@PreDestory**注解指定销毁方法

​	**都是属于javax.annotation包下的**

**4)**	实现了**BeanPostProcessor**接口的组件，会在所有的单例bean初始化完毕前调用**BeanPostProcessor**的**postProcessBeforeInitialization**方法，会在所有单例bean初始化完毕后调用**BeanPostProcessor**的**postProcessAfterInitialization**方法

```
/**
 * 该类的方法两个参数
 *      bean        the new bean instance
 *      beanName    the name of the bean
 * 一个返回值    Object  the bean instance to use, either the original or a wrapped one
 *              要么返回原来的bean，要么就包装一下返回,方便以后使用
 */
 
 //可以不添加至IOC容器中，只要是实现了此接口的类，spring都会执行
public class MyBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }
}
```

**Bean初始化调用方法顺序:**

​	**Contructor->postProcessBeforeInitialization->init->postProcessAfterInitialization**



##### BeanPostProcessor&InstantiationAwareBeanPostProcessor

前者在bean对象初始化并赋值之后，init方法调用之前调用其**postProcessBeforeInitialization**方法

在init方法调用之后调用其**postProcessAfterInitialization**方法



后者在bean实例化之前先调用其**postProcessBeforeInstantiation**方法，实例化之后如果**postProcessBeforeInstantiation**返回了不是null的对象，则调用其**postProcessAfterInstantiation**方法



##### @Value

​	@Value()		里面写基本类型或字符串

​	@Value(#{5-2})	这个可以计算

​	@Value(${key})		取出配置文件里的值

##### @PropertySource

​	指定配置文件加载，就可以使用${key}

​	注意，在4.2.4多版本之前是没有自动添加那个解析器组件的，需要自己添加PlaceHolder



##### @Autowired

​	**boolean required() default true;**	是否强制自动装配，如果为true，容器中没有此类型就会报错

​	如果为false，那么不必强制装配，容器中没有就注入null

​	**如果容器中存在两个相同类型的bean，那么spring会优先注入与bean变量名字相同的**

​	**@Autowired应用在属性上**

​		**给属性自动注入**

​	**@Autowired应用在方法上**

​		**在constructor方法之后，调用此方法**

​	

##### @Qualifier

​	如果容器中有多个相同类型的bean，使用此注解指定要注入的bean的名字

​	如果写在了@Bean和@Component等为容器添加组件的注解旁边，那么此注解的作用就是为这个bean起一个限定名，将来如果更改了类的名字此限定名依然能用

##### @Primary

​	指定此bean为优先注入的bean

##### @Resource

​	**javax.annotation包下的注解**

​	**可以**实现自动装配功能，但不支持**@Primary**和**@Autowired**的required选项

##### @Inject

​	支持**@Primary**注解，但不支持**@Autowired**的required

##### Aware

###### ApplicationContextAware

```
public interface ApplicationContextAware extends Aware {
    void setApplicationContext(ApplicationContext var1) throws BeansException;
}
```

​	实现此接口的类，spring会在启动时调用此接口的对应set方法，设置值

内部原理是使用了**ApplicationContextAwareProcessor**这个处理器，还记得吗？

处理器的beforeInit...方法

###### BeanFactroyAware

```
public interface BeanFactoryAware extends Aware {
    void setBeanFactory(BeanFactory var1) throws BeansException;
}
```

###### EmbeddedValueResolverAware

```
public interface EmbeddedValueResolverAware extends Aware {
    void setEmbeddedValueResolver(StringValueResolver var1);
}

public interface StringValueResolver {
    @Nullable
    String resolveStringValue(String var1);
}

可以解析#{1+1},${key}

```

###### BeanNameAware

```
public interface BeanNameAware extends Aware {
    void setBeanName(String var1);	//var1是bean的名字
}
```

##### @Profile

​	添加上此注解的类或方法只能在特定环境下运行

​	<https://docs.spring.io/spring/docs/5.2.3.RELEASE/spring-framework-reference/core.html#spring-core>

​	如何在xml文件指定profile?(因为xml相当于类上加了configuration)

​	\<beans profile="">\</beans>

​	@Profile("default")	是默认的，也就是说如果没有指定运行环境，那么就运行default

​	手动运行

​		**在命令行添加参数**	

```
-Dspring.profiles.active="profile1,profile2"
```

​		**java代码运行**

```
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
ctx.getEnvironment().setActiveProfiles("development");
ctx.register(SomeConfig.class, StandaloneDataConfig.class, JndiDataConfig.class);
ctx.refresh();
```

## AOP



​	**以下两图是切面的各个方法执行的顺序**



![58503876834](H:\笔记\images\1585038768344.png)



![58503885402](H:\笔记\images\1585038854025.png)



##### @EnableAspectJAutoProxy

```
@Configuration
@EnableAspectJAutoProxy //声明开启注解AOP的支持
public class MyConfig1 {

    public MyConfig1(){}

    @Bean
    public LogAspect logAspect() {
        return new LogAspect();
    }

    @Bean
    public LinkPoint linkPoint() {
        return new LinkPoint();
    }
}
```



##### @Pointcut

```
    @Pointcut(value = "execution(public String com.chuquwan.LinkPoint.*(..))")
    public void pointCut(){}
```



##### @Before		**前置通知**

![58227447321](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582274473213.png)

```
    @Before(value = "pointCut()")
    public void beforeLog(){
        System.out.println("前置打印日志");
    }
    
    
    @Before(value = "pointCut()")
    public void beforeLog(JoinPoint joinPoint){
        String string = joinPoint.getSignature().toString();// 方法名
        System.out.println(string);
        Object[] args = joinPoint.getArgs();
        System.out.println(Arrays.toString(args));
        System.out.println("前置打印日志");
    }
```



##### @After		后置通知

```
    @After(value = "pointCut()")
    public void afterLog(){
        System.out.println("后置打印日志");
    }
```



##### @AfterReturning		最终通知

![58227448881](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582274488816.png)

```
    @AfterReturning(value = "pointCut()")
    public void finalLog(){
        System.out.println("最终打印日志");
    }
```



##### @Around	环绕通知

![58211736674](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582117366741.png)

##### @AfterThrowing		异常通知

```
    @AfterThrowing(value = "pointCut()")
    public void afterThrowingLog(){
        System.out.println("异常打印日志");
    }
    
    
    @AfterThrowing(value = "pointCut()",throwing = "e")
    public void afterThrowingLog(Exception e){
        System.out.println("异常打印日志");
    }
```



##### @Order

​	@Order(1)

​	运用于多切面切一个切入点的时候

​	切面的执行顺序，数值越小优先级越高





##### 指示器

###### execution指示器

![58211651172](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582116511728.png)



![58211654379](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582116543799.png)

有多个指示器用&&相连时，必须全部匹配才会通知



###### bean指示器

![58211667444](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582116674442.png)



##### @DeclareParents

​	本质上就是一个代理类代理了两个类，使这个代理类可以互相转换

![58227332526](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582273325263.png)

两个类都要加入到bean容器中

value属性指定了哪种类型的bean要引入该接口

defaultImpl属性指定了为引入功能提供实现的类

@DeclareParents注解所标注的属性指明了要引入了接口



###### xml实现

​	第一行是要加强的类，相当于上面的Person

​	第二行是加强的类，相当于上面的Animal

​	第三行是加强类的具体实现

![58227456249](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1582274562493.png)





























##### 原理

```
@Import(AspectJAutoProxyRegistrar.class)	//注解EnableAspectJAutoProxy导入了														AspectJAutoProxyRegistrar
public @interface EnableAspectJAutoProxy


```

```
class AspectJAutoProxyRegistrar

public void registerBeanDefinitions(
			AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) 

		//这一步是将一个AOP的预处理器定义在容器中
		AopConfigUtils.registerAspectJAnnotationAutoProxyCreatorIfNecessary(registry);
```

![57803068365](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1578030683654.png)

![57803074690](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1528295612502.png)

```
AnnotationAwareAspectJAutoProxyCreator的继承关系如下
	AnnotationAwareAspectJAutoProxyCreator
		AspectJAwareAdvisorAutoProxyCreator
			AbstractAdvisorAutoProxyCreator
				AbstractAutoProxyCreator	//关键干活的类是一个处理器BeanPostProcessor
				
				实现了SmartInstantiationAwareBeanPostProcessor接口，是在创建bean之前调用此接口的postProcessBeforeInstantiation方法
```



## TX

##### @EnableTransactionManagement

```
@Bean//向容器中添加事务管理器
public PlatformTransactionManager transactionManager() {
	return new DataSourceTransactionManager(dataSource());
}
```

##### @Transactional

​	**如果在非容器中的对象上添加此注解，无用**

```
@Repository
public class UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public void insert() {
        String sql = "insert into tab_user (name,address) values (?,?)";
        jdbcTemplate.update(sql, UUID.randomUUID().toString().substring(0, 5), "安阳市北关区开发区");
        int i = 3 / 0;
    }


}
```



#### Detail

##### 	@Transactional的注解属性

###### 	isolation

​		隔离级别，Isolation类型

​		数据库事务并发问题:

​			**脏读：**

​				一个事务读到了另一个事务未提交的数据，如果另一个事务回滚的话，那么第一个事务读到的数据就无效

​			**不可重复度**

​				t1读age是20

​				t2改age为30

​				t1再读age是30，两次不一样

​			**幻读**

​				跟不可重复读差不多，只不过幻读是多出了几行数据

###### 	propagation

​		传播行为，Propagation类型

![58536104315](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585361043155.png)

###### 	timeout

​		超时时间，超过此事件事务自动取消抛出异常并回滚，int类型

###### 	readOnly

​		是否是只读事务，boolean类型

###### 	rollbackFor

​		让原本不回滚的异常（**编译时异常**）回滚，而不是白名单

​		指明哪些异常类型回滚，Class[]类型

###### 	rollbackForClassName

​		指明哪些异常类型回滚，String[]类型(全类名)

###### 	noRollbackFor

​		让原本回滚的异常不回滚（**运行时异常**），而不是黑名单

​		指明哪些异常类型不回滚，Class[]类型

###### 	noRollbackForClassName

​		指明哪些异常类型不回滚，String[]类型





**运行时异常（非检查性异常）：回滚**

**编译时异常（检查性异常）：不回滚（为什么呢？可能是编译时异常肯定被处理，人家不管这闲事）**







##### MYSQL语句加锁

```
select * from tab_user where id=?  lock in share mode 	加读锁，在事务范围内，读可以，写不行
```

```
select * from tab_user where id=? for update	加写锁，在事务范围内，读写都不行，我霸占着
```

```
select * from tab_user where id=? 	普通的select，查询的是数据的快照（想像一下CopyOnWriteArrayList）
```



##### 事务和锁

​	事务是保证一组操作具有一定的特征，比如ACID

​	而锁是实现事务的隔离性的一种手段



##### MYSQL隔离级别命令

​	![58535818704](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585358187044.png)











## 拓展原理

##### BeanFactoryPostProcessor

​	**在beanFactory初始化之后（在所有bean的定义信息已经加载之后），bean初始化之前执行**

```
@FunctionalInterface
public interface BeanFactoryPostProcessor {

	/**
	 * Modify the application context's internal bean factory after its standard
	 * initialization. All bean definitions will have been loaded, but no beans
	 * will have been instantiated yet. This allows for overriding or adding
	 * properties even to eager-initializing beans.
	 * @param beanFactory the bean factory used by the application context
	 * @throws org.springframework.beans.BeansException in case of errors
	 */
	 //在beanFactory初始化之后，在所有单实例bean初始化之前调用
	void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException;

}
```

```
@Component
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    public MyBeanFactoryPostProcessor(){
        System.out.println("MyBeanFactoryPostProcessor constructor");
    }
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        System.out.println("my bean factory post processor");
    }
}
```

##### BeanDefinitionRegistryPostProcessor extends BeanFactoryPostProcessor

​	**在环境初始化之后，bean定义之前调用，就是定义bean的后处理器**

​	**可以用其增加组件**

```
public interface BeanDefinitionRegistryPostProcessor extends BeanFactoryPostProcessor {

	/**
	 * Modify the application context's internal bean definition registry after its
	 * standard initialization. All regular bean definitions will have been loaded,
	 * but no beans will have been instantiated yet. This allows for adding further
	 * bean definitions before the next post-processing phase kicks in.
	 * @param registry the bean definition registry used by the application context
	 * @throws org.springframework.beans.BeansException in case of errors
	 */
	void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException;

}

```

****

**BeanDefinitionRegistryPostProcessor 优于BeanFactoryPostProcessor执行**

##### ApplicationListener

**注册事件监听器**

```
@Component
public class MyApplicationListener implements ApplicationListener<ApplicationEvent> {
    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        System.out.println("收到事件" + event);
    }
}

```

**自己发布事件**

```
    @Test
    public void test1() {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(ExConfig.class);
        applicationContext.publishEvent(new ApplicationEvent(new String("发布事件")) {
        });
        applicationContext.close();
    }
```

**原理**

![57804356523](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1578043565239.png)

##### @EventListener(classes = {xxx.class,xxx.class})	必须是ApplicationEvent的类型

```
public @interface EventListener {

	/**
	 * Alias for {@link #classes}.
	 */
	@AliasFor("classes")
	Class<?>[] value() default {};

	/**
	 * The event classes that this listener handles.
	 * <p>If this attribute is specified with a single value, the
	 * annotated method may optionally accept a single parameter.
	 * However, if this attribute is specified with multiple values,
	 * the annotated method must <em>not</em> declare any parameters.
	 */
	@AliasFor("value")
	Class<?>[] classes() default {};
```







## Servlet3.0

##### @WebServlet

##### @WebFilter

##### @WebListener



##### ServletContainerInitializer

​	使用编码的方式添加各种组件

​	此组件，Tomcat会在启动的时候扫描所有jar包类路径/META-INF/services/javax.servlet.ServletContainerInitializer文件，找到你配置的启动类在哪里

![58540204955](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585402049558.png)



##### @HandlesTypes(xxx.class)

​	最好是个接口，写在类上，该类的onStartup方法的参数c就是此类的所有实现类的类对象



##### AbstractAnnotationConfigDispatcherServletInitializer

![58546020744](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585460207447.png)



spring-webjar包里的META-INF/services/

![58546037323](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585460373238.png)



###### SpringServletContainerInitializer

###### ​	springmvc的整合servlet3.0的类

###### ![58546046109](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585460461094.png)

![58546048816](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585460488163.png)



​	找到所有的实现了WebApplicationInitializer的类并调用其onStratup方法



![58546053654](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585460536541.png)



##### Servlet3.0异步

​	其实就是开了一个线程去执行

​	![58546063966](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585460639663.png)

















**war包的class文件都在WEB-INF/classes目录下**

![58540110276](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585401102764.png)



![58540111740](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1585401117401.png)



