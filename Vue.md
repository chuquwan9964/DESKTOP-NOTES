

# Vue

[TOC]

###### Vue的下载

​	<https://cn.vuejs.org/>

##### new Vue()

###### el

###### data

###### methods

###### computed

​	<font color=red>计算属性，多用于预处理数据格式</font>

​	比如firstName和lastName要拼接在一起，中间有一个空格，你可能会这么做：

```html
<h2>{{firstName + ' ' + lastName}}</h2>
```

​	或

```html
<h2>{{firstName}} {{lastName}}</h2>
```

​	但是呢，如果数据太多，这样会很冗余，我们想到了一个方法，使用method

```
<body>
<div id="d1">
    <h2>{{getFullName()}}</h2>
</div>
    <script>
        let v = new Vue({
           el: "#d1",
           data: {
               firstName: "JiaHui",
               lastName: "Shang"
           },
            methods: {
               getFullName: function () {
                    return this.firstName + ' ' + this.lastName;
               }
            }
        });
    </script>
</body>
```

​	这样做很棒，只不过在    `{{}}`  中使用方法有点不合适，所以引入了我们的computed

```
<body>
<div id="d1">
    <h2>{{fullName}}</h2>
</div>
    <script>
        let v = new Vue({
           el: "#d1",
           data: {
               firstName: "JiaHui",
               lastName: "Shang"
           },
            computed: {
               fullName: function () {
                    return this.firstName + ' ' + this.lastName;
               }
            }
        });
    </script>
</body>
```



###### filter

###### components

###### watch

​	监听某一属性改变

```
watch: {
    curr: function (newV,oldV) {
    	this.$emit('tab-change', this.curr);
    }
}
```

###### created

###### activated

###### deactivated

###### destroy

###### 事件总线

​	可以跨组件的进行$emit事件派发

​	默认$bus是undefined，需要我们自己设定一个可以当bus的对象给Vue.prototype原型对象

```
Vue.prototype.$bus = new Vue();

component1.$bus.$emit('event_name');	//派发者
component2.$bus.$on('event_name',callback);	//监听者
```











##### v-*

###### v-for

​	在哪个标签上哪个标签循环





**v-for遍历数组**

```
<body>
    <div id="d1">
        <ul>
            <li v-for="(item,index) in movies">{{item}}:{{index}}</li>
        </ul>
    </div>
    <script>
        let div = new Vue({
            el:"#d1",
            data:{
                message:"商佳辉",
                movies:["星际穿越","看不见的客人","喜羊羊","奇异博士"]
            }
        });
        div.movies.push("穿越火线");
    </script>
</body>
```



**v-for遍历对象**

```
<body>
<ul id="d1">
    <li v-for="(k,v,i) in info">{{k}}:{{v}}:{{i+1}}</li>
</ul>
    <script>
        new Vue({
           el: "#d1",
           data: {
               info: {
                   name: "sjh",
                   age: 18,
                   gender: "male"
               }
           }
        });
    </script>
</body>
```



**v-for虚拟DOM的影响 ，需要添加一个:key属性来作为复用的标志**











###### v-html

​	可以解析html标签

```
<div id="d1" v-html="url">{{url}}</div>
<div id="d1" v-html="url"></div>	//可以不加内容
<script>
    new Vue({
        el: "#d1",
        data: {
        	url: "<a href=http://www.baidu.com>百度一下</a>"
        }
    });
</script>
```



###### v-once

​	使的vue的某个变量失去了响应式的特征

```
<div id="d1">
    <h2>{{message}}</h2></br>
    <h2 v-once>{{message}}</h2></br>	//仅仅h2标签里的message变量不改变
    <button v-on:click="change()">点击改变</button>
</div>


<div id="d2" v-once>		//标签里的message全都不变
    <h2>{{message}}</h2></br>
    <h2>{{message}}</h2></br>
    <button v-on:click="change()">点击改变</button>
</div>
```

###### v-on:event

​	绑定事件，函数必须是vue对象的属性

###### @event

​	绑定事件的语法糖

​	传参:

