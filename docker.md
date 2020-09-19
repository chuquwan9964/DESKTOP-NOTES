## Docker

#### 1.docker的安装

##### 1.1.使用清华镜像下载docker

<https://mirrors.tuna.tsinghua.edu.cn/>

下载repo文件至/etc/yum.repos.d/

```
wget https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

##### 2.2.安装

```
yum install -y docker-ce
```



#### 2.docker对象

​	docker有对象的概念，以下列出了docker的对象

```
  builder     Manage builds
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  engine      Manage the docker engine
  image       Manage images
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

```



#### 3.docker命令

​	**docker的命令模式为:	docker [options] command**

##### docker image

###### docker image ls

docker image pull

docker image inspect

docker image load

docker image save

docker image push

docker image tag

docker image rm

docker image build

​	docker image build -t | --tag

​		build时就指定镜像的tag

​	docker image build --build-arg

​		指定build时的变量

##### docker container

docker container attach

docker container commit

docker container create

docker container stop

docker container start

docker container restart

docker container rm

docker container exec

docker container kill

docker container top

docker container inspect

docker container stats

##### docker run

docker run -i

docker run -t

docker run --name

docker run -d

docker run --network

​	指定网络模式

docker run --rm

docker run -h | --hostname

​	指定主机名

docker run --dns

docker run --dns-search

docker run -p

​	container容器中运行的服务在虚拟网络地址上，但是我们想让他暴露出来以便用户访问，我们可以将其转换

​	docker run -p \<containerPort\>

​		将container的指定端口映射为宿主机的随机动态端口

​	docker run -p \<hostPort\>:\<containerPort\>

​		将宿主机的指定端口映射为container的指定端口

​	docker run -p \<ip\>:\<containerport\>

​		将container的指定端口映射为宿主机的指定ip的随机动态端口

​	docker run -p \<ip\>:\<hostPort\>:\<containerport\>

​		将container的指定端口映射为宿主机的指定ip的指定端口

docker run -v  CONTAINER_DIR

​	指定docker容器的存储卷为managed模式，并指定在容器中的挂载路径

docker run -v HOST_DIR:CONTAINER_DIR

​	指定docker容器的存储卷为bind-mount模式，并指定双方的挂载路径

docker run --volumes-from container_name

​	指定使用某一容器的卷模式

docker run -e | --env

​	指定此镜像执行时的变量列表，变量可以在dockerfile中定义



##### docker network

​	docker network ls

​	docker network create

​	docker network inspect

​	docker network rm

##### docker exec

##### docker top

##### docker stats

#### 4.docker网络模型

​	1.container只有loop这个网络接口，也就无法与外部通信，是个 孤岛

​		对应为--network none

​	2.container有独立的namespace，有独立ip

​		对应为--network brideg(默认的)

​	3.container之间共用网络相关的namespace，不同容器共用ip

​		对应为联盟式容器

​	4.container与宿主机共用网络的namespace，与宿主机共用ip

​		对应为--network host

#### 5.docker容器与外部物理网络通信

​	详见docker run命令的-p参数，在上面有

#### 6.联盟式容器

​	在创建容器时指定network为需要联盟的容器的name

```
docker run --name web2 -d --network container:web1 nginx:1.14-alpine
```



#### 7.修改默认docker0的IP地址

​	编辑/etc/docker/daemon.json文件

```
{
    "bip": "ip/netmask"
}
```





#### 8.让docker监听网络地址

​	不安全呀

​	编辑/etc/docker/daemon.json文件

```
{
    "hosts": ["tcp://0.0.0.0:2375","unix:///var/run/docker.sock"]
}
```



#### 9.自己添加docker网络

​	docker network create命令



#### 10.docker的卷

​	因为在docker容器中存取数据效率不佳并且docker容器为一次性的，删除后数据就消失了，因此我们必须找一个安全且稳定的存储位置来存储我们的数据

​	自定义在宿主机上的挂载位置

​	让docker自动配置在宿主机上的挂载位置

​	docker run -v CONTAINER_DIR

​	docker run -v HOST_DIR:CONTAINER_DIR

​	docker run --volumes-from CONTAINER_NAME



#### 11.Dockerfile

​	第一个非注释行必须写FROM指令

```
# My first docker image and it builds in 2020/05/22
FROM busybox
LABEL maintainer="chuquwan9964 chuquwan9964@gmail.com"
COPY index.html /data/web/html/
COPY yum.repos.d /etc/yum.repos.d/
WORKDIR /usr/local/
ADD http://nginx.org/download/nginx-1.18.0.tar.gz ./
...
```



​	指令:

##### FROM

​	格式:

##### MAINTAINER

​	作者信息，已废弃

##### LABEL

​	格式:

##### COPY

​	将当前环境下的文件或目录拷贝到镜像环境下的某一位置

​	格式:	COPY \<src\>... \<dest\>

​			COPY ["\<src\>","\<src\>"...,\<dest\>]

​	src:	当前制作dockerfile的目录或其子目录下的文件或目录（不能是父目录）

​	dest:  在镜像文件系统中的路径，一般写为绝对路径，**如果是目录，一定要以'/'结尾**

##### ADD

​	与copy基本一致，只不过ADD指令的src可以引用URL

​	如果引用的是本地的tar.gz文件，那么会自动解压

​	如果引用的是网络上的tar.gz，那么不会解压

```
ADD http://nginx.org/download/nginx-1.18.0.tar.gz /usr/local/	# 不会解压
ADD nginx-1.18.0.tar.gz /usr/local/	# 会解压
```



##### WORKDIR

​	指定工作目录

​	在此工作目录下的指令路径可以使用以此工作目录为根目录的相对路径

```
WORKDIR /usr/local/
ADD http://nginx.org/download/nginx-1.18.0.tar.gz ./	# 可以使用./作为相对路径
```



##### VOLUME

​	指定需要挂载的卷，只能指定容器的位置，不能指定宿主机的位置，因为宿主机的位置是未知的，不可以盲目指定

```
VOLUME /data/mysql/
```



##### EXPOSE

​	指定可以暴露的端口，**运行镜像时需要指定-P选项来运行此端口映射**

​	只能指定容器端口，不能指定宿主机的端口，因为宿主机的端口和地址是未知的，不能盲目制定

​	语法:	EXPOSE \<port\>[\<protocol\>] \<port\>[\<protocol\>] ...

```
EXPOSE 80/tcp 80/udp
```



##### ENV

​	**只能在RUN的时候可以更改默认**

​	设置container的环境变量

​	ENV \<key\> \<value\>	只能设置一个

​	ENV \<key\>=\<vaue\> ...	可以设置多个

​	![59014076938](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1590140769386.png)



##### RUN

​	在build的时候执行

​	RUN \<command\>

​	RUN \<"executable","param1","param2"\>

​	![59014158862](F:\360MoveData\Users\dell\Desktop\学习笔记\图片\1590141588624.png)









##### CMD	

​	在run的时候执行

​	cmd为容器run的时候运行的命令，因为容器本身就是为了运行单独的进程而存在的，所以当定义多个CMD时，最后一个CMD会生效

​	格式:

​		CMD \<command\>

​		CMD [\<"executable","param1","param2"\>]	可以运行多个命令

​		CMD [\<param1\>,\<param2\>]



​	前两种格式的区别:

​		第一种：是由/bin/sh执行的，因此可以使用管道或通配符等shell的特有操作，刚启动时pid为1的进程是shell进程而不是我们运行的进程，但是随后pid会替换至我们运行的进程，**因为pid为1才可以接受信号，比如docker stop等信号**

​		第二种：是由内核直接启动，因此不能使用特殊操作，但是可以投机取巧，例如:

```
CMD ["/bin/sh","-c","......"]
```

​		第三种：如果有ENTRYPOINT指令，那么CMD指令中的所有数据都是ENTRYPOINT指令的参数



##### ENTRYPOINT

​	用法类似于CMD

​	ENTRYPOINT指令无法被run后跟命令替换，例如

```
docker run --name web1 -d nginx:v1 /bin/sh	# 无法替换
```



##### USER

​	指定运行期间的用户身份

​	格式：

​		USER UID | USERNAME

##### HEALTHCHECK

​	语法：

​		HEALTHCHECK \[OPTIONS\]	 [COMMAND]

​		**COMMAND需要使用CMD+命令**

​		OPTIONS:

​			--interval	时间间隔，多长时间检查一次默认为30s

​			--timeout	检查的超时时长默认为30s

​			--start-period	第一次检查前的等待时间默认为0s

​			--retries		检查失败的重试次数默认为3

​		COMMAND's return code

​		0:	SUCCESS	健康

​		1:	UNHEALTHY	不健康

​		2:	RESERVED	保留，可以自定义



##### SHELL

##### STOPSIGNL

##### ARG

​	只能在build阶段使用的参数

​	**在build阶段可以修改默认值，因此我们可以灵活运用**

##### ONBUILD









#### 12.私有仓库

​	insecure-registries: [""]

​	docker-registries

​	harbor

​	<https://github.com/goharbor/harbor/releases/download/v2.0.0/harbor-offline-installer-v2.0.0.tgz>



#### 13.系统资源限制及验证



##### Memory

​	docker run | create -m | --memory

​		指定容器可用物理内存的大小

​	docker run | create --memory-swap *

​		指定容器可用交换内存的大小,必须与-m一块用，规则如下

​	docker run | create --memory-swappiness

​		0表示对于交换内存能不用就不用，100表示交换内存能用就用

​	docker run | create --oom-kill-disable

​		如果指定此选项，则容器如果产生oom也不会被kill





##### CPU

​	docker run | create --cpus=\<value\>

​		docker run --cpus=2	只能用2核

​	docker run | create --cpuset-cpus	限定此容器能够使用的cpu的哪些核上

​		docker run --cpuset-cpus 0,1	只能运行在0,1号cpu核上

​	

