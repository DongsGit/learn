# 介绍
## 什么是JVM
JVM，也就是Java虚拟机，它是实现跨平台的基础。
Java程序运行时编译器会将Java源代码编译成与平台无关的Java字节码文件（.class），接下来对应平台的JVM会对字节码文件进行解释，翻译成对应平台的机器指令并运行；接下来看下Java程序是如何运作的吧：
![alt text](jvm-1.png)
<p align="center">Java 跨平台</p>

## JVM内存结构
?> _TODO_ 待补充

# JVM相关

## JVM有哪些类加载器
* Bootstrap Class Loader（引导类加载器）: 是JVM自带的类加载器，用于加载核心Java类库，即<JAVA_HOME>/lib目录中的类，如`rt.jar`中的类。
* Extension Class Loader（扩展类加载器）: 也称为ExtClassLoader，用于加载扩展库中的类，加载路径是<JAVA_HOME>/lib/ext目录或由系统变量java.ext.dirs指定的路径。
* Application Class Loader（应用类加载器）：也称为系统类加载器（System Class Loader），用于加载应用程序类路径（CLASSPATH）上的类。
* 自定义加载器

## 对象的创建过程是怎样的
加载➔验证➔准备➔解析➔初始化➔使用➔卸载
当JVM首次遇到一个类时，它会先检查这个类是否已被加载，如果没有加载，它会通过类加载器（ClassLoader）加载类文件（.class文件）到内存中；类加载器会找到相应的类文件，并将其转换为JVM能够理解的格式，加载到方法区中。  
验证、准备、解析后会开始进行初始化类的静态变量和静态代码块，运行静态初始化器和静态初始化块，然后在堆中为新对象分配内存、初始化内存、调用构造方法，最后返回对象的引用。

## 内存溢出和内存泄露是什么意思
内存溢出（Out of Memory，俗称 OOM）和内存泄漏（Memory Leak）是两个不同的概念，但它们都与内存管理有关。
* 内存溢出：是指当程序请求分配内存时，由于没有足够的内存空间，从何触发导致错误；内存溢出可能是由于内存泄漏导致的，也可能是因为程序一次性尝试分配大量内存，内存直接就干崩溃了导致的。
* 内存泄露：是指程序在使用完内存后，未能释放已分配的内存空间，导致这部分内存无法再被使用；随着时间的推移，内存泄漏会导致可用内存逐渐减少，最终可能导致内存溢出。


# JVM调优

## 你有做过JVM调优吗:star:
JVM调优是一个复杂的过程，主要包括对内存、垃圾收集器、JVM参数等进行调整和优化。
![alt text](jvm-01.png ':size=100%')
* JVM的堆内存主要用于存储对象实例，如果堆内存设置过小，可能会导致频繁的垃圾回收；
* 在项目运行期间，使用JVisualVM定期观察和分析GC日志，如果发现频繁的Full GC，就需要特别关注老年代的使用情况，接着通过分析Heap dump寻找内存泄漏的源头，看看是否有未关闭的资源，长生命周期的大对象等；

## 线上服务CPU占用过高怎么排查
* top 列出系统各个进程的资源占用情况
* top -Hp 进程 ID 列出对应进程里面的线程占用资源情况
* jstack PID 打印出进程的所有线程信息

## 内存飚高怎么排查
内存飚高一般是因为创建了大量的Java对象导致的，如果持续飚高则说明垃圾回收跟不上对象创建的速度，或者内存泄漏导致了对象无法回收。
排查步骤如下：  
1. 先观察垃圾回收的情况，可以通过`jstat -gc PID 1000`查看GC的次数和时间或者`jmap -histo PID | head -20`查看堆内存占用空间最大的前 20 个对象类型；
2. 通过jmap命令dump出堆内存信息；
3. 使用可视化工具分析dump文件，比如说VisualVM，找到占用内存高的对象，再找到创建该对象的业务代码位置，从代码和业务场景中定位具体问题；

## 有没有处理过内存泄漏问题？是怎么定位的？
严重的内存泄漏往往伴随频繁的 Full GC，所以排查内存泄漏问题时，需要从 Full GC 入手。主要有以下操作步骤：
1. 使用`jps`查看运行的Java进程ID；
2. 使用`top -p [pid]`查看进程使用CPU和内存占用情况；
3. 使用`top -Hp [pid]`查看进程下所有线程占用CPU和内存情况；
4. 将线程ID转为16进制：`printf "%x\n" [pid]`，输出的值就是线程栈信息中的nid；
5. 抓取线程栈：`jstack 29452 >29452.txt`，可以多抓几次做个对比；
6. 使用`jstat -gcutil [pid] 5000 10`每隔5秒输出GC信息，输出10次，查看**YGC**和**FullGC**次数（通常会出现 YGC 不增加或增加缓慢，而`Full GC`增加很快,或使用`jstat -gccause [pid] 5000 `输出 GC 摘要信息或使用`jmap -heap [pid]`查看堆的摘要信息，关注老年代内存使用是否达到阀值，若达到阀值就会执行`Full GC`，如果发现`Full GC`次数太多，就很大概率存在内存泄漏了。）
7. 使用`jmap -histo:live [pid]`输出每个类的对象数量，内存大小(字节单位)及全限定类名；
8. 生成`dump`文件，借助工具分析哪个对象非常多，基本就能定位到问题根源了：  
```
# jmap -dump:live,format=b,file=29471.dump 29471
Dumping heap to /root/dump ...
Heap dump file created
```
9. dump 文件分析：可以使用`jhat`命令分析`jhat -port 8000 29471.dump`，浏览器访问`jhat`服务，端口是`8000`；也可以使用图形化工具分析，如`JDK`自带的`jvisualvm`，从菜单 > 文件 > 装入`dump`文件；或使用第三方式具分析的，如`JProfiler`、`GCViewer`工具。