```
<button @click="click()"></button>	什么也不传
<button @click="click"></button>	如果不加小括号，传递的是事件对象
<button @click="click(arg1,arg2,$event)"></button>	如果参数过多，可以使用$event来传递事件对象
```



###### @event.stop

​	阻止此事件的冒泡

​	Event.stopPropagation

###### @event.prevent

​	阻止默认行为

​	Event.preventDefault

###### @event.native

​	默认vue组件如果设置监听的事件的话，比如@click，是不会触发的，如果想要触发，就需增加此标记

```
<my-component @click.native="click"></my-component>
```



###### @keyup.13

​	按下code为13的键触发事件

###### @keyup.enter

​	按下enter键触发事件

###### @event.once

​	此事件只会触发一次

###### @load

​	vue对图片的onload事件做了封装，就是load，情况为better-scroll的refresh方法时机，必须在所有图片都加载完成后再refresh

###### mustache

​	mustache语法，mustache(胡子)

###### v-pre

​	原样显示{{message}}

###### v-text

```
<div id="d1" v-text="message"></div>	等价于		<div id="d1">{{message}}</div>
```



###### v-cloak

​	根据v-cloak的有无来判断元素是否应该隐藏



###### v-bind

​	给标签属性动态赋值

​	语法糖为	

```
<a :href="url">百度</a>			等价于			<a v-bind:href="url">百度</a>
```



![58859957794](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588599577946.png)

```
<div id="d1">
    <a :href="url">百度</a>
    </br>
    <a v-bind:href="url">百度</a>
</div>
<script>
    new Vue({
        el: "#d1",
        data: {
            url: "https://www.baidu.com"
        }
    });
</script>
```



###### v-bind-class

​	**动态绑定class属性（普通语法），直接取值**

```
    <div id="d1">
        <h3 :class="isActive" @click="change()">你好啊</h3>
    </div>
    <script>
        new Vue({
            el:"#d1",
            data:{
                isActive:'active'
            }
        });
    </script>
```



###### v-bind-class

​	**动态绑定class属性（对象语法），根据布尔值判断此类该不该留**

​	:class={class1:boolean1,class2:boolean2}

​	如果boolean1为true，那么class1会被加上

```
    <div id="d1">
        <h3 :class="{active:isActive}" @click="change()">你好啊</h3>
    </div>
    <script>
        new Vue({
            el:"#d1",
            data:{
                isActive:true
            },
            methods:{
                change:function () {
                    this.isActive = !this.isActive;
                }
            }
        });
```



###### v-bind-class

​	**动态绑定class属性（方法语法），根据方法的返回值添加类 **

```
    <div id="d1">
        <h3 :class="getClasses()">你好啊</h3>
    </div>
    <script>
        new Vue({
            el:"#d1",
            methods: {
                getClasses: function () {
                    return 'active';
                }
            }
        });
    </script>
```



###### v-bind-class

​	**动态绑定class属性（数组语法），从数组中取值**

```
<div id="d1">
    <h3 :class="['active','line','float']">你好啊</h3>
</div>
<script>
    new Vue({
        el:"#d1",
    });
</script>
```



###### v-bind-style

​	**根据对象绑定，传递一个对象参数，对象里有键值对**

```
    <div id="d1">
        <h5 :style="style">我是字,可大可小</h5>
        <button @click="change()">魔法按钮</button>
    </div>
<script>
    const v = new Vue({
        el:"#d1",
        data:{
            style: {
                color:'red',
                fontSize:'16px'
            }
        },
        methods: {
            change: function () {
                if(this.style.fontSize == '50px')
                    this.style.fontSize = '16px';
                else
                    this.style.fontSize = '50px';
            }
        }
    });
</script>
```



###### v-if

​	如果成立，显示此内容，如果不成立，此内容就消失

```

```



###### v-else

​	顺序读就完事儿了

```

```



###### v-else-if

###### key

###### v-show

​	和v-if的区别就是v-show隐藏的标签方式为display: none

​	v-if就不会有那个标签





###### v-model

