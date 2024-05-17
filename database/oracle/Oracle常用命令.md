## 										Oracle常用语句

#### 1.cmd修改用户密码：

~~~
(1).登陆sqlplus/nolog;sqlplus system/manager;./sqlplus;
(2).连接数据库：connect /as sysdba;
(3).修改用户密码(例：修改sys用户密码为123）：alter user sys identified by 123;
~~~

#### 2.非数据泵导出与导入：

~~~~
(1).命令导出：exp user_xx/123@192.168.1.xx:1521/orcl  file=e:\foa.dmp  owner=(foa) 
(2).命令导入：imp user_xx/123@192.168.1.xx:1521/orcl file="e:\foa.dmp" full=y buffer=64000；
~~~~

#### 3.数据泵导入、导出：

~~~sql
1.新建directory：
	新增： create directory directory的名字 as '映射本地存储路径';
	授权：grant read, write on directory directory的名字 to public;
	删除：drop directory directory的名字;
	查询：select * from dba_directories where DIRECTORY_NAME = 'directory的名字';
2.remap_tablespace(指定dump文件中有数据的表空间移植到要导入的账号对应的表空间)
impdp zjcm/zjcm@helowin table_exists_action=replace directory=DATA_TEMP  dumpfile=dataORCL_zjcm_20181211.dmp logfile=dataORCL_zjcm_20181211.log REMAP_SCHEMA=zjcm:zjcm schemas=zjcm remap_tablespace=zjcm:zjcm transform=segment_attributes:n
3.导出
expdp zjcm/zjcm@helowin dumpfile=dataORCL_zjcm_20181211.dmp directory=DATA_TEMP logfile=dataORCL_isc_20181211.log schemas=zjcm reuse_dumpfiles=y  version=11.2.0.1.0
~~~

#### 4.用户授权：

~~~
(1).授权某个用户的dba权限：grant dba to 用户名;
(2).取消dba授权:revoke dba from 用户名;
(3).grant connect,resource to test;
~~~

#### 5.获取表字段：

```sql
select * from user_tab_columns where Table_Name='用户表';
select * from all_tab_columns where Table_Name='用户表';
select * from dba_tab_columns where Table_Name='用户表';
```

#### 6.获取注释：

```sql
select * from user_col_comments;//获取字段注释
select * from user_tab_comments;//获取表注释
```

#### 7.获取表：

```sql
select table_name from user_tables; //当前用户的表      
select table_name from all_tables; //所有用户的表  
select table_name from dba_tables; //包括系统表
```

#### 8.查询索引情况

~~~sql
1.查看索引个数和类别:
select * from user_indexes where table='表名' ;
2.查看索引被索引的字段:
select * from user_ind_columns where index_name=upper('index_name');
~~~

#### 9.创建表空间：

```sql
1.格式: create tablespace 表间名 datafile '数据文件名' size 表空间大小               
 ①create tablespace data_test datafile 'e:\oracle\oradata\test\data_1.dbf' size 2000M;
 (*数据文件名 包含全路径, 表空间大小 2000M 表是 2000兆) 
 ②create tablespace JEESITE datafile '/home/oracle/data_temp/tablespace/JEESITE.dbf' size 1024M autoextend on next 100M maxsize unlimited
2.设置表空间自增长
ALTER DATABASE DATAFILE 'c:\SmartDB01.ora' AUTOEXTEND ON;//打开自动增长
ALTER DATABASE DATAFILE 'c:\SmartDB01.ora' AUTOEXTEND ON NEXT 200M ;//每次自动增长200m
ALTER DATABASE DATAFILE 'c:\SmartDB01.ora' AUTOEXTEND ON NEXT 200M MAXSIZE 1024M;//每次自动增长200m，数据表最大不超过1G
3.查看表空间是否自动增长
SELECT FILE_NAME,TABLESPACE_NAME,AUTOEXTENSIBLE FROM dba_data_files;
4.更改数据表大小(10G)
alter database datafile '/ora/oradata/radius/undo.dbf' resize 10240m；
```

#### 10.存放dmp文件的目录DPUMP_DIR：

~~~sql
1.查询
select * from dba_directories where DIRECTORY_NAME = 'DATA_TEMP';
2.创建
create directory DATA_TEMP as '/home/oracle/data_temp';
3.授权
grant read, write on directory DATA_TEMP to public
4.删除
drop directory DATA_TEMP;
~~~

#### 11.创建用户指定表空间：

```sql
1. 格式: create user 用户名 identified by 密码 default tablespace 表空间表;
 create user study identified by study default tablespace data_test;
 (*缺省表空间表示 用户study今后的数据如果没有专门指出，其数据就保存在 data_test中, 也就是保存在对应的物理文件 e:\oracle\oradata\test\data_1.dbf中)
2.CREATE USER cici IDENTIFIED BY cici PROFILE DEFAULT DEFAULT TABLESPACE CICI ACCOUNT UNLOCK;
3.create user jykl identified by jykl default tablespace jykl_data temporary tablespace jykl_temp;//同时指定临时表空间。
4.给已存在的用户指定一个表空间：
alter user username default tablespace "表空间名称";
```

### 12.用户删除及表空间删除

~~~sql
1.select  *　from dba_users; #查找用户
2.select * from dba_data_files; #查找工作空间的路径
3.drop user 用户名称 cascade; #删除用户
4.drop tablespace 表空间名称 including contents and datafiles cascade constraint;删除表空间
~~~

### 13.导入、导出单表的dmp文件

~~~sql
1.exp system/manager@TEST file=d:\daochu.dmp full=y #将数据库TEST完全导出,用户名system 密码manager 导出到D:\daochu.dmp中
2.exp system/manager@TEST file=d:\daochu.dmp owner=(system,sys) #将数据库中system用户与sys用户的表导出
3.exp system/manager@TEST file=d:\daochu.dmp tables=(table1,table2) #将数据库中的表table1 、table2导出
4.exp system/manager@TEST file=d:\daochu.dmp tables=(table1) query=\" where filed1 like '00%'\" #将数据库中的表table1中的字段filed1以"00"打头的数据导出
5.exp test/test@192.168.20.20/orcl file = d:\test.dmp tables=(t_test) query = \"where oildate like '2016%'\" #query参数进行where条件过滤
1.imp system/manager@TEST  file=d:\daochu.dmp #将D:\daochu.dmp 中的数据导入 TEST数据库中
2.imp system/manager@TEST  file=d:\daochu.dmp  tables=(table1) #将d:\daochu.dmp中的表table1 导入
~~~

