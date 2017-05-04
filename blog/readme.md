阅读笔记
========================

## 此项目基于 koa 2.x版本

#### 功能
```
    koa 1.0 迁移至 koa2.x, 取消使用generator语法
  演示了路由和模板的用法, post请求体的解析
```

#### 代码分析
```
    app.js:   
        主入口, 路由解析 --> 调用 自定义的render组件, post请求体解析
    render.js:  
        使用 co-views 匹配数据 渲染 至对应 html模板, 可适配swig/nunjucks/ejs 等模板引擎
    test.js:
        单元测试, 使用的 mocha, supertest 组件
```
#### koa2 和 koa 1.x 的区别
      Koa2 应用了ES7的 Async/Await来替代 Koa1中的生成器函数generator与yield。
      
## 依赖的库
```
    "dependencies": {
    "co": "^4.1.0", // 
    "co-body": "^1.0.0",  // post请求体解析, 在 koa2中建议替换为 koa-bodyparser
    "co-busboy": "^1.0.2",  //  解析multipart请求体。（这里简单理解为前端使用FormData上传数据，后端需要用这个中间件来解析）
    "co-fs": "^1.2.0",  // 本地文件处理
    "co-views": "^2.1.0",   // 对通用模板引擎渲染平台 consolidate 的封装，支持包括 ejs, mustache, swig 等各种模板渲染并提供统一的 api 调用方法。
    "koa": "^1.0.0",  // koa核心库
    "koa-logger": "^1.2.1", // 日志
    "koa-route": "^1.1.4" // 内置路由: url映射处理
  }
  ```