​	主要是用来收集表单数据(我就不用再费劲去找这个数据了)，实现双向绑定......

​	**v-model配合input输入框**

```
<body>
<div id="app">
    <input type="text" v-model="name">
    <h2>{{name}}</h2>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            name: ""
        }
    });
</script>
</body>
```



​	**v-model配合radio**

​		选择相应的男或女，sex属性就会被设置为男或女

```
<body>
<div id="app">
    <input type="radio" v-model="sex" value="男">男
    <input type="radio" v-model="sex" value="女">女
    <h1>{{sex}}</h1>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            sex: "女",
        }
    });
</script>
</body>
```



​	**v-model配合单选CheckBox**

```
<body>
<div id="app">
    <input type="checkbox" v-model="agree">同意协议
    <button :disabled="!agree">下一步</button>
    <h2>{{agree}}</h2>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            agree: false
        }
    });
</script>
</body>
```



​	**v-model配合多选框**

```
<body>
<div id="app">
    <input type="checkbox" value="篮球" v-model="hobbies">篮球
    <input type="checkbox" value="足球" v-model="hobbies">足球
    <input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
    <input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
    <h2>{{hobbies}}</h2>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
            hobbies: []
        }
    });
</script>
</body>
```



###### v-model.lazy

###### v-model.number

###### v-model.trim









#### 组件

###### Simple Example

```
<body>
<div id="app">
    <component-1></component-1>
    <component-1></component-1>
    <component-1></component-1>
</div>
<script>
    let component = Vue.extend({
        template: `
            <div>
                <h2>我是组件标题</h2>
                <span>我是组件内容111</span>
                <span>我是组件内容222</span>
            </div>
            `

    });

    Vue.component('component-1', component);

    new Vue({
        el: "#app"
    });
</script>
</body>
```



###### 父子组件

```vue
<body>
<div id="app">
    <p-cpn></p-cpn>
</div>
<script>
    let s = Vue.extend({
       template: `
            <div>
                <h2>我是子标题</h2>
                <p>我是子内容</p>
            </div>
       `
    });
    let f = Vue.extend({
        template: `
            <div>
                <h2>我是父标题</h2>
                <p>我是父内容</p>
                <sCpn></sCpn>
            </div>
       `,
        components: {
            sCpn: s,
        }
    });
    Vue.component('p-cpn',f);
    new Vue({
       el: "#app"
    });
</script>
</body>
```



###### 组件的语法糖

```
#直接在Vue.component方法中传入模板对象用来注册全局模板
<script>
    Vue.component('cpn',{
    	template: ``
    })
</script>


#在Vue中注册局部模板
<script>
    new Vue({
       el: "#app",
       components: {
           'cpn': {
               template: `
                    <div>
                        <h2>我是标题</h2>
                        <p>我是内容</p>
                    </div>
               `
           }
       }
    });
</script>
```



###### 模板分离的写法

​	**使用\<script标签\>**

```

```



​	**使用\<template\>标签**

```
<body>
<div id="app">
    <cal></cal>
    <cal></cal>
    <cal></cal>
    <cal></cal>
    <cal></cal>
    <cal></cal>
</div>
<template id="cal">
    <div>
        <button @click="count++">+</button>
        {{count}}
        <button @click="count--">-</button>
    </div>
</template>
<script>
    new Vue({
        el: "#app",
        components: {
            'cal': {
                template: "#cal",
                data(){
                    return {count: 0}
                }
            }
        }
    });
</script>
</body>
```



###### 模板中使用变量

​	在模板中定义data属性

​	**模板中的data属性必须是函数**

​	因为如果是一个对象的话，多个模板会共享这个变量，导致错误

```
<body>
<div id="app">
    <cal></cal>
    <cal></cal>
    <cal></cal>
    <cal></cal>
    <cal></cal>
    <cal></cal>
</div>
<template id="cal">
    <div>
        <button @click="count++">+</button>
        {{count}}
        <button @click="count--">-</button>
    </div>
</template>
<script>
    new Vue({
        el: "#app",
        components: {
            'cal': {
                template: "#cal",
                data(){
                    return {count: 0}
                }
            }
        }
    });
</script>
</body>
```



