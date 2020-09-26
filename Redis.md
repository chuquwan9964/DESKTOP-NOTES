## Redis

#### 通用命令

##### type 

```shell
type key_name	# 判断此key类型
```

##### exists

​	判断是否存在

##### kets *

​	查询所有的key

##### flushdb

​	清空当前的数据库

##### flushall

​	清空所有的数据库

##### select

​	切换数据库

##### expire

​	设置过期时间

##### ttl

​	查看过期时间

##### del

​	删除一个key

##### dbsize

​	Return the number of keys in the selected database

#### 数据类型及其基本操作

##### strings

​	help @string

###### APPEND key value

###### DECR key

###### DECRBY key decrement

###### GET key

###### GETRANGE key start end

​	Get a substring of the string stored at a key

```shell
get name 0,2	# name[0,2]	都是包含的
```

###### GETSET key value

​	Set the string value of a key and return its old value

###### SET key value [EX seconds|PX milliseconds|KEEPTTL] [NX|XX]

###### SETEX key seconds value

​	Set the value and expiration of a key

###### STRLEN key

###### MSET key value [key value ...]

###### MGET key [key ...]



##### hash

​	

##### list

###### LLEN key

###### LRANGE key start stop

###### LINDEX key index

###### BLPOP key [key ...] timeout

​	Remove and get the first element in a list, or block until one is available

###### BRPOP key [key ...] timeout

###### 	Remove and get the last element in a list, or block until one is available

###### LREM key count element

​	Remove elements from a list

​	因为list是可以重复的，**count**代表移除的个数



###### LTRIM key start end

​	修剪此list

```shell
LTRIM mylist 0 0	# 只留第0个元素
```



###### RPOPLPUSH source destination

​	Remove the last element in a list, prepend it to another list and return it



###### LSET key index element

​	Set the value of an element in a list by its index

```shell
lset mylist 0 value2	# 将0号位置的值替换为value2,如果0号位置没有元素，则会报错
```



###### LINSERT key BEFORE|AFTER pivot element

​	Insert an element before or after another element in a list

```shell
LINSERT mylist before key1 "new value"	# 在key1的前面插入new value
```



##### set

​	`无序，不可重复`

helo @set

######   SADD key member [member ...]

  	summary: Add one or more members to a set

###### SCARD key

​	Get the number of members in a set

######  SMEMBERS key

​	 Get all the members in a set

###### SISMEMBER key member

​	Determine if a given value is a member of a set

###### SREM key member [member ...]

​	Remove one or more members from a set

###### SRANDMEMBER key [count]

​	Get one or multiple random members from a set



###### SPOP key [count]

​	Remove and return one or multiple random members from a set

######  SMOVE source destination member

​	Move a member from one set to another

###### SINTER key [key ...]

​	Intersect multiple sets	返回两个set的交集

###### SDIFF key [key ...]

​	Subtract multiple sets	返回第一个集合对与第二个集合的差集(第一个有，第二个没有)

###### SUNION key [key ...]

​	取set的并集



##### hash

​	理解为 key,Map

###### HSET key field value [field value ...]

​	Set the string value of a hash field

###### HSETNX key field value

​	Set the value of a hash field, only if the field does not exist

###### HSTRLEN key field

​	Get the length of the value of a hash field

###### HVALS key

​	Get all the values in a hash

###### HMGET key field [field ...]

​	Get the values of all the given hash fields

###### HMSET key field value [field value ...]

​	Set multiple hash fields to multiple values

###### HKEYS key

​	Get all the fields in a hash

###### HDEL key field [field ...]

​	Delete one or more hash fields



##### zset

###### ZRANGE key start stop [WITHSCORES]

​	Return a range of members in a sorted set, by index

```shell
127.0.0.1:6379> ZRANGE myzset 0 -1 withscores
1) "wanghuan"
2) "200"
3) "shangjiahui"
4) "1000"
5) "wh"
6) "2000"
7) "sjh"
8) "3000"
```



