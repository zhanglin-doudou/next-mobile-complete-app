# Next 框架与主流工具的整合

##### 首先，先 clone 了 next.js 项目，学习里面的 templates。

##### 打开下来一看，惊呆了，差不多有 150 个搭配工具个 template。

##### 这时候就需要明确一下我们要用哪些主流的工具了:

- [x] 数据层：redux + saga
- [x] 视图层：sass + postcss
- [x] 服务端：koa

### 做一个项目就像造一所房子，最开始就是“打地基”：

#### 1. 新建了一个项目，用的是这里面的一个 with-redux-saga 的 template [戳这里](https://github.com/zeit/next.js/tree/canary/examples/with-redux-saga)。

#### 2. 添加 sass 和 postcss，参考的是 [这里](https://github.com/zeit/next-plugins/tree/master/packages/next-sass)

- 新建`next.config.js`，复制以下代码：

```js
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME)
      }
    }
  }
});
```

- 新建`postcss.config.js`，复制以下代码：

```js
module.exports = {
  plugins: {
    autoprefixer: {}
  }
};
```

- 在`package.js`添加自定义 browserList，这个就根据需求来设置了，这里主要是移动端的。

```js
// package.json
"browserslist": [
    "IOS >= 8",
    "Android > 4.4"
  ],
```

- 顺便说一下 browserlist 某些配置会报错，比如直接填上默认配置

```
"browserslist": [
    "last 1 version",
    "> 1%",
    "maintained node versions",
    "not dead"
  ]
// 会报以下错误
Unknown error from PostCSS plugin. Your current PostCSS version is 6.0.23, but autoprefixer uses 5.2.18. Perhaps this is the source of the error below.
```

#### 3. 配置 koa，参照[custom-server-koa](https://github.com/zeit/next.js/tree/canary/examples/custom-server-koa)

- 新建`server.js`文件，复制以下代码：

```
const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/other', async ctx => {
    await app.render(ctx.req, ctx.res, '/another', ctx.query);
    ctx.respond = false;
  });

  router.get('/another', async ctx => {
    await app.render(ctx.req, ctx.res, '/other', ctx.query);
    ctx.respond = false;
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

- 然后在配置一下`package.json`的 scripts

```
"scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
```

### 现在只是把地基打好了，接着需要完成排水管道、钢筋架构等铺设：

- [x] 调整项目结构
- [x] layout 布局设计
- [x] 错误页面

#### 1. 调整后的项目结构

```
-- components
-- pages
++ server
|| -- server.js
-- static
++ store
|| ++ actions
||    -- index.js
|| ++ reducers
||    -- index.js
|| ++ sagas
||    -- index.js
-- styles
-- next.config.js
-- package.json
-- postcss.config.js
-- README.md
```

#### 2. layout 布局设计。

`ant design` 一直是使用过而且比较有好感的 UI 框架。既然这是移动端的项目，[ant design mobile](https://mobile.ant.design/docs/react/introduce-cn) 成了首选的框架。我也看了其他的主流 UI 框架，现在流行的 UI 框架有[Amaze UI](http://amazeui.org/getting-started)、[Mint UI](https://mint-ui.github.io/#!/zh-cn)、[Frozen UI](http://frozenui.github.io/)等等，个人还是比较喜欢 ant design 出品的。

恰好 templates 中有 ant design mobile 的 demo：[with-ant-design-mobile](https://github.com/zeit/next.js/tree/canary/examples/with-antd-mobile)。

- 基于上面的项目结构整合`with-ant-design-mobile`这个 demo。
- 新增 babel 的配置文件：.babelrc 添加以下代码：

```
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd-mobile"
      }
    ]
  ]
}
```

- **修改 next.config.js 为：**

```
const withSass = require('@zeit/next-sass');
const path = require('path');
const fs = require('fs');
const requireHacker = require('require-hacker');

function setupRequireHacker() {
  const webjs = '.web.js';
  const webModules = ['antd-mobile', 'rmc-picker'].map(m => path.join('node_modules', m));

  requireHacker.hook('js', filename => {
    if (filename.endsWith(webjs) || webModules.every(p => !filename.includes(p))) return;
    const webFilename = filename.replace(/\.js$/, webjs);
    if (!fs.existsSync(webFilename)) return;
    return fs.readFileSync(webFilename, { encoding: 'utf8' });
  });

  requireHacker.hook('svg', filename => {
    return requireHacker.to_javascript_module_source(`#${path.parse(filename).name}`);
  });
}

setupRequireHacker();

function moduleDir(m) {
  return path.dirname(require.resolve(`${m}/package.json`));
}

module.exports = withSass({
  webpack: (config, { dev }) => {
    config.resolve.extensions = ['.web.js', '.js', '.json'];

    config.module.rules.push(
      {
        test: /\.(svg)$/i,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        },
        include: [moduleDir('antd-mobile'), __dirname]
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [moduleDir('antd-mobile'), __dirname]
      }
    );
    return config;
  }
});
```

- **static 新增 hd.min.js**

```
// 这里做了一些小改动，meta标签固定1倍，根节点的fontSize为375设计稿 / 10px
!(function(e) {
  function t(a) {
    if (i[a]) return i[a].exports;
    var n = (i[a] = { exports: {}, id: a, loaded: !1 });
    return e[a].call(n.exports, n, n.exports, t), (n.loaded = !0), n.exports;
  }
  var i = {};
  return (t.m = e), (t.c = i), (t.p = ''), t(0);
})([
  function(e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var i = window;
    (t['default'] = i.flex = function(e, t) {
      var a = e || 10,
        n = t || 1,
        r = i.document,
        o = navigator.userAgent,
        d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
        l = o.match(/U3\/((\d+|\.){5,})/i),
        c = l && parseInt(l[1].split('.').join(''), 10) >= 80,
        p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
        s = i.devicePixelRatio || 1;
      p || (d && d[1] > 534) || c || (s = 1);

      var u = 1,
        m = r.querySelector('meta[name="viewport"]');
      m || ((m = r.createElement('meta')), m.setAttribute('name', 'viewport'), r.head.appendChild(m)),
        m.setAttribute(
          'content',
          'width=device-width,user-scalable=no,initial-scale=' + u + ',maximum-scale=' + u + ',minimum-scale=' + u
        ),
        (r.documentElement.style.fontSize = (a / 2) * s * n + 'px');
    }),
      (e.exports = t['default']);
  }
]);
flex(10, 1);
```

- **\_document.js 新增引用**：

```html
<script src="/static/hd.min.js" />
<link rel="stylesheet" type="text/css" href="//unpkg.com/antd-mobile/dist/antd-mobile.min.css" />
```

- **构造布局**

1. 在 components 文件夹新增**layout**和**tabs**文件夹

```
++ components
|| ++ layout
|| || -- Layout.js
|| || -- NavBar.js
|| ++ tabs
|| || -- TabHome.js
|| || -- TabIcon.js
|| || -- TabTrick.js
|| || -- Tabs.js
```

2. 应用页面大致结构是（意思一下）

- 首页

| nav     |
| ------- |
| content |
| tabs    |

- 其他页

| nav     |
| ------- |
| content |

- **最后，使用 redux 管理 nav 的 title，使用 router 管理后退的箭头**

#### 3、错误页面处理