###### 父向子组件通信props

​	**props**

​	子组件添加props属性，用于声明子组件用到的父组件的变量信息

```
props: {
    ...
}
```



​	需要在调用子组件的地方使用v-bind给子组件声明的props各个属性赋值

```
<cpn :prop1="父组件中的属性名" :prop2="父组件中的属性名"></cpn>
```



- ​		props: ['prop1','prop2','prop3'......]	声明子组件用到的变量名

- ​                props: {prop1:type1,prop2,type2}

  ```
  props: {
      cname: String,
      cage: Number
  }
  ```

- ​                 props:{prop1:{},prop2:{}......}

  ```
  props: {
      cname: {
          type: String,
          required: true,
          default: "defaultValue"
      },
      cinfo: {
          type：Object,
          ......
      }
  }
  ```

  

```
<body>
<div id="app">
    <cpn :c-info="info"></cpn>
</div>
<template id="cpn">
    <div>
        <ul>
            <li v-for="(k,v) in cInfo">{{k}}:{{v}}</li>
        </ul>
    </div>
</template>
<script>
    function Person(name,age,address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    new Vue({
       el: "#app",
       data: {
           info: {
               name: "商佳辉",
               age: 18,
               address: "安阳市北关区"
           }
       },
        components: {
           "cpn": {
               template: "#cpn",
               props: {
                   cInfo: Object
               }
           }
        }
    });
</script>
</body>
```



###### 子向父通信$emit

​	自定义事件，由子调用this.$emit方法触发自定义事件，父监听此自定义事件

```
<body>
<div id="app">
	#会自动的传入[this.$emit('first-emit',item)]这里要求的参数，所以不需要加小括号
    <cpn @first-emit="handleEvent"></cpn>
</div>
<template id="zi">
    <div>
        <button v-for="item in categories" @click="btnClick(item)">{{item}}</button>
    </div>
</template>
<script>
    const v = new Vue({
        el: "#app",
        components: {
            "cpn": {
                template: "#zi",
                data(){
                    return {categories: ['手机数码','零食产业','服装产业','软件工程']}
                },
                methods: {
                    btnClick(item){
                        this.$emit('first-emit',item);
                    }
                }
            }
        },
        methods: {
            handleEvent(item) {
                console.log(item);
            }
        }
    });
</script>
</body>
```



###### 父组件拿子组件

​	**$children**

​		可以拿，但是不太灵活，因为是个数组

​	**$refs**

​		$refs.key

```
#给子组件添加一个ref
<cpn ref="key1"></cpn>

#在父组件中就可以使用$refs.key调用
```



#### 插槽

​	slot

###### 普通插槽

​	可以定义默认元素

```
<body>
<div id="app">
    <cpn>
        <span>插入插槽</span>
    </cpn>
</div>
<template id="zi">
    <div>
        <h2>我是标题</h2>
        <p>我是内容</p>
        <slot><button>默认按钮</button></slot>
    </div>
</template>
<script>
    new Vue({
        el: "#app",
        components: {
            "cpn": {
                template: "#zi"
            }
        }
    });
</script>
</body>
```



###### 具名插槽

​	当一个组件中有多个slot时，应该为每一个slot指明名字，插入时根据名字插入

```
<body>
<div id="app">
    <cpn>
        <span slot="left">插入插槽</span>
    </cpn>
</div>
<template id="zi">
    <div>
        <slot name="left"><button>左边</button></slot>
        <slot name="center"><button>中间</button></slot>
        <slot name="right"><button>右边</button></slot>
    </div>
</template>
<script>
    new Vue({
        el: "#app",
        components: {
            "cpn": {
                template: "#zi"
            }
        }
    });
</script>
</body>
```



###### 作用域插槽

​	父组件想使用子组件的内容进行重新渲染，但是拿不到 子组件的变量啊!!!

​	这个时候可以使用作用域插槽

​	<https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD>







#### 模块化

###### export