## 常用的JVM参数有哪些
* 堆相关参数：
  * `-Xms<size>`：设置JVM初始堆大小；
  * `-Xmx<size>`：设置JVM最大堆大小；
  * `-Xmn<size>`：设置新生代（Young Generation）堆的大小；
  * `-XX:NewRatio=<ratio>`：设置新生代与老年代的比例；
  * `-XX:SurvivorRatio=<ratio>`：设置Eden区与Survivor区的比例；
* 栈相关参数：
  * `-Xss<size>`：设置JVM栈大小；
* GC（垃圾收集器）相关参数:
  * `-XX:+UseSerialGC`：启用串行垃圾收集器；
  * `-XX:+UseParallelGC`：启用并行垃圾收集器；
  * `-XX:+UseConcMarkSweepGC`：启用CMS垃圾收集器；
  * `-XX:+UseG1GC`：启用G1垃圾收集器；
* 性能调优参数：
  * `-XX:MaxPermSize=<size>`：设置永久代（PermGen）的最大大小（Java 8之前）；
  * `-XX:MaxMetaspaceSize=<size>`：设置元空间（Metaspace）的最大大小（Java 8及以后）;
  * `-XX:CompileThreshold=<count>`：设置JIT编译的阈值；
  * `-XX:+AggressiveOpts`：启用依赖特定平台的高级性能特性；
* GC日志相关参数
  * `-Xloggc:<filename>`（JDK8及以前）：将GC日志输出到指定文件，JDK9开始推荐使用`-Xlog:gc`；
  * `-XX:+PrintGCDetails`：打印详细的GC信息；
  * `-XX:+PrintGCDateStamps`：打印GC发生的时间戳；
  * `-XX:+PrintTenuringDistribution`：打印对象年龄分布统计；
* 其他常用参数：
  * `-XX:OnOutOfMemoryError=<cmd>`：在OOM发生时执行特定命令；

## 有哪些常用的命令行性能监控和故障处理工具
* 操作系统工具
  * top：显示系统整体资源使用情况
  * vmstat：监控内存和CPU
  * iostat：监控IO的使用
  * netstat：监控网络的使用
* JDK性能监控工具
  * jps：虚拟机进程查看
  * jstat：虚拟机运行时信息查看
  * jinfo：虚拟机配置查看
  * jmap：生成Java进程的内存映射快照（heap dump）以及查看内存的相关信息
  * jhat：堆转储快照分析
  * jstack：Java堆栈跟踪
  * jcmd：实现上面除了jstat外所有命令的功能

## 死锁排查

1. 准备代码

```java
public class DeadLockDemo {
    public static void main(String[] args) {
        DeadLock d1 = new DeadLock(true);
        DeadLock d2 = new DeadLock(false);
        Thread t1 = new Thread(d1);
        Thread t2 = new Thread(d2);
        t1.start();
        t2.start();
    }
}

//定义锁对象
class MyLock {
    public static Object obj1 = new Object();
    public static Object obj2 = new Object();
}

//死锁代码
class DeadLock implements Runnable {
    private boolean flag;

    DeadLock(boolean flag) {
        this.flag = flag;
    }

    public void run() {
        if (flag) {
            while (true) {
                synchronized (MyLock.obj1) {
                    System.out.println(Thread.currentThread().getName() + "----if 获得obj1锁");
                    synchronized (MyLock.obj2) {
                        System.out.println(Thread.currentThread().getName() + "--- -if获得obj2锁");
                    }
                }
            }
        } else {
            while (true) {
                synchronized (MyLock.obj2) {
                    System.out.println(Thread.currentThread().getName() + "----否则 获得obj2锁");
                    synchronized (MyLock.obj1) {
                        System.out.println(Thread.currentThread().getName() + "--- -否则获得obj1锁");
                    }
                }
            }
        }
    }
}
```

2. 查看运行结果

![alt text](deadLock1.png ':size=100%')

3. jps 查看进程并且打印栈信息

![alt text](deadLock2.png ':size=100%')

4. 查看死锁信息
先执行`jstack <pid>`，然后拉到最下面能看到死锁的信息：

![alt text](deadLock3.png ':size=100%')


