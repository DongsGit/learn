### 1.打开centos的yum文件夹

~~~~bash
cd  /etc/yum.repos.d/
~~~~

### 2.用wget下载repo文件

~~~bash
wget  http://mirrors.aliyun.com/repo/Centos-7.repo
#如果wget命令不生效，说明还没有安装wget工具，输入yum -y install wget 回车进行安装。
~~~

### 3.备份系统原来的repo文件

~~~bash
mv CentOS-Base.repo  CentOS-Base.repo.bak
#即是重命名 CentOS-Base.repo -> CentOS-Base.repo.bak
~~~

### 4.替换系统原理的repo文件

~~~~bash
mv Centos-7.repo CentOS-Base.repo
~~~~

### 5.执行yum源更新命令

~~~bash
yum clean all
yum makecache
yum update
~~~

