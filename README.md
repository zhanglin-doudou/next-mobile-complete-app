# next-mobile-complete-demo &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

A mobile web application demo with [next](https://nextjs.org), [redux](https://github.com/reduxjs/redux), [redux-saga](https://github.com/redux-saga/redux-saga), [koa](https://github.com/koajs/koa), sass, postcss, [ant-design-mobile](https://github.com/ant-design/ant-design-mobile).

→ [中文](./README.zh.md)

## Installing / Getting started

```shell
npm install
npm run dev
```

And then, server is running on `3002` port.

![截图示例](http://doudou-static.oss-cn-shanghai.aliyuncs.com/%E5%B8%83%E5%B1%80.png)

## Structure

```
--------------------------------------------------------------------|
src
|-+api
|   |--proxyFetch.js          // Sington Fetch
|   |
|-+components                 // follow the pages
|   +--common
|   |   |...
|   +--layout
|   |   |...
|   +--tabs
|   |   |--TabCourse.js
|   |   |--TabIcon.js
|   |   |--TabTrick.js
|   |
|--env-config                  // environment variables
|   |
|-+pages
|   |...
|   |   |
|-+server
|   |
+--static
|   |...
+--utils
+--stores
|   |
|-+styles
|   |--base.scss
--------------------------------------------------------------------|
```

## Configuration

`env-config.js`

```js
const isProd = process.env.NODE_ENV === 'production';

process.env.BACKEND_URL = isProd ? '/' : 'https://jsonplaceholder.typicode.com';
process.env.BACKEND_URL_SERVER_SIDE = isProd ? 'http://bff.api.com' : 'https://jsonplaceholder.typicode.com';

module.exports = {
  'process.env.BACKEND_URL': process.env.BACKEND_URL,
  'process.env.BACKEND_URL_SERVER_SIDE': process.env.BACKEND_URL_SERVER_SIDE
};
```

## Style guide

Strongly Recommend to use [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/). See more detail at `.eslintrc.js` and `.prettierrc`.

## Recipes

- Try to use `Promise.all()` when there are independent requests. _e.g.:_

```js
static async getInitialProps({ ctx }) {
const { store, isServer , cookies} = ctx;
const [res_1, res_2] = await Promise.all([proxyFetch.get('https://jsonplaceholder.typicode.com/users', {}, { isServer, cookies }), proxyFetch.get('https://jsonplaceholder.typicode.com/users', {}, { isServer, cookies })])
return { res_1, res_2 };
}
```

- Module imports `lodash`. Be careful when you use data from the request. You must take it into account that how to deal with **bad request** or **empty data**.

## Documents

- [Next 轻量级框架与主流工具的整合](https://segmentfault.com/a/1190000016383263)
- [移动端优雅布局实践](https://segmentfault.com/a/1190000017913569)
- [Next 轻量级框架与主流工具的整合（二）](https://segmentfault.com/a/1190000017947264)
