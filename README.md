# picgo-plugin-custom-uploader-fix


### 安装

![](http://cdn.u1.huluxia.com/g4/M03/74/23/rBAAdmLyqhOARkPHAABVEur9wn8448.png)

## 配置

![](http://cdn.u1.huluxia.com/g4/M02/74/24/rBAAdmLyrDCAJ5I2AABZmU2-cMo899.png)

**修复jsonpath解析部分**

**移除部分设置**

**移除sha1依赖**


| 设置项         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| API地址        | api url                                                      |
| 图片表单名称 | multipart/form-data Body 参数名              |
| 自定义请求头   | Header 中可能会需要鉴权key value，使用json字符串传入         |
| 图片URL路径    | url 在返回 response 的 json 路径 , 例如 data.url             |

