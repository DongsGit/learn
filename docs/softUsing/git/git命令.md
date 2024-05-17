### 1.远程库配置

~~~bash
git remote -v #查看远程库名是否被占用
git remote rm 远程库名 #删除远程仓库
git remote origin set -url[url] #修改命令
git remote add origin [url] #添加远程仓库
vim .git/config #修改配置文件
~~~

### 2.拉取（相当于更新）

~~~~
git pull 远程库名 master
~~~~

### 3.添加文件

~~~
git add -A #表示把项目里面全部文件添加进列表
git add . #同上
~~~

### 4.添加注释

~~~
git commit -m "Hello World"
~~~

### 5.第一次使用push的时候加上-U ,以后不加

~~~~
git push - u 远程库名 master
~~~~

### 6.本地创建git仓库并且上传

~~~
mkdir learn
cd learn
git init
touch README.md
git add README.md
git commit -m "这是我第一次提交"
git remote add origin https://gitee.com/DongsGit/learn.git
git push -u origin master //首次提交需要加上-u
~~~

### 7.已有项目上传

~~~
cd existing_git_repo
git remote add origin https://gitee.com/DongsGit/learn.git
git push -u origin master
~~~

### 8.全局设置用户名和邮箱

~~~
git config --global user.name "DongsGit"
git config --global user.email "wxd770@163.com"
~~~

