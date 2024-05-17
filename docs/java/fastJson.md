#### 1.map转javabean

~~~~java
Map<String, Object> map = Maps.newHashMap();
    map.put("pkid",1);
    map.put("password","33333");
    map.put("name","22222");
    Admin admin = JSONObject.parseObject(JSONObject.toJSONString(map), Admin.class);
    System.out.println(admin);
~~~~

