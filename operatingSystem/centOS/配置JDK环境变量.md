### 1.配置在用户变量.bashrc

~~~~bash
vim ~/.bashrc
export JAVA_HOME=jdk的路径
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tool.jar
export PATH=$PATH:$JAVA_HOME/bin
~~~~

### 2.配置全局变量

~~~bash
vim /etc/profile
export JAVA_HOME=jdk的路径
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tool.jar
export PATH=$PATH:$JAVA_HOME/bin
~~~

