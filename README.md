# picgo-plugin-custom-uploader

## 修复jsonpath部分


### 安装

![](http://img-ys011.didistatic.com/static/mit/static/5025df13/20200702153209.png)

## 配置

![](http://img-ys011.didistatic.com/static/mit/static/0a6c4a21/20200702151551.png)

| 设置项         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| API地址        | api url                                                      |
| 是否拼接文件名 | 有些图床需要把文件名作为path参数拼接，默认拼接到api末尾，和url用"/"分隔 |
| POST file name | multipart/form-data请求中part名                              |
| POST headers   | Header 中可能会需要鉴权key value，使用json字符串传入         |
| 图片URL路径    | url 在返回 response 的 json 路径 , 例如 data.url             |