######  ZREVRANGE key start stop [WITHSCORES]

​	逆序输出，根据索引

```shell
127.0.0.1:6379> ZREVRANGE myzset 0 -1
1) "sjh"
2) "wh"
3) "shangjiahui"
4) "wanghuan"

```



###### ZADD key [NX|XX] [CH] [INCR] score member [score member ...]

​	Add one or more members to a sorted set, or update its score if it already exists

```shell
ZADD myzset 1000 sjh
ZADD myzset 2000 wh
ZADD myzset 1200 shangjiahui
```



###### ZCARD key

​	Get the number of members in a sorted set

######  ZCOUNT key min max

​	Count the members in a sorted set with scores within the given values

```shell
127.0.0.1:6379> ZCOUNT myzset 1000 2000
(integer) 2
```



###### ZREM key member [member ...]

​	Remove one or more members from a sorted set



###### ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

```shell
127.0.0.1:6379> ZRANGEBYSCORE myzset -inf +inf withscores
1) "wanghuan"
2) "200"
3) "shangjiahui"
4) "1000"
5) "wh"
6) "2000"
7) "sjh"
8) "3000"
```

###### ZSCORE key member

```shell
127.0.0.1:6379> ZSCORE myzset sjh
"3000"
127.0.0.1:6379> ZSCORE myzset shangjiahui
"1000"
127.0.0.1:6379> ZSCORE myzset wh
"2000"
127.0.0.1:6379> ZSCORE myzset wanghuan
"200"
```



##### geospatial

​	help @geo

###### GEOADD key longitude latitude member [longitude latitude member ...]

​	Add one or more geospatial items in the geospatial index represented using a sorted set

```shell
GEOADD MAP_NAME 经度 纬度 CITY_NAME 
```



###### GEODIST key member1 member2 [m|km|ft|mi]

​	两者之间的直线距离

###### GEOPOS key member [member ...]

​	Returns longitude and latitude of members of a geospatial index

###### GEORADIUS

​	给定经度纬度查询方圆

```bash
GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]

GEORADIUS MAP_NAME 经度 纬度 130 km # 查找指定经度和纬度方圆130km里的城市

WITHDIST:显示直线距离
WITHCOORD:显示经度纬度
COUNT 5:只显示5个
```



######  GEORADIUSBYMEMBER

​	查询指定城市方圆多少之内的城市

```shell
 GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]

```





##### hyperloglog



​	是一个集合，不允许重复，适用于计数等场景(因为占用内存很小，最大才12kb)

​	提供了一种不太准确的基数统计方法，比如统计网站的 UV，存在一定的误差。



###### PFADD key element [element ...]

​	Adds the specified elements to the specified HyperLogLog.

###### PFCOUNT key [key ...]

​	Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).

###### PFMERGE destkey sourcekey [sourcekey ...]

​	Merge N different HyperLogLogs into a single one.



##### bitmaps

​	Bitmaps 是在字符串类型上面定义的位操作。一个字节由 8 个二进制位组成。

###### SETBIT key offset value

​	Sets or clears the bit at offset in the string value stored at key

###### GETBIT key offset

​	Returns the bit value at offset in the string value stored at key

######   BITCOUNT key [start end]

​	计算一个string中bit位的值为1的位出现的次数

​	Count set bits in a string









#### Transaction

redis事务

##### MULTI

​	开启一个事务

##### EXEC

​	执行Command queue中的命令

##### DISCARD

​	丢弃这个事务

##### WATCH

​	用于实现乐观锁，如果另一个客户端线程更改了watch的对象，那么此次事务的EXEC就会失败，返回nil

​	**秒杀案例**

```java
public class MiaoSha {

    private static final String KEY = "product";

    public static void main(String[] args) {


        ExecutorService executorService = Executors.newFixedThreadPool(30);
        IntStream.range(0,10).forEach(i -> {
            executorService.execute(() -> {
                String user = UUID.randomUUID().toString();
                Jedis jedis = new Jedis("127.0.0.1", 6379);
                jedis.watch(KEY);
                Integer num = Integer.parseInt(jedis.get(KEY));
                if (num < 20) {
                    Transaction tx = jedis.multi();
                    tx.incr(KEY);
                    List<Object> exec = tx.exec();
                    if (exec == null) {
                        System.out.println("["+user+"]秒杀失败,请再接再厉");
                    }else {
                        System.out.println("["+user+"]秒杀成功,开开心心把家回");
                    }
                }else {
                    System.out.println("["+user+"]秒杀结束,请回家把");
                }
                jedis.close();
            });
        });
    }
}
```



##### UNWATCH



##### 事务发生了错误怎么办

​	命令无法入队的错误，所有的命令都无法正常执行(编译时错误)

​	命令可以正常入队，但是在运行时发生了错误，只有运行错误的命令会发生错误，其他命令正常执行





#### redis安全策略

​	默认绑定端口为127.0.0.1

​	默认无密码

##### 绑定端口

​		在redis.conf文件中加入

```bash
bind IP_ADDRESS [IP_ADDRESS]
```



##### 设置密码

​	在redis.conf文件中加入

```bash
requirepass YOUR_PASSWORD
```



​	客户端用以下命令连接带密码的redis_server

```bash
redis-cli -h HOST -p PORT -a PASSWORD
# 或者登陆后验证
AUTH PASSWORD
```



#### redis内存参数

##### 获取内存参数

```bash
CONFIG GET PATTERN
CONFIG GET requirepass
```

##### 设置内存参数

```bash
CONFIG SET VAR_NAME VAR_VALUE
```

##### 将结果保存到配置文件

```bash
CONFIG REWRITE
```



#### redis持久化

​	https://redis.io/topics/persistence

​	自己看文档去

##### RDB

​	`调用save`命令手动存储

​	在配置文件中的配置

```bash
dbfilename FILE_NAME	# rdb持久化文件的存储位置
dir	DIR_PATH						 # rdb持久化文件的目录位置

save 900 1				# 900秒内发生了一次更改，在900秒那一时刻，写入
save 300 10				
save 60 10000
```



##### AOF

​	编辑配置文件

```bash
appendonly no/yes
appendfsync everysec/always/no
```





#### 发布订阅

##### 订阅

​	SUBSCRIBE channel [channel ...]

​	Listen for messages published to the given channels



```bash
127.0.0.1:6379> SUBSCRIBE lovewh
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "lovewh"
3) (integer) 1
# 进入阻塞......
```







##### 发布

​	PUBLISH channel message

```bash
127.0.0.1:6379> PUBLISH lovewh 'I love you wh'
(integer) 1
```





#### 基础管理命令

##### info

​	查看服务器信息

​	INFO [section]

​	Get information and statistics about the server

```bash
127.0.0.1:6379> info
# Server
redis_version:6.0.8
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:d64a997ef13de9e2
redis_mode:standalone
os:Linux 5.4.0-47-generic x86_64
arch_bits:64
multiplexing_api:epoll
atomicvar_api:atomic-builtin
gcc_version:7.5.0
process_id:4663
run_id:352b3a0dc8e1c13fefd144314544f83fbb86f790
tcp_port:6379
uptime_in_seconds:1708
uptime_in_days:0
hz:10
configured_hz:10
lru_clock:6990395
executable:/app/redis-6.0.8/redis-server
config_file:/app/redis-6.0.8/./redis.conf
io_threads_active:0

# Clients
connected_clients:1
client_recent_max_input_buffer:2
client_recent_max_output_buffer:0
blocked_clients:0
tracking_clients:0
clients_in_timeout_table:0

# Memory
used_memory:588128
used_memory_human:574.34K
used_memory_rss:4202496
used_memory_rss_human:4.01M
used_memory_peak:607768
used_memory_peak_human:593.52K
used_memory_peak_perc:96.77%
used_memory_overhead:541618
used_memory_startup:524528
used_memory_dataset:46510
used_memory_dataset_perc:73.13%
allocator_allocated:651672
allocator_active:913408
allocator_resident:3428352
total_system_memory:8108195840
total_system_memory_human:7.55G
used_memory_lua:37888
used_memory_lua_human:37.00K
used_memory_scripts:0
used_memory_scripts_human:0B
number_of_cached_scripts:0
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
allocator_frag_ratio:1.40
allocator_frag_bytes:261736
allocator_rss_ratio:3.75
allocator_rss_bytes:2514944
rss_overhead_ratio:1.23
rss_overhead_bytes:774144
mem_fragmentation_ratio:7.70
mem_fragmentation_bytes:3656880
mem_not_counted_for_evict:0
mem_replication_backlog:0
mem_clients_slaves:0
mem_clients_normal:16986
mem_aof_buffer:0
mem_allocator:jemalloc-5.1.0
active_defrag_running:0
lazyfree_pending_objects:0

# Persistence
loading:0
rdb_changes_since_last_save:0
rdb_bgsave_in_progress:0
rdb_last_save_time:1600824207
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:-1
rdb_current_bgsave_time_sec:-1
rdb_last_cow_size:0
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok
aof_last_cow_size:0
module_fork_in_progress:0
module_fork_last_cow_size:0

# Stats
total_connections_received:5
total_commands_processed:15
instantaneous_ops_per_sec:0
total_net_input_bytes:630
total_net_output_bytes:93317
instantaneous_input_kbps:0.01
instantaneous_output_kbps:10.92
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
expired_stale_perc:0.00
expired_time_cap_reached_count:0
expire_cycle_cpu_milliseconds:32
evicted_keys:0
keyspace_hits:0
keyspace_misses:0
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:0
migrate_cached_sockets:0
slave_expires_tracked_keys:0
active_defrag_hits:0
active_defrag_misses:0
active_defrag_key_hits:0
active_defrag_key_misses:0
tracking_total_keys:0
tracking_total_items:0
tracking_total_prefixes:0
unexpected_error_replies:0
total_reads_processed:21
total_writes_processed:18
io_threaded_reads_processed:0
io_threaded_writes_processed:0

# Replication
role:master
connected_slaves:0
master_replid:5ae88053aa7d561488a5eb8a6b7e49dcc8b31919
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:1.160090
used_cpu_user:1.384046
used_cpu_sys_children:0.000000
used_cpu_user_children:0.000000

# Modules

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=1,expires=0,avg_ttl=0
```



##### monitor

​	实时监控命令

​	MONITOR -

​	Listen for all requests received by the server in real time

```bash
127.0.0.1:6379> monitor
OK

# 阻塞了...
```



​	监控命令写入文件

```bash
redis-cli -h host -p port -a password monitor >> /log
```



​	



#### redis主从

​	SLAVEOF

​		SLAVEOF host port

​		Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.



**配置三个主从**,编辑配置文件

```bash
vim /data/6380/redis.conf

port 6380
daemonize yes
pidfile /data/6380/redis.pid
loglevel notice
logfile /data/6380/redis.log
dir /data/6380
requirepass 123
masterauth 123
slaveof 127.0.0.1 6379

vim /data/6381/redis.conf

port 6381
daemonize yes
pidfile /data/6381/redis.pid
loglevel notice
logfile /data/6381/redis.log
dir /data/6381
requirepass 123
masterauth 123
slaveof 127.0.0.1 6379



vim /data/6382/redis.conf

port 6382
daemonize yes
pidfile /data/6382/redis.pid
loglevel notice
logfile /data/6382/redis.log
dir /data/6382
requirepass 123
masterauth 123
slaveof 127.0.0.1 6379


```



**开启主从**

​	`6379为主库，其余三个为从库`

```bash
redis-server /data/6380/redis.conf
redis-server /data/6381/redis.conf
redis-server /data/6382/redis.conf


redis-cli -p 6380 -a 123 SLAVEOF 127.0.0.1 6379
redis-cli -p 6381 -a 123 SLAVEOF 127.0.0.1 6379
redis-cli -p 6382 -a 123 SLAVEOF 127.0.0.1 6379
```



