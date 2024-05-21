### 常用的命令行性能监控和故障处理工具
* 操作系统工具
  * top：显示系统整体资源使用情况
  * netstat：监控网络使用情况
  * vmstat：监控内存和CPU
  * iostat：监控IO的使用
* JDK工具：
  * jps：显示所有Java进程PID及启动类信息
  * jstat：监控JVM运行时性能统计信息
  * jinfo：用于显示和调整JVM的配置信息
  * jmap：生成堆转储、显示堆内存详细信息
  * jhat：分析jmap生成的堆转储文件（被VisualVM取代）
  * jstack：生成线程的堆栈跟踪
  * jcmd：执行多种诊断命令
* 可视化的性能监控和故障处理工具：
  * JConsole：监控和管理 Java 应用程序
  * VisualVM：监控、分析、调试和配置 Java 应用程序
  * Java Mission Control：适合用于生产环境中的 Java 应用程序监控和分析
  * Arthas：Alibaba 开源的 Java 诊断工具，定位和解决生产环境中的 Java 应用程序问题

### 线上服务CPU占用过高排查
* top列出各个进程的资源占用情况
* top -Hp 进程ID列出对应进程里面的线程占用资源的情况
* jstack PID 打印出进程的所有线程信息

### 内存飚高问题排查
一般是因为创建了大量对象导致，持续飚高说明垃圾回收跟不上对象创建的速度，或者内存泄露导致对象无法回收。