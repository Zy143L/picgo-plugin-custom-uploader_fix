const sha1 = require('js-sha1')

module.exports = (ctx) => {
  const postOptions = (image, url, postFileName, fileName, headers) => {
    const opts = {
      method: 'POST',
      url: url,
      headers: {
        contentType: 'multipart/form-data'
      },
      formData: {}
    }
    opts.formData[postFileName] = {}
    opts.formData[postFileName].value = image
    opts.formData[postFileName].options = {
      filename: fileName
    }
    try {
      headers = JSON.parse(headers)
      for (let key in headers) {
        opts.headers[key] = headers[key]
      }
    } catch (e) {
      ctx.emit('notification', {
        title: 'headers 解析失败！',
        body: e.error
      })
    }

    return opts
  }

  const handle = async function (ctx) {
    const userConfig = ctx.getConfig('picBed.custom-uploader-fix')
    if (!userConfig) {
      throw new Error('Can\'t find uploader config')
    }
    let url = userConfig.url
    const headers = userConfig.headers

    const needFileNameUrl = userConfig.needFileNameUrl
    const postFileName = userConfig.postFileName
    const jsonPath = userConfig.jsonPath
    try {
      let imgList = ctx.output
      for (let i in imgList) {
        let image = imgList[i].buffer || Buffer.from(imgList[i].base64Image, 'base64')
        if (needFileNameUrl) {
          const fileName = imgList[i].fileName
          let extension = fileName.split('.').pop()
          let timestamp = Math.floor(new Date().getTime() / 1000)
          let newfilename = sha1(timestamp.toString()) + '.' + extension.toLowerCase()
          url = url + '/' + newfilename
        }

        const options = postOptions(image, url, postFileName, imgList[i].fileName, headers)

        let res = await ctx.Request.request(options)

        delete imgList[i].base64Image
        delete imgList[i].buffer

        if (!jsonPath) {
          imgList[i]['imgUrl'] = res
        } else {
          const body = JSON.parse(res)
          // let imgUrl = body[jsonPath]
          let imgUrl = body
          for (let field of jsonPath.split('.')) {
            imgUrl = imgUrl[field]
          }
          if (imgUrl) {
            imgList[i]['imgUrl'] = imgUrl
          } else {
            ctx.emit('notification', {
              title: '返回解析失败',
              body: '请检查JsonPath设置'
            })
          }
        }
      }
    } catch (err) {
      if (err.error !== 'Upload failed') {
        const error = JSON.parse(err.response.body)
        ctx.emit('notification', {
          title: '上传失败！',
          body: error.error
        })
      }
      throw err
    }
  }
  const config = ctx => {
    let userConfig = ctx.getConfig('picBed.custom-uploader-fix')
    if (!userConfig) {
      userConfig = {}
    }
    return [
      {
        alias: 'API地址',
        name: 'url',
        type: 'input',
        default: userConfig.url || '',
        required: true,
        message: 'API地址'
      },
      {
        alias: 'API地址是否拼接文件名',
        name: 'needFileNameUrl',
        type: 'confirm',
        default: userConfig.needFileNameUrl || false,
        required: true,
        message: 'API地址是否拼接文件名'
      },
      {
        alias: 'POST文件表单名称',
        name: 'postFileName',
        type: 'input',
        default: userConfig.postFileName || '',
        required: true,
        message: 'POST文件参数名'
      },
      {
        alias: '自定义请求头',
        name: 'headers',
        type: 'input',
        default: userConfig.headers || '{}',
        required: false,
        message: '填入header key-value json'
      },
      {
        alias: '图片URL路径',
        name: 'jsonPath',
        type: 'input',
        default: userConfig.jsonPath || '',
        required: false,
        message: '图片URL JSON路径(eg: data.url)'
      }
    ]
  }
  const register = () => {
    ctx.helper.uploader.register('custom-uploader-fix', {
      handle,
      name: '自定义API图床',
      config: config
    })
  }
  return {
    uploader: 'custom-uploader-fix',
    register
  }
}