```
export let num = 10;	#直接导出num

export {}		导出这个对象

export function f1(){}	#导出这个函数

export default xxx	只能导出一个，import的时候可以自己取名字
```



###### import

```
import {var1,var2} from "path/from/some/file"

import * as info from "path/from/some/file"

可以使用info.name等
```





#### webpack

​	https://webpack.js.org

​	<https://www.webpackjs.com/>

​	模块化打包工具

###### 安装webpack

​	需要node环境

```
npm install webpack@3.6.0 -g

webpack -v
```



###### 打包文件

```
webpack /path/from/some/where /path/to/some/where
```



###### 智能打包

​	**创建项目根路径下的webpack.config.js文件**

```javascript
1.在命令行	npm init	生成package.json文件

2.编辑webpack.config.js文件

const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    }
}

3.执行webpack命令
```



###### 安装本地的webpack

```
在命令行输入
npm install webpack@3.6.0 --save-dev
```



**编辑package.json文件**

![58877194157](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588771941570.png)



###### 模块化打包css文件

​	**安装**style-loader

```
npm install style-loader --save-dev
```



​	**安装**css-loader

```
npm install --save-dev css-loader
```



​	**编辑webpack.config.js文件**

​		==style-loader==: 解析`css`语法

​		==css-loader== : 解析`@import`标签

```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
```



​	**在main.js中引入css文件**

```
import css  from "./css/normal.css"
```



​	**然后直接打包**

```
npm run build
```





###### 打包less文件

​	**安装less的loader**

```
npm install --save-dev less-loader less
```



​	**package.json的各个loader的版本，以后如果报错就改一下版本，并执行npm -i**

​	**现在我还不会node.js，以后一定会**

```
  "devDependencies": {
    "css-loader": "^3.5.3",
    "less": "^3.9.0",
    "less-loader": "^4.1.0",
    "style-loader": "^1.2.1",
    "webpack": "^3.6.0"
  }
```



​	**import**

```
import less from "./css/special.less"
```



​	**重构**

```
npm run build
```



###### 处理图片

​	**安装url-loader**

```
npm install --save-dev url-loader
```

​	**安装file-loader**

```
npm install --save-dev file-loader
```

​	**配置webpack.config.js文件**

```
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8196,
                            name: 'image/[name].[hash:16].[ext]'
                        }
                    }
                ]
            }
```



![58881443443](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588814434436.png)





###### ES6->ES5

​	**安装loader**

```
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
```

​	**编辑webpack.config.js文件**

![58881622773](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588816227734.png)



###### 配置VUE

​	**安装vue模块**

```
npm install --save vue
```

​	**导入Vue模块**

```
import Vue from 'vue'
```

​	**如果直接运行的话，会报一下错误**

![58881746195](C:\Users\dell\AppData\Local\Temp\1588817461954.png)

​	**解决方案如下**

​		编辑webpack.config.js文件

![58881769257](C:\Users\dell\AppData\Local\Temp\1588817692573.png)





###### 使用.vue文件

​	.vue文件主要是用来开发时模块化的，做到了分离模块的效果



​	**安装loader**

```
npm install vue-loader vue-template-compiler --save-dev
```



​	**修改webpack.config.js文件**

![58881972208](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588819722084.png)

**.vue文件，就是一个组件**

![58882049280](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588820492801.png)











###### 导入文件后缀名是否省略

```
在 import xxx from "xxx.js"时
```



​	默认js文件后缀名可以省略，vue文件不能省略，如果想自定义规则

​	**配置方法如下**

​	**编辑webpack.config.js文件**

![58882035055](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588820350555.png)

###### 配置文件分离

​	**安装**

```
npm install webpack-merge --save-dev
```



​	**分离配置文件**

![58883104078](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588831040789.png)



在dev.config.js或production.config.js中引入base.config.js的配置

```
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");
module.exports = webpackMerge(baseConfig,
    {
        devServer: {
            contentBase: './dist',
            inline: true,
            port: 8081
        }
    }
);
```



更改package.json，指定配置文件运行路径

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config=./build/production.config.js",
    "dev": "webpack-dev-server --config=./build/dev.config.js"
  },
