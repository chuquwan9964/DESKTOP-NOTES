##TypeScript

#### 1.环境搭建



##### 1.1安装



```markdown
npm install -g typescript
```

==或==

```markdown
yarn global add typescript
```

`安装后运行tsc -v检查是否安装成功`





##### 1.2开发工具配置 

`开发工具使用的是vscode`

为了减少手动编译次数，可以按照以下操作进行简化



```typescript
tsc --init	//会在当前路径下生成tsconfig.json配置文件
```



==配置tsconfig.json==



![59290059924](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1592900599246.png)



`终端->运行任务->tsc监视`	:	可以自动编译(需要指定编译的js文件路径)







#### 2.基本数据类型和定义方式

##### 2.1string

```typescript
let str:string = "hello world"
```



##### 2.2boolean

```typescript
let flag:boolean = true;
```



##### 2.3number

```typescript
let i:number = 20;	//或者
let f:number = 1.222		//不区分浮点型和整型
```



##### 2.4数组

```typescript
let arr:string[] = ['a','b','c','d']
//或
let arr:Array<string> = ['a','b','c','d']
```



##### 2.5元组

​	特殊的数组，可以规定其中每个元素的数据类型

```typescript
let tuple:[string,number,boolean] = ["hello",123,true];
```



##### 2.6枚举

```typescript
enum Flag{
    SUCCESS=1,
    ERROR=2
}
console.log(Flag.SUCCESS);	//1
console.log(Flag.ERROR)	//2



enum Flag{
	SUCCESS,	//如果不指定值，默认是索引值
    ERROR
}
console.log(Flag.SUCCESS);//0
console.log(Flag.ERROR);//1



enum Color {
    RED,
    GREEN = 5,
    BLUE
}
console.log(Color.RED); //0
console.log(Color.GREEN); //5
console.log(Color.BLUE); //6
```



##### 2.7any

​	任意类型

##### 2.8null

##### 2.9undefined

##### 2.10void

​	==通常表示 函数无返回值==

```typescript
function f1():void{
    //no return
}


let f2 = function():void {
    //no return
}
```



##### 2.11never

​	null和undefined是never的子类型





#### 3.函数定义方式

##### 3.1无参具名函数

```typescript
function f1():void {
    //无返回无参具名函数
}

function f2():string {
    //返回string无参具名函数
}
```



##### 3.2无参匿名函数

```typescript
let f1 = function():void {
    //无参无返回匿名函数
}

let f2 = function():string {
   //无参返回string匿名函数
}
```



##### 3.3有参函数

```typescript
function f1(name:string,age:number):void {
    //有参无返回具名函数
}

function f2(name:string,age:number):string {
    //有参返回string具名函数
}
```



##### 3.4可选参数函数

```typescript
function f1(name?:string,age?:number):string {
    //可选参数具名函数
}
```



##### 3.5默认参数

```typescript
function f1(name:string,age:number=20):string {
    //默认参数函数返回string
}
```



##### 3.6剩余参数

​	==三点运算符==

```typescript
function sum(array:Array<number>):number {
    let num = 0;
    
}
```





##### 3.7函数重载

​	==如果要重载方法，和java的还不一样==

```typescript
//定义两个重载限制
function say(name:string):string;
function say(age:number):string;

function say(str:any):any {
  if(typeof str === 'string') {
    //如果是string类型的参数
    console.log("是string类型的参数");
  }else {
    console.log("是number类型的参数");
  }
}

console.log(say(123));	//方法调用成功，返回值是undefined
console.log(say(true))	//方法调用失败，证明用到了上面的限制
```





#### 4.类相关

##### 4.1类的实现

```typescript
class Animal {
  name:string

  constructor(name:string) {
    this.name = name;
  }
  run() {
    console.log(this.name + "is running");
  }
}

let a1 = new Animal("猫");
let a2 = new Animal("狗");

console.log(a1.run === a2.run);	//true	都是转换成了es5语法后加在了Animal.prototype上的方法
```



##### 4.2类的继承

> typescript中如果父类的say方法为private，子类自己实现了say方法，是会报错的，但在java中不会



```typescript
class Animal {
  name:string

  constructor(name:string) {
    this.name = name;
  }
  run():void {
    console.log(this.name + "is running");
  }
}

class Person extends Animal {
  constructor(name:string) {
      //子类必须调用父类的构造函数,先初始化父对象才能初始化子对象
    super(name);
  }
}

let p1 = new Person("商佳辉");
let a1 = new Animal("猫");
console.log(p1.run === a1.run); //true
```



##### 4.3类的修饰符

​	public

​	protected

​	private

​	==属性或方法不写默认都是public==



##### 4.4静态属性，静态方法