**解除主从**

```bash
redis-cli -p 6380 -h 127.0.0.1 SLAVEOF no one
```





##### sentinel实现高可用

`相当于mysql的MHA`



> sentinel其实就是一个redis示例，只不过他有监控，读写分离，coordinate主从身份的功能

​	`编辑配置文件`

```bash
mkdir /data/26380
cd /data/26380
vim sentinel.conf
port 26380
dir /data/26380
sentinel monitor mymaster 127.0.0.1 6380 1	# 1代表此redis集群中如果master结点down了，需要多少个票数同意更换master(有多个sentinel)
sentinel down-after-milliseconds mymaster 5000	# 如果主服务器5000毫秒还没有发出心跳，就认为down了
sentinel auth-pass mymaster 123
```



`启动sentinel`

```bash
redis-sentinel /data/26380/sentinel.conf &>  /tmp/sentinel.log &
```



##### Jedis读写分离

`没有发现Jedis支持读写分离，所以自己写了一个简单的读写分离连接池`

```java
package com.chuquwan;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.util.Pool;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

public class SlaveJedisPool extends Pool<Jedis> {

    private final List<JedisPool> slavePools = new CopyOnWriteArrayList<>();

    private String sentinelHost;
    private Integer sentinelPort;
    private String masterName;
    private ThreadLocalRandom random;

    public SlaveJedisPool(String host, Integer port,String masterName, JedisPoolConfig config) {
        Objects.requireNonNull(host);
        Objects.requireNonNull(port);
        Objects.requireNonNull(masterName);
        this.sentinelHost = host;
        this.sentinelPort = port;
        this.masterName = masterName;
        init(config);
    }

    public SlaveJedisPool(String host, Integer port,String masterName) {
        this(host,port,masterName,null);
    }


    private void init(JedisPoolConfig config) {
        Jedis sentinelJedis = new Jedis(this.sentinelHost, this.sentinelPort);
        List<Map<String, String>> slaves = sentinelJedis.sentinelSlaves(this.masterName);
        int size = slaves.size();
        if (slaves == null || size == 0) {
            throw new RuntimeException("此sentinel无slave结点");
        }

        random = ThreadLocalRandom.current();

        slaves.forEach(slavesMap -> {
            String host = slavesMap.get("ip");
            Integer port = Integer.parseInt(slavesMap.get("port"));
            if (config == null) {
                slavePools.add(new JedisPool(host,port));
            }else {
                slavePools.add(new JedisPool(config,host,port));
            }
        });
    }

    @Override
    public Jedis getResource() {
        return this.slavePools.get(random.nextInt(0,slavePools.size())).getResource();
    }
}

```



`测试`

```java
public static void main(String[] args) throws InterruptedException {
    SlaveJedisPool jedisPool = new SlaveJedisPool("127.0.0.1", 26380, "mymaster");
    ExecutorService executorService = Executors.newFixedThreadPool(30);
    IntStream.range(0,1000).forEach(i -> {
        executorService.execute(() -> {
            Jedis resource = jedisPool.getResource();
            resource.auth("123");
            System.out.println(resource.get("lovername"));
            resource.close();
        });
    });
}
```



##### Lettuce读写分离





##### SpringDataRedis









#### redis cluster(分布式)

​	https://www.jianshu.com/p/8af6177f4c23

##### 安装ruby环境

​	目前支持redis分布式的插件只支持redis3.+的版本，因此企业都是使用的redis3.+的版本

```bash
# 安装ruby环境
yum install rubygems -y
apt-get install rubygems

# 配置gem源，并安装驱动
gem source -a http://mirrors.aliyun.com/rubygems
gem source --remove https://rubygems.org/
gem install redis -v 3.3.3
```



`redis分布式中，一般一个分片(物理机)是有两个redis实例(主从)，但是这个从不是这个主的从，而是另一个分片中主的从`



##### 编辑配置文件









