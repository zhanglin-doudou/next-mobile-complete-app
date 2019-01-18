# next-mobile-complete-demo &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

A mobile web application demo with [next](https://nextjs.org), [redux](https://github.com/reduxjs/redux), [redux-saga](https://github.com/redux-saga/redux-saga), [koa](https://github.com/koajs/koa), sass, postcss, [ant-design-mobile](https://github.com/ant-design/ant-design-mobile).

## Installing / Getting started

```shell
npm install
npm run dev
```

And then, server is running on `3002` port.

## Configuration

`env-config.js`

```js
const isProd = process.env.NODE_ENV === 'production';
// 客户端渲染api请求地址
process.env.BACKEND_URL = isProd ? '/relative_url' : 'https://jsonplaceholder.typicode.com';
// 服务器渲染api请求地址，可以是内网地址
process.env.BACKEND_URL_SERVER_SIDE = isProd ? 'http://bff.api.com' : 'https://jsonplaceholder.typicode.com';

module.exports = {
  'process.env.BACKEND_URL': process.env.BACKEND_URL,
  'process.env.BACKEND_URL_SERVER_SIDE': process.env.BACKEND_URL_SERVER_SIDE
};
```

## Style guide

Strongly Recommend to use [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/). See more detail at `.eslintrc.js` and `.prettierrc`.

## Documents

- [Next 轻量级框架与主流工具的整合](https://segmentfault.com/a/1190000016383263)
- [移动端优雅布局实践](https://segmentfault.com/a/1190000017913569)
- [Next 轻量级框架与主流工具的整合（二）](https://segmentfault.com/a/1190000017947264)
