# picgo-plugin-custom-uploader-fix


### 安装

![](http://cdn.u1.huluxia.com/g4/M03/74/23/rBAAdmLyqhOARkPHAABVEur9wn8448.png)

## 配置

![](http://cdn.u1.huluxia.com/g4/M03/74/23/rBAAdmLyqe6AJM-hAAB5smo-eXA031.png)

**修复jsonpath解析部分**

| 设置项         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| API地址        | api url                                                      |
| 是否拼接文件名 | 有些图床需要把文件名作为path参数拼接，默认拼接到api末尾，和url用"/"分隔 |
| POST表单名称 | multipart/form-data请求中part名                              |
| 自定义请求头   | Header 中可能会需要鉴权key value，使用json字符串传入         |
| 图片URL路径    | url 在返回 response 的 json 路径 , 例如 data.url             |

