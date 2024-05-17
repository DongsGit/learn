### 1.Docker安装

~~~bash
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装 Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo service docker start
# Step5:镜像加速
vim /etc/docker/daemon.json
#写入如下代码：
{
  "registry-mirrors": ["https://gjtd0qxi.mirror.aliyuncs.com"]
}
systemctl daemon-reload
systemctl restart docker

# 注意：
# 官方软件源默认启用了最新的软件，您可以通过编辑软件源的方式获取各个版本的软件包。例如官方并没有将测试版本的软件源置为可用，你可以通过以下方式开启。同理可以开启各种测试版本等。
# vim /etc/yum.repos.d/docker-ce.repo
#   将 [docker-ce-test] 下方的 enabled=0 修改为 enabled=1
#
# 安装指定版本的Docker-CE:
# Step 1: 查找Docker-CE的版本:
# yum list docker-ce.x86_64 --showduplicates | sort -r
#   Loading mirror speeds from cached hostfile
#   Loaded plugins: branch, fastestmirror, langpacks
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            docker-ce-stable
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            @docker-ce-stable
#   docker-ce.x86_64            17.03.0.ce-1.el7.centos            docker-ce-stable
#   Available Packages
# Step2 : 安装指定版本的Docker-CE: (VERSION 例如上面的 17.03.0.ce.1-1.el7.centos)
# sudo yum -y install docker-ce-[VERSION]
~~~

### 2.Docker基础命令

~~~bash
#1.查看正在运行的容器
docker ps
#2.查看所有容器(-a查看所有容器, -l查看最新创建的容器， -n=x,查看最后创建的x个容器)
docker ps -a
#3.启动或重启容器
docker start 容器名或容器ID 
docker restart 容器名或容器ID
#4.停止所有容器
docker stop $(docker ps -a -q)
#5.停止单个容器
docker stop 容器名或容器ID 或者 docker kill 容器名或容器ID
#6.删除所有的容器
docker rm $(docker ps -a -q)
#7.删除单个容器
docker rm 容器名
#8.删除正在运行的容器
docker rm -f 容器名
#9.删除全部镜像
docker rmi $(docker images -q)
#10.删除单个镜像
docker rmi imageId
#11.查看容器日志
docker logs -f -t --tail 行数 容器名

~~~

### 3.Docker安装RabbitMQ

~~~bash
#查询镜像
docker search rabbitmq:management
#docker拉取RabbitMQ镜像
docker pull rabbitmq:management
docker 
#启动RabbitMQ并且指定用户名密码和端口号
docker run -d --hostname my-rabbit --name my-rabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 rabbitmq:management
~~~

### 4.Docker安装mysql

~~~bash
 # 1.拉取镜像 
 docker pull mysql:5.7 
 #2.创建挂在目录
 mkdir -p /home/MySQL/conf  # 挂载配置文件 
 mkdir -p /home/MySQL/data # 挂载数据文件 
 mkdir -p /home/MySQL/logs  # 挂载日志文件
 #3.运行容器
 docker run --name mysql57 -p 3306:3306 -v /home/MySQL/conf:/etc/mysql/mysql.conf.d/ -v /home/MySQL/data:/var/lib/mysql -v /home/MySQL/logs:/logs -e MYSQL_ROOT_PASSWORD=1995 -d mysql:5.7
 #4.本地访问
 docker exec -it mysql57 /bin/bash ==>退出 exit 或者Ctrl+D
 mysql -u root -p
 #5.远程连接
 mysql -h 192.168.138.131 -p 3306 -u root -p
~~~

### 5.Docker安装redis

~~~bash
 # 1.拉取镜像 
 docker pull redis
 #2.创建用用于挂在的目录
 mkdir -p /home/redis/conf
 mkdir -p /home/redis/data
 #3.去官网下个redis，然后 tar -zxvf 解压，再把redis.conf文件考出到 /home/reids/conf目录
 tar zxvf redis-4.0.11.tar.gz 
 cp redis.conf /home/redis/conf
 vim redis.conf
 	requirepass 1995 /
 	/#数据库密码
 	appendonly yes   #数据支持持久化
 #4.运行容器
docker run --name redis -p 6379:6379 -v /home/redis/conf/redis.conf:/usr/local/etc/redis/redis.conf -v /home/redis/data:/data -d redis redis-server /usr/local/etc/redis/redis.conf
 #5.本地访问
 docker exec -it redis /bin/bash ==>退出 exit 或者Ctrl+D
 redis-cli -h 127.0.0.1 -p 6379 -a 1995
 #6.远程访问
 安装完之后默认是不支持远程连接对的，需docker 要修改redis.conf 将bind属性改为0.0.0.0
 使用RedisDesktopManager工具连接,或者本机装了redis的话可以用上面的方法改下ip
~~~

