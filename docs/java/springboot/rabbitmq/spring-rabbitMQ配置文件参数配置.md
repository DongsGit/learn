~~~shell
#单机配置
spring.rabbitmq.host=127.0.0.1 #服务端ip地址
spring.rabbitmq.username= root #用户名
spring.rabbitmq.password=123456 #密码
spring.rabbitmq.port=5672 #rabbitmq端口
spring.rabbitmq.virtual-host= 具体的值 #这里不需要加/，rabbitMQ 默认就有个/，加了会有2个

//RabbitMQ单机，只使用addresses
spring.rabbitmq.addresses:ip1:port1
spring.rabbitmq.username: username
spring.rabbitmq.password: password

//RabbitMQ集群，addresses一定要逗号分隔
spring.rabbitmq.addresses:ip1:port1,ip2:port2,ip3:port3
spring.rabbitmq.username: username
spring.rabbitmq.password: password

spring.rabbitmq.cache.channel.checkout-timeout= #当缓存已满时，获取Channel的等待时间，单位为毫秒
spring.rabbitmq.cache.channel.size= #缓存中保持的Channel数量
spring.rabbitmq.cache.connection.mode=CHANNEL #连接缓存的模式
spring.rabbitmq.cache.connection.size= #缓存的连接数

spring.rabbitmq.connection-timeout= #连接超时参数单位为毫秒：设置为“0”代表无穷大
spring.rabbitmq.dynamic=true #是否创建AmqpAdmin bean. 默认为: true


spring.rabbitmq.listener.acknowledge-mode= #1.none:没有任何的应答会被发送2.auto:根据情况确认3.manual:自动应答，除非MessageListener抛出异常
spring.rabbitmq.listener.auto-startup=true #是否在启动时就启动mq，默认: true
spring.rabbitmq.listener.concurrency= #指定最小的消费者数量
spring.rabbitmq.listener.max-concurrency #指定最大的消费者数量
spring.rabbitmq.listener.default-requeue-rejected= #被拒绝的消息是否会重新放入队列,默认为true
spring.rabbitmq.listener.max-concurrency= #最大用户数
spring.rabbitmq.listener.prefetch= #指定一个请求能处理多少个消息，如果有事务的话，必须大于等于transaction数量
spring.rabbitmq.listener.retry.enabled=false #是否启用发布重试
spring.rabbitmq.listener.retry.initial-interval=1000 #第一次和第二次尝试传递消息之间的间隔
spring.rabbitmq.listener.retry.max-attempts=3 #传递消息的最大尝试次数
spring.rabbitmq.listener.retry.max-interval=10000 #尝试之间的最大间隔
spring.rabbitmq.listener.retry.multiplier=1.0 #要应用于上一个传递重试间隔的乘数
spring.rabbitmq.listener.retry.stateless=true #重试是无状态的还是有状态的
spring.rabbitmq.listener.transaction-size= #指定一个事务处理的消息数量，最好是小于等于prefetch的数量

spring.rabbitmq.publisher-confirms=false #启用发布者确认
spring.rabbitmq.publisher-returns=false #启用发布服务器返回
spring.rabbitmq.requested-heartbeat= #指定心跳超时，0为不指定,零表示无

#ssl相关
spring.rabbitmq.ssl.enabled=false #是否开始SSL,默认:false
spring.rabbitmq.ssl.key-store= #指定持有SSL certificate的key store的路径
spring.rabbitmq.ssl.key-store-password= #指定访问key store的密码
spring.rabbitmq.ssl.trust-store= #指定持有SSL certificates的Trust store
spring.rabbitmq.ssl.trust-store-password= #指定访问trust store的密码
spring.rabbitmq.ssl.algorithm= #SSL算法，默认使用Rabbit的客户端算法库

#template相关
spring.rabbitmq.template.mandatory=false #启用强制信息,默认为false
spring.rabbitmq.template.receive-timeout=0 #receive()方法的超时时间,默认为0
spring.rabbitmq.template.reply-timeout=5000 #sendAndReceive()方法的超时时间
spring.rabbitmq.template.retry.enabled=false #设置为true的时候RabbitTemplate能够实现重试
spring.rabbitmq.template.retry.initial-interval=1000 #第一次与第二次发布消息的时间间隔
spring.rabbitmq.template.retry.max-attempts=3 #尝试发布消息的最大数量
spring.rabbitmq.template.retry.max-interval=10000 #尝试发布消息的最大时间间隔
spring.rabbitmq.template.retry.multiplier=1.0 #上一次尝试时间间隔的乘数

~~~