```







##### plugins

###### 版权plugin

![58882160361](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588821603610.png)



###### 打包index.html

​	**安装插件**

```
npm install html-webpack-plugin --save-dev
```

​	**编辑webpack.config.js**

![58882317258](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588823172582.png)

如果报错的话，编辑package.json文件，修改html-webpack-plugin的版本为3.2.0



###### js压缩插件

​	**安装插件**

```
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```



​	**编辑webpack.config.js文件**

![58882382236](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588823822367.png)





##### webpack-dev-server

​	**安装**

```
npm install webpack-dev-server@2.9.3 --save-dev		#在局部安装
```



​	**配置webpack.config.js文件**

![58882981986](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588829819865.png)







##### CLI:

​	Commend Line Interface

​	脚手架，自动配置webpack的繁重配置

​	需要node环境和webpack环境

​	<https://cli.vuejs.org/zh/guide/installation.html>



###### 安装脚手架

```
npm install -g @vue/cli
```



###### 安装2.x的脚手架

```
npm install -g @vue/cli-init
```



###### 拉取2.x的脚手架模板

```
vue init webpack my-project
```



###### 使用脚手架3.x

```
vue create project_name
```





#### 改变URL不请求资源的方法

###### location.hash

###### history.pushState()

###### history.replaceState()

​	不能后退

###### history.go()

​	回退，可以跟参数，-2表示回退2步，正3表示前进3步

###### history.bask()

​	相当于回退一步





#### Route

​	前端路由

###### vue-route的下载

```
npm install vue-route --save		#运行时依赖
```



##### 使用步骤

###### 1.配置路由插件

​	在src目录下创建router目录，并创建index.js

```
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRoute)
```



###### 2.创建路由对象并配置映射信息

​	配置前端url和component的映射

```
import Home from '../components/Home'
import About from "../components/About"

let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
];
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router;
```





###### 3.注册路由信息

​	在main.js中注册

![58890119649](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588901196494.png)

###### 4.配置默认路由

![58890131156](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588901311565.png)

###### 5.改变地址栏的模式

![58890136143](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588901361432.png)





###### 6.渲染路由组件

​	在App.vue中渲染

![58890144679](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588901446793.png)



###### router-link

​	属性:

​		tag:				将router-link替换为什么标签(默认为a标签)

​		replace:			历史将不会被记载

​		active-class:		可以自定义组件处于激活状态时的类名



###### 代码实现跳转

​	我喜欢!!!

![58890269987](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588902699871.png)





##### 动态路由

​	根据请求参数来进行不同的渲染

###### 配置path路径

​	在index.js中配置

​	使用        ``:userId``    作为占位符

![58890467845](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588904678456.png)



###### 在前端传入数据

![58890477751](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588904777515.png)



###### 接受传来的数据

​	this可以省略

![58890484293](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588904842932.png)





###### router&route

​	你应该知道区别

​	router就是我们创建的路由对象

​	route是当前路由











##### 路由懒加载

​	当我们的项目过大时，如果不采用路由懒加载，就会使所有的组件都在一个js文件中，导致客户访问时，数据量较大，会有短暂的空白期

​	使组件对象不再是具体的组件，而是一个可以获得组件的函数，那么函数的体积肯定要远小于原组件对象的体积，当前端用到了此组件时，就会调用此函数，向服务器请求此js文件，达到了路由的懒加载

![58890738031](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588907380316.png)





##### 嵌套路由

​	在一个路由组件中再嵌套路由

​	在index.js中配置

![58890972596](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588909725966.png)











##### 参数传递

###### params参数传递

​	使用类restful风格的URL进行传递参数，配置有点麻烦

​	**使用$route.params.key取数据**

​	**详细请看动态路由**





###### query参数传递

​	使用?进行参数传递

​	**使用$route.query.key取数据**

**前端可以这样传输数据:**

![58891616810](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588916168104.png)

```
如果采用编码方式:

	this.$router.push({
        path: '',
        query: {
            key1: value1...
        }
	})