`使用static修饰，原理是在类的prototype上添加了响应的属性或方法，因此类的实例无法访问这些属性或方法`

```typescript
class Person {
  static username:string = "123";
  static say():void{
    //注意,此时的this就是Person了
    console.log(this.username);
  }
}
Person.say(); //123
```



##### 4.5抽象类，抽象方法

`使用abstract修饰，跟java基本一致`





#### 5.接口

> typescript中的接口，可以像java一样定义方法的约束，也可以定义对属性的约束(这是特殊的地方)

##### 5.1属性类型接口

> 对自己的属性进行约束

```typescript
interface config {
    username:string;
    password:string;
    url:string;
    driver:string
}

function print(c:config);

print({
    username:'root',
    password:'205032',
    url:'jdbc:mysql://localhost:3306/test',
    driver:'com.mysql.jdbc.Driver'
});	//正确执行


print({
    age: 18
    username:'root',
    password:'205032',
    url:'jdbc:mysql://localhost:3306/test',
    driver:'com.mysql.jdbc.Driver'
});	//错误执行，因为多了一个age



let config = {
    age: 18
    username:'root',
    password:'205032',
    url:'jdbc:mysql://localhost:3306/test',
    driver:'com.mysql.jdbc.Driver'
}
print(config);	//正确执行，不知道为什么，在外面定义对象可以有额外的属性
```





##### 5.2函数类型接口

> 对函数的参数和返回值进行约束，相当于函数式接口了

```typescript
interface Consumer {
  (value:any):void;
}

let c:Consumer = (value => {
  console.log(value);
})

c("hello world");	//hello world
c(123);				//123
```





##### 5.3可索引接口

> 对数组，对象的约束

```typescript
interface IntegerArray {
    [index:number]:string	//表明此数组中索引必须为number类型，值必须为string类型
}

let arr:IntegerArray = ['a','b','c'];
```





##### 5.4类类型接口

> 典型的java中的接口，可以继承，实现





#### 6.泛型

##### 6.1泛型函数

```typescript
function f1<T>(T t):T {
    //...
}
```



##### 6.2泛型类

```typescript
class MyClass<T> {
    //....
}
```



##### 6.3泛型接口

```
interface MyFunction<T,R> {
  apply(value:T):R;
}
```



#### 7.模块

> 直接导出或导入生成的js文件浏览器是不是别的，需要使用特殊工具再进行打包后才可以转换成es5的语法

##### 7.1导出

```typescript
function add() {
    //...
}
function div() {
    //...
}

let name = "sjh";

export {add,div,name}
```



##### 7.2导入

```typescript
import {add,div as d,name} from './01'	//必须加上./要不然会被认为是系统模块
```



##### 7.3命名空间

> 类似于java中的package



```typescript
namespace A {
  export function say():void {
    console.log("a.say")
  }
}

namespace B {
  function say():void {
    console.log("b.say")
  }
}

//如需在外部运行,则必须导出
A.say();

```



##### 7.4模块化的命名空间

> 如果A文件需要用到B文件的命名空间呢?接下来解答疑问



```typescript
01.ts
export namespace A {
  export function say():void {
    console.log("a.say")
  }
}

namespace B {
  function say():void {
    console.log("b.say")
  }
}



//要求01.ts中的命名空间和之中的方法都得export

02.ts
import {A} from './01';
A.say();
```





#### 8.装饰器

?有啥用

##### 8.1类的不传参装饰器

> 不可以给注解传递参数

```typescript
function decorator(param:any):void {
  console.log(param); //此param就是Person对象
  param.prototype.name = "sjh"; //可以动态的给Person赋值
}

@decorator//添加此注解
class Person {
}
```



##### 8.2类的传参装饰器

> 可以给注解传递参数

```typescript
function decorator(value:string):any {
  return function(param:any):void {
    console.log(value); //value是注解传入的参数
    console.log(param); //param是Person对象
  }
}

@decorator("hello world")
class Person {
}
```



##### 8.3类的构造函数装饰器

> 可以替代类的构造函数

```typescript
function decorator(param:any):any {
    //返回一个匿名类对象
  return class extends param {
    name:string = "123";
    say():void {
      console.log("匿名类的say方法");
    }
  }
}
@decorator
class Person {
  name:string;
  constructor() {
    this.name = "sjh";
  }
  say():void {
    console.log("Person的say方法")
  }
}
let p = new Person();
p.say();  //匿名类的say方法
console.log(p.name);  //123
```



##### 8.4属性装饰器

##### 8.5方法装饰器

##### 8.6方法参数装饰器



##### 8.7装饰器的执行顺序

​	属性装饰器 --> 方法装饰器 --> 方法参数装饰器  -->  类装饰器

> 如果同一种装饰器指定了多个，那么按照反顺序来执行