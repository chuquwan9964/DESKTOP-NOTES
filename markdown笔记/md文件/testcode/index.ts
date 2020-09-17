class MinClass<T>{
  public list:T[]=[]
  add(value:T):void{
      this.list.push(value)
  }
  min():T{
      var minNum = this.list[0]
      for(let i in this.list){
          if(minNum>this.list[i]){
              minNum = this.list[i]
          }
      }
      return minNum
  }
}

var m = new MinClass<number>() //实例化类 指定类的T的类型是number

m.add(1)
m.add(3)
m.add(2)
m.add(1)
m.add(5)

var m2 = new MinClass<string>()

m2.add('f')
m2.add('c')
m2.add('d')
m2.add('b')
m2.add('a')

console.log(m.min(),m2.min())

