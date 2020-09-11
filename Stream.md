#### Stream

##### Stream creation

​	流的创建

###### 1.Stream.of(T... t)

​	可以不同元素组合

```
Stream.of(1,"hello",1.1,new Person()).forEach(System.out::println);
```



###### 2.List.stream()

```

```



###### 3.Random.ints()

```
Random random = new Random(47);
//自动将int类型装箱
random.ints().boxed().limit(5).forEach(System.out::println);

random.ints().limit(5).forEach(System.out::println);
//只留5个
random.ints(5).forEach(System.out::println);
//指定上界和下界
random.ints(5,20).forEach(System.out::println);
//指定上界下界和个数
random.ints(5,20,5).forEach(System.out::println);
```



###### 4.IntStream.range(start,end)

​	基本类型的xxxStream.range()和xxxStream.rangeClosed()

​		前一个不包含上界，后一个包含上界

```
IntStream.range(1,10).forEach(System.out::println);

OUTPUT:
1
2
3
4
5
6
7
8
9
```



###### 5.Stream.generate(Supplier s)

```
    static char[] letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();

    public static void main(String[] args) {
        Stream.generate(() -> letters[new Random().nextInt(letters.length)])
                .limit(20)
                .forEach(System.out::print);
    }
    
    
    OUTPUT:
    	FYWPQETKDFOQEBPWMBDE
```



###### 6.Stream.iterate(T seed,UnaryOperator uo)

​	将前一个结果作为后一次的参数

```
Stream.iterate(0,(i) -> i+1).limit(5).forEach(System.out::println);

OUTPUT:
	0
    1
    2
    3
    4
```



```
Fibonacci


static int x = 1;
    public static void main(String[] args) {
        Stream.iterate(0,(i) -> {
        int ret = i+x;
        x = i;
        return ret;
    }).limit(10).forEach(System.out::println);
}


OUTPUT:
0
1
1
2
3
5
8
13
21
34
```



###### 7.Stream.builder

```
Stream.Builder<Object> builder = Stream.builder();
builder.add("h");
builder.add("e");
builder.add("l");
builder.add("l");
builder.add("o");
builder.build().forEach(System.out::println);
```



###### 8.Arrays.stream(T[] arr)







##### Stream Operation



###### skip()

###### peek(Consumer c)

```
IntStream.range(0,20)
       .peek(System.out::println)
       .filter(i -> i > 5)
       .peek(System.out::println)
       .forEach(System.out::println);	//加上这个才会打印
```



###### sorted(Comparator c)

###### distinct()

​	去重

###### filter(Predicate p)

​	为true就留下

###### allMatch(Predicate p)

###### anyMatch(Predicate p)

###### noneMatch(Predicate p)

​	如果有任意一个参数导致p返回false，就立即退出，并返回false

###### map(Function f)

​	Function为:

​		R apply(T t)

###### flatMap(Function f)

​	将Function函数的返回值(必须是流类型)，中的元素取出，并放入当前流中

​	举例：

```
    public static void main(String[] args) {
        Stream.of(1, 2, 3)
        .flatMap(i -> Stream.of("Gonzo", "Fozzie", "Beaker"))
        .forEach(System.out::println);
    }
    
    OUTPUT:
    	Gonzo
        Fozzie
        Beaker
        Gonzo
        Fozzie
        Beaker
        Gonzo
        Fozzie
        Beaker
```

###### reduce(BinaryOperator bo)

​	前一个元素与后一个元素操作合并为一个元素并作为第一个元素传递给下一个元素

```
Stream.of(1,2,3).reduce((i1,i2) -> i1+i2).get()	//6
```





##### Optional

- `ifPresent(Consumer)`：当值存在时调用 **Consumer**，否则什么也不做。
- `orElse(otherObject)`：如果值存在则直接返回，否则生成 **otherObject**。
- `orElseGet(Supplier)`：如果值存在则直接返回，否则使用 **Supplier** 函数生成一个可替代对象。
- `orElseThrow(Supplier)`：如果值存在直接返回，否则使用 **Supplier** 函数生成一个异常。





##### Terminal Operation

- `toArray()`：将流转换成适当类型的数组。
- `toArray(generator)`：在特殊情况下，生成自定义类型的数组。


- `forEach(Consumer)`常见如 `System.out::println` 作为 **Consumer** 函数。
- `forEachOrdered(Consumer)`： 保证 `forEach` 按照原始流顺序操作。
- `parallel()` :  并行操作流


- `collect(Collector)`：使用 **Collector** 收集流元素到结果集合中。
- `collect(Supplier, BiConsumer, BiConsumer)`：同上，第一个参数 **Supplier** 创建了一个新结果集合，第二个参数 **BiConsumer** 将下一个元素包含到结果中，第三个参数 **BiConsumer** 用于将两个值组合起来。


- `reduce(BinaryOperator)`：使用 **BinaryOperator** 来组合所有流中的元素。因为流可能为空，其返回值为 **Optional**。
- `reduce(identity, BinaryOperator)`：功能同上，但是使用 **identity** 作为其组合的初始值。因此如果流为空，**identity** 就是结果。
- `reduce(identity, BiFunction, BinaryOperator)`：更复杂的使用形式（暂不介绍），这里把它包含在内，因为它可以提高效率。通常，我们可以显式地组合 `map()` 和 `reduce()` 来更简单的表达它。


- `allMatch(Predicate)` ：如果流的每个元素根据提供的 **Predicate** 都返回 true 时，结果返回为 true。在第一个 false 时，则停止执行计算。
- `anyMatch(Predicate)`：如果流中的任意一个元素根据提供的 **Predicate** 返回 true 时，结果返回为 true。在第一个 false 是停止执行计算。
- `noneMatch(Predicate)`：如果流的每个元素根据提供的 **Predicate** 都返回 false 时，结果返回为 true。在第一个 true 时停止执行计算。


- `findFirst()`：返回第一个流元素的 **Optional**，如果流为空返回 **Optional.empty**。
- `findAny(`：返回含有任意流元素的 **Optional**，如果流为空返回 **Optional.empty**。


- `count()`：流中的元素个数。
- `max(Comparator)`：根据所传入的 **Comparator** 所决定的“最大”元素。
- `min(Comparator)`：根据所传入的 **Comparator** 所决定的“最小”元素。


- `average()` ：求取流元素平均值。
- `max()` 和 `min()`：数值流操作无需 **Comparator**。
- `sum()`：对所有流元素进行求和。
- `summaryStatistics()`：生成可能有用的数据。目前并不太清楚这个方法存在的必要性，因为我们其实可以用更直接的方法获得需要的数据。







###### 自定义Collector

​	Collector\<T,A,R\>

​		T:流中元素的类型

​		A:中间容器的类型

​		R:最后返回结果的类型

​	Collector由四个模块组成:

​		Supplier\<A\>:提供中间容器的函数

​		Accumulator\<T,A\>:将每个T元素运用到A容器中

​		Combiner\<A,A\>:合并两个容器(在并行情况下)

​		Finisher\<A,R\>:将中间容器转换成返回结果



​	**方式1：实现Collector接口**

​	**方式2：使用Collector.of方法**







