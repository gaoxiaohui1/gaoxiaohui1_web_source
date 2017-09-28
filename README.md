# gaoxiaohui1_web_source

> A Vue.js project. source code for https://gaoxiaohui1.github.io

## cms proj

``` bash
# 数据存储
暂时使用Local Storage

# userinfo(userid,username,userstatus(0-有效;9-删除))获取userid校验username
key=cms_user_ids value=[{a:0,b:'asd',c:0},{a:1,b:'asd',c:9}]

# userinfo(userid,username,password,nickname,userstatus(0-有效;9-删除))获取用户信息
key=cms_user_0 value={a:0,b:'asd',c:'123',d:'dsa',e:0}

# newsinfo(newsid,newsstatus(0-草稿;1-发布;9-删除))获取newsid
key=cms_news_ids value=[{a:0,b:0},{a:1,b:1},{a:2,b:9}]

# newsinfo(id,title,type,author,publishTime,publishUser,readCount,publishUserID,inserttime,updateTime)
key=cms_news_0 value={a:0,b:'asd',c:0,d:'g',e:'2017-7-7',f:'asd',f:1,f:0,f:'2017-7-7',f:'2017-7-7'}

# 数据返回格式
{ IsSuccess: true, Msg: '', Value: { data: 123 } }

# 数据返回格式
{ IsSuccess: true, Msg: '', Value: { data: [{a:1,b:''}],totalCount:12 } }

# /cms/fp/~
cms网站前台页面（无需登陆）

# /cms/bp/~
cms网站后台页面（需登录）

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