```







**组件可以这样接受数据**

![58891621060](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588916210608.png)









##### 导航守卫

<https://router.vuejs.org/zh/guide/advanced/navigation-guards.html>

###### 全局路由导航守卫

​	监听全局路由跳转，是**路由跳转的拦截器**

###### 单一路由导航守卫

​	监听指定的路由跳转

###### 单一组件导航守卫

​	监听指定的组件路由跳转









##### keep-alive

​	使组件能够重复利用，不被销毁

```
<keep-alive exclude="name1,name2..." [include="name1,name2..."]>
	<component-tag></component-tag>
</keep-alive>
```



![58892936888](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1588929368885.png)



​	**exclude**

​		不包含的组件名称(黑名单)

​	**include**

​		包含的组件名称(白名单)





#### Promise

​	promise是ES6的一个新特性，它可以支持我们对异步操作进行链式编程，以达到思路清晰，模块分明的目的

​	也是回调地狱的解决方案

​	<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise>



```
new Promise(function(resolve, reject) {...} /* executor */  );
```

​	

​	resolve是一个函数，执行此resolve就表示进入promise的then方法环节

​	reject是一个函数，执行此函数，就表示进入promise的catch方法环节



```
new Promise((resolve,reject) => {
    setTimeout(() => {
    	...
  		resolve(args);		//会跳转到then方法的执行      
    });
}).then(args => {
    return arg;	//相当于return new Promise((resolve,reject) => {resolve(arg)})
    			//也相当于 return Promise.resolve(arg)
}).then(arg => {...})
```



**模拟异步操作的案例**

```
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("aaa");
          console.log("aaa");
          console.log("aaa");
          resolve("aaa");
        }, 1000);
      })
        .then(arg => {
          console.log(arg + " 执行完毕");
          return new Promise(resolve => {		//这里返回new Promise是为了让后面调用then方法
            setTimeout(() => {
              console.log("bbb");
              console.log("bbb");
              console.log("bbb");
              resolve("bbb");
            }, 1000);
          });
        })
        .then(arg => {
          console.log(arg + " 执行完毕");
          return new Promise(resolve => {
            setTimeout(() => {
              console.log("ccc");
              console.log("ccc");
              console.log("ccc");
            },1000);
          });
        });
```



**如果需要同时并行两个异步事件，并且需要两个异步事都完成后执行代码，可以使用Promise.all方法**









#### VueX

<https://vuex.vuejs.org/>

```
npm install vuex --save
```

##### store

```
import Vue from 'vue'
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store		//因为要在main.js中注册
```



##### state

​	存储变量

##### mutations

​	存储函数，所有函数第一个参数皆为state

##### getters

​	相当于computed，第一个参数为state，第二个参数为getters

##### actions

​	处理异步操作的函数，可以方便我们使用Chrome插件调试

##### modules

​	模块化，因为单一状态数比较大，我们可以模块化细分，每个模块又都可以有自己的单独的属性





#### axios

<http://www.axios-js.com/zh-cn/docs/>

###### 安装

```
npm install axios --save
```



###### **一般自己先封装一下axios**

```
import axios from 'axios';

function axiosProxy(options){
  return axios(options);
}

axiosProxy.prototype.create = (options) => {
  const instance = axios.create(options);
  return (options) => {
    return instance(options);
  }
}

export default axiosProxy;
```





###### 请求参数

​	请求参数自己去网站查看

​	可以定义全局默认的baseconfig，可以定义每个instance默认的baseconfig



###### 创建实例

​	通常用于项目结构比较大，有多个http请求并且配置不尽相同



**创建实例**

```
const instance = axios.create(config)	//config为promise对象
instance(options)
```



###### 拦截器

​	全局请求拦截器

```
axios.interceptors.request.use(config => {},error => {})
```

​	全局响应拦截器

```
axios.interceptors.response.use(result => {},error => {})
```

​	实例请求拦截器

```
instance.interceptors.request.use(config => {},error => {})
```

​	实例响应拦截器

```
instance.interceptors.response.use(config => {},error => {})
```





