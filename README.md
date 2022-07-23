# 蒲公英OKR前端项目文档


### 项目简介
> [蒲公英OKR]项目前端项目

### 项目前端依赖

* 主技术栈：Vue生态(Vue3.0 + Vue Router + Vuex)
* 构建工具：[vite](https://vitejs.cn/)
* UI组件库：[ElementPlus](https://element-plus.gitee.io/zh-CN/guide/design.html)
  ElementPlus是基于sass构建，所以要安装sass和sass-loader
* Ajax：[Axios](http://www.axios-js.com/)

### 项目依赖的插件/包
```shell
npm install element-plus --save  //安装element-plus版本
npm i vite-plugin-style-import -D  //安装按需加载element-plus组件的方法 将根据组件自动加载样式文件
npm install qs //qs是一个流行的查询参数序列化和解析库
```

### 启动项目
```shell
npm install
npm run dev
```

### 项目目录
```shell
.
.
├── README.md
├── dist
│?? ├── assets
│?? ├── favicon.ico
│?? └── index.html
├── index.html
├── package.json
├── public
│?? └── favicon.ico
├── src
│?? ├── App.vue
│?? ├── assets
│?? ├── components
│?? ├── main.js
│?? ├── pages
│?? ├── router
│?? └── utils
│?? └── vuex
└── vite.config.js
```
### 打包项目
```shell
npm run build
```
原来是计划使用vite的env模式区分环境打包，现在因为服务端改了接口联调模式（统一接口，使用HOST映射请求环境），所以暂时没用

### 部署项目
使用云效流水线，云效流水线的使用请咨询@一醉，稍后补充文档，工程文件中的deploy.sh文件是流水线主机部署的shell脚本（pu-okr为例）

```shell
if [ ! -d "/home/admin/pu-okr/dist" ]; then
  mkdir -p /home/admin/pu-okr/dist
fi
tar zxvf /home/admin/pu-okr/package.tgz -C /home/admin/pu-okr/dist
rm -rf /var/www/okr
if [ ! -d "/var/www/okr" ]; then
  mkdir -p /var/www/okr
fi
mv /home/admin/pu-okr/dist/index.html /var/www/okr
```

### 项目业务文档

```shell
todo..
```
