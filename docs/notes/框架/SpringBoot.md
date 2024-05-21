### 为什么要使用SpringBoot
* 独立运行
* 简化配置
* 自动配置
* 上手容易

### SpringBoot常用注解
* 核心注解：@SpringBootApplication
  * @EnableAutoConfiguration：启用SpringBoot的自动配置机制
  * @Configuration：允许在上下文中注册额外的Bean或导入其他配置类
  * @ComponentScan：扫描被@Component(@Service,@Controller)注解的Bean
* 配置文件值绑定注解：@ConfigurationProperties、@PropertySource、@Value

### SpringBoot自动装配流程
* 先判断自动装配开关是否发开，默认spring.boot.enableautoconfiguration=true，可在application.properties或application.yml中设置。
* 读取EnableAutoConfiguration注解中的exclude和excludeName。
* 获取需要自动装配的所有配置类，读取META-INF/spring.factories。
* 通过@Conditional注解按需加载的不会所有的Bean都加载。

### 如何去开发一个Starter
* Starter命名：spring-boot-starter-{name}。
* 引入依赖：spring-boot-starter、spring-boot-configuration-processor。
* 自定义配置类。、
* 在resource目录下创建META-INF/spring.factories文件，并将需要提供类的全路径写入。
* mvn package打包后就可以引入使用了。

### 循环依赖，如何解决
* 构造函数注入：在构造函数中注入依赖项，而不是在属性中注入。
* Setter注入 ：使用setter方法注入依赖项，而不是在构造函数中注入。
* 延迟注入：使用@Lazy注解延迟加载依赖项。
* @Autowired注解的required属性：将required属性设置为false，以避免出现循环依赖问题。
* @DependsOn注解：使用@DependsOn注解指定依赖项的加载顺序，以避免出现循环依赖问题。