### 6.Docker安装Nginx

~~~bash
#1.拉取镜像
docker pull nginx #默认下载最新的镜像
#2.运行容器
docker run --name nginx -p 80:80 -d nginx
#3.创建用于挂载的目录
mkdir -p /home/nginx #挂载nginx所有数据
mkdir -p /home/nginx/html #挂载nginx虚拟主机(网站html数据)
#4.拷贝配置文件
docker cp nginx:/etc/nginx/nginx.conf /home/nginx #拷贝主配置文件
docker cp nginx:/etc/nginx/conf.d /home/nginx #拷贝虚拟主机配置文件
echo welcome to my nginx > /home/nginx/html/index.html #自定义索引页
#5.删除之前运行的容器(之前的容器主要是为了考出配置文件),重新运行容器
docker rm -f nginx
docker run -p 80:80 -p 443:443 -v /home/nginx/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/html:/usr/share/nginx/html:ro -v /etc/nginx/conf.d:/usr/nginx/conf.d -d nginx


~~~

### 7.Docker安装ActiveMQ

~~~bash
1.docker search activemq #查询镜像
2.docker pull docker.io/webcenter/activemq #拉取镜像
3.docker run -d --name activemq -p 61617:61616 -p 8162:8161 docker.io/webcenter/activemq:latest
4.61616是activemq的容器使用端口（映射为61617），8161是web页面管理端口（对外映射为8162）
5.默认账号密码都是admin,点击manage activemq broker就可以进入管理页面（需要输入账号密码）
~~~

### 8.Docker安装fastDFS（1）

~~~bash
1.docker search fastdfs #搜索fastdfs镜像
2.docker pull morunchang/fastdfs #拉取镜像
3.docker run -d --name tracker --net=host morunchang/fastdfs sh tracker.sh #运行tracker
4.docker run -d --name storage --net=host -e TRACKER_IP=<your tracker server address>:22122 -e GROUP_NAME=<group name> morunchang/fastdfs sh storage.sh #1.使用的网络模式是–net=host, <your tracker server address> 替换为你机器的Ip即可 2.<group name> 是组名，即storage的组 3.如果想要增加新的storage服务器，再次运行该命令，注意更换 新组名
5.#修改nginx的配置，不拦截上传内容:
	①.进入容器内部：docker exec -it storage  /bin/bash  (exit 退出)
	②.cd data 
	③.vi nginx/conf/nginx.conf #修改nginx配置文件
	④.添加修改内容：
	location /group1/M00 {
         proxy_next_upstream http_502 http_504 error timeout invalid_header;
         proxy_cache http-cache;
         proxy_cache_valid  200 304 12h;
         proxy_cache_key $uri$is_args$args;
         proxy_pass http://fdfs_group1;
         expires 30d;
     }
     ⑤.退出 exit
6.docker restart storage #重启服务
 
~~~

### 9.Docker安装fastDFS（2）

~~~~bash
1.docker search fastdfs #搜索fastdfs镜像
2.docker pull mypjb/fastdfs #下载fastdfs镜像，这里选择mypjb/fastdfs
3.mkdir /home/fastdfs #创建宿主机保存fastdfs文件目录
4.#执行命令运行fastdfs容器,将下面的【192.168.1.40】替换成自己机器的ip即可
	docker run --add-host fastdfs.net:192.168.1.40 --name fastdfs --net=host -e TRACKER_ENABLE=1 -e NGINX_PORT=80 -v /home/fastdfs:/storage/fastdfs -it mypjb/fastdfs
5.#运行完后会自动进入容器内部，输入【exit】退出容器内部,重启fastdfs容器
	docker restart fastdfs
6.firewall-cmd --zone=public --add-port=81/tcp --permanent;firewall-cmd --reload;#开放81端口
7.#测试是否安装成功,随便找个jpg文件，重命名为【wKgByFmn1iGAUsF1AAL4cszpkW0032.jpg】，上传至【/home/fastdfs/data/00/00】文件夹中，在浏览器中输入：http://192.168.1.40:81/M00/00/00/wKgByFmn1iGAUsF1AAL4cszpkW0032.jpg，如能打开则说明安装成功了。 
~~~~

### 10.Docker安装Oracle

~~~bash
1.docker search oracle #查看仓库中有哪些镜像
2.docker pull registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g #拉取镜像，注意，这个镜像的底层操作系统版本是centos6.5
3.#镜像下载完成后，创建容器,创建一个文件目录，用于挂载到容器内，做oracle数据备份时数据存放的位置，保证备份数据不丢失。并将文件的权限给到 500.500 这个是在容器内的oracle用户的sid。不用管，后面会用到：
mkdir /home/oracle/data_temp
chown -R 500.500 /home/oracle/data_temp
4.#运行容器,其中，oracle_11g是名称，-p是端口映射，-v是将宿主机的/usr/local/data_temp 目录映射到容器内的 /home/oracle/data_temp内
docker run -d --name oracle_11g -p 1521:1521 -v /home/oracle/data_temp:/home/oracle/data_temp registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
5.#进入容器
	docker ps ## 查看容器的id号，复制一下
	docker exec -it xxxxxxxx /bin/bash ## xxxxxxx就是上一部查看的id号
6.#查看oracle状态，修改system用户密码：
source ~/.bash_profile   ## 加载一下用户环境变量，进入容器后，自动是oracle用户
sqlplus /nolog           ## 使用sqlplus 工具，进去命令行
SQL> connect /as sysdba  ## 使用sysdba 连接oracle，最大权限，os认证，只能在本机上登陆使用。
SQL> select status from v$instance; ## 查看oracle现在的状态 ，状态为 OPEN 则正常，表示已开启状态。
SQL> alter user system identified by oracle; ## 修改用户 system 的密码为 oracle ，可以自定义
7.#创建自定义的 directory ，用于存放备份数据：
 create or replace directory DATA_TEMP as '/home/oracle/data_temp';  ## 将挂载进来的目录/home/oracle/data_temp创建到oracle的directoy中,创建之后，导出的数据可以指定导出到这个目录，那么数据可以直接在宿主机上的对应目录中拿到，持久化保存。另外需要导入的数据文件也是直接放到这个目录，在容器中则可以调用impdp命令进行导入。
8.#导入和导出数据：
#导入数据，登陆用户为刚才创建的用户，实例为镜像的实例helowin，数据文件为第6步创建的DATA_TEMP，导入文件为BPM.EXPDP,用户为test01到test01，这些需要自行修改，导入的用户和当时导出的用户最好保持一直。
impdp test01/testpasswd@helowin table_exists_action=replace directory=DATA_TEMP dumpfile=BPM.EXPDP logfile=BPM_20180124.log REMAP_SCHEMA=test01:test01 schemas=test01
# 导出数据，导出文件名为：BPM.EXPDP, 路径为： DATA_TEMP, 用户为test01 
expdp test01/testpasswd@helowin dumpfile=BPM.EXPDP directory=DATA_TEMP schemas=test01 reuse_dumpfiles=y  version=11.2.0.1.0
9.#了解了导入导出后，就可以写一个简单的导出数据的脚本，设置定时任务，作为数据备份，简单的备份数据的脚本如下：
#! /usr/bin/python


import datetime
import os
import re


back_dir = '/home/oracle/data_temp'
today = datetime.datetime.today().strftime('%Y-%m-%d')
command = 'source /home/oracle/.bash_profile && expdp bpm/bpm@helowin dumpfile=bb
pmxk_%s.expdp directory=DATA_TEMP schemas=bpm reuse_dumpfiles=y version=11.2.0.11
.0' %today
os.system(command)


dirlist = os.listdir(back_dir)
for dirname in dirlist:
    if 'bpmxk' in dirname:
        time1 = re.findall('bpmxk_(.*?).expdp',dirname)[0]
        time2 = datetime.datetime.strptime(time1,'%Y-%m-%d')
        time_diff = datetime.datetime.today() - time2
        if time_diff.days > 20:
            os.remove(back_dir+'\\'+dirname)


然后设置定时任务，进入root账号操作，此镜像的root密码为：helowin。
vi /etc/crontab      ## 编辑定时任务配置文件，添加下面一行

* 3 * * * root /home/oracle/oracle_backup.sh      ## 每天凌晨3点自行备份脚本

chmod 777 /home/oracle/oracle_backup.sh           ## 给备份脚本可执行授权
service crond start                       ## 启动crond服务，默认是没有启动的。
10.#参考网址：https#://blog.csdn.net/weixin_41004350/article/details/79168739
~~~

### 11.Docker安装Elasticsearch服务端

~~~bash
1.docker pull elasticsearch #拉取最新的官方镜像,如果拉取失败则需要切换镜像加速,或者翻墙
2.docker run -e ES_JAVA_OPTS="-Xms512m -Xmx1024m" -d -p 9200:9200 -p 9300:9300 --name myes +镜像id(注：这是要运行的镜像id)
#-e ES_JAVA_OPTS="-Xms512m -Xmx1024m" 这一步是设置初始最小和最大内存
3.#浏览器访问如下地址:服务器ip地址+冒号+9200,如果返回如下消息则证明安装成功!
{
  "name" : "2QMnlYn",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "Ex_7Gzg0SvGji0M1b81LKA",
  "version" : {
    "number" : "5.6.12",
    "build_hash" : "cfe3d9f",
    "build_date" : "2018-09-10T20:12:43.732Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.1"
  },
  "tagline" : "You Know, for Search"
}
~~~

