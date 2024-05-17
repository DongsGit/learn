# Idea shortcuts

## 1. Tool Window

| 快捷键                    | 作用                                       | 经验与相关                                                   |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| <kbd>Alt+1</kbd>          | 切换项目窗口                               | 可以在窗口中直接按键进行查找，再配合<kbd>Alt+Insert</kbd>插入新内容 |
| <kbd>Alt+2</kbd>          | 切换收藏夹窗口                             | 此窗口中包含`最爱`，`书签`，`断点`三部分                     |
| <kbd>Ctrl+F11</kbd>       | 切换定义书签                               | (也可以使用<kbd>Ctrl+Shift+数字</kbd>来定义书签)，可以配合<kbd>Ctrl+数字</kbd>快速定位到书签，有点像魔兽争霸中的编队快捷键。<kbd>Shift+F11</kbd>显示所有书签 |
| <kbd>Alt+4</kbd>          | 切换Run窗口                                | 必须运行后才有，运行快捷键<kbd>Shift+F10</kbd>               |
| <kbd>Alt+5</kbd>          | 切换Debug窗口                              | 必须运行后才有，调试快捷键<kbd>Shift+F9</kbd>                |
| <kbd>Alt+Shift+F10</kbd>  | Run或Debug                                 | 在弹出窗口按住Shift可以切换为Debug                           |
| <kbd>Alt+6</kbd>          | 切换TODO窗口                               | 在敲代码时可以使用todo，fixme来生成TODO项                    |
| <kbd>Alt+9</kbd>          | 切换版本控制窗口                           | 右下角可以快速切换branch，<kbd>Alt+\`</kbd>显示版本控制菜单，<kbd>Ctrl+K</kbd>提交，选中代码中绿色滚动条<kbd>Ctrl+Alt+Z</kbd>回滚，<kbd>Ctrl+D</kbd>比较 |
| <kbd>Ctrl+TAB</kbd>       | Switcher选择                               | 这时按住Ctrl配合左右箭头和数字键选择，Alt+数字没有的工具窗口只能靠它了 |
| <kbd>Ctrl+Shift+F10</kbd> | 切换所有工具窗口                           | -                                                            |
| <kbd>Ctrl+F4</kbd>        | 关闭当前Tab窗口，官方的建议是不使用Tab窗口 | <kbd>Ctrl+Shift+A</kbd>输入tabs搜索                          |

## 2. 生成
| 快捷键                           | 作用                                                         | 经验与相关                                                   |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <kbd>Alt+Insert</kbd>            | 生成代码：包括getter，setter，构造方法，测试方法，spring依赖注入等 | <kbd>Ctrl+I</kbd>生成接口方法，<kbd>Ctrl+O</kbd>重写父类方法，注意它们可以使用<kbd>Alt+Enter</kbd>和`直接输入父类方法名`来代替 |
| <kbd>Ctrl+Alt+Shift+Insert</kbd> | 生成临时文件                                                 | -                                                            |
| <kbd>Ctrl+Shift+T</kbd>          | 生成测试类                                                   | -                                                            |

## 3. 编辑
| 作用        | 经验与相关                                                   |
| ----------- | ------------------------------------------------------------ |
| live模板    | 例如有psvm，sout，soutp，fori和html中的zen等                 |
| postfix模板 | 例如有cast，if，for，fori，inst，nn，null，var，sout，switch，stream，try，while，return等 |
| file模板    | 例如可以把MyBatis的Mapper文件定义为模板                      |
| 自动完成    | 一般不需要主动敲快捷键，都是在输入字符时自动提示的。由于<kbd>Ctrl+空格</kbd>和<kbd>Ctrl+Shift+空格</kbd>与输入法冲突，建议修改为<kbd>Alt+.</kbd>和<kbd>Alt+,</kbd>。按一次，在当前上下文寻找，按两次，在扩展的上下文寻找，<kbd>Alt+.</kbd>找的是变量名，方法名等，而<kbd>Ctrl+Shift+Enter</kbd>匹配的是类型 |
| 结束        | <kbd>Ctrl+Shift+Enter</kbd>自动结束，<kbd>Shift+Enter</kbd>下一行开始，<kbd>Ctrl+Alt+Enter</kbd>上一行开始 |
| 自动修复    | <kbd>Alt+Enter</kbd>                                         |
| 代码环绕    | <kbd>Ctrl+Alt+T</kbd>                                        |
| 选中        | <kbd>Ctrl+W</kbd>选中，<kbd>Ctrl+Shift+W</kbd>取消选中       |
| 编辑常用    | <kbd>Ctrl+D</kbd>克隆，<kbd>Ctrl+Y</kbd>删除，<kbd>Ctrl+Shift+V</kbd>选择性粘贴 |
| 移动        | <kbd>Alt+Shift+&uarr;&darr;</kbd>单行移动，<kbd>Ctrl+Shift+&uarr;&darr;</kbd>整个语句移动 |
| 注释        | <kbd>Ctrl+/</kbd>单行注释，<kbd>Ctrl+Shift+/</kbd>多行注释   |
| 格式化      | <kbd>Ctrl+Alt+L</kbd>格式化代码，<kbd>Ctrl+Alt+O</kbd>优化import |
| 重构        | <kbd>Ctrl+Shift+Alt+T</kbd>重构窗口，<kbd>Shift+F6</kbd>重命名等 |
| 代码内跳转  | <kbd>Ctrl+&larr;&rarr;</kbd>按单词跳转，<kbd>Alt+&uarr;&darr;</kbd>按方法跳转，<kbd>Ctrl+[]</kbd>到前后代码块 |
| 代码间跳转  | <kbd>Ctrl+Alt+&larr;&rarr;</kbd>代码前后跳转，<kbd>Ctrl+B</kbd>到声明，<kbd>Ctrl+Alt+B</kbd>到实现，<kbd>Ctrl+U</kbd>到父类 |

## 4. 查找
| 快捷键                  | 作用           | 经验与相关                                                   |
| ----------------------- | -------------- | ------------------------------------------------------------ |
| <kbd>Shift+Shift</kbd>  | 包罗万象的查找 | <kbd>Ctrl+E</kbd>找到最近，<kbd>Ctrl+N</kbd>找类，<kbd>Ctrl+Shift+N</kbd>找文件，<kbd>Ctrl+Alt+Shift+N</kbd>找符号 |
| <kbd>Ctrl+Shift+A</kbd> | 查看命令       | 很多设置和快捷键，通过它来找到和学习                         |
| <kbd>Ctrl+F</kbd>       | 在当前文件查找 | -                                                            |
| <kbd>Ctrl+Shift+F</kbd> | 在项目内查找   | -                                                            |
| <kbd>Alt+F7</kbd>       | 找引用         | -                                                            |