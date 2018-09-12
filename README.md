# Next 框架与主流工具的整合

github 地址：[https://github.com/code-coder/next-mobile-complete-app](https://github.com/code-coder/next-mobile-complete-app)

##### 首先，clone 了 next.js 项目，学习里面的 templates。

##### 打开一看，我都惊呆了，差不多有 150 个搭配工具个 template，有点眼花缭乱。

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
- [x] 请求拦截、loading 状态及错误处理

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

```
// other.js
static getInitialProps({ ctx }) {
    const { store, req } = ctx;
    // 通过这个action改变导航栏的标题
    store.dispatch(setNav({ navTitle: 'Other' }));
    const language = req ? req.headers['accept-language'] : navigator.language;

    return {
      language
    };
  }
```

```
// NavBar.js
componentDidMount() {
// 通过监听route事件，判断是否显示返回箭头
Router.router.events.on('routeChangeComplete', this.handleRouteChange);
}

handleRouteChange = url => {
if (window && window.history.length > 0) {
  !this.setState.canGoBack && this.setState({ canGoBack: true });
} else {
  this.setState.canGoBack && this.setState({ canGoBack: false });
}
};
```

```
// NavBar.js
let onLeftClick = () => {
  if (this.state.canGoBack) {
    // 返回上级页面
    window.history.back();
  }
};
```

> **需要留意的是，在同一个页面改变 query，不会覆盖 history 的记录，而是增加一条，因此调用 history.back()只是根据浏览器地址记录返回。这里可以再做优化。**

#### 3、请求拦截、loading 状态及错误处理

- **封装 fetch 请求，使用单例模式对请求增加 Authrition 授权、全局 loading 等处理。**
  > 要点：1、单例模式。2、延迟 loading。3、server 端渲染时不能加载 loading，因为 loading 是通过 document 对象操作的

```
// /api/proxyFetch.js
import { Toast } from 'antd-mobile';
import 'isomorphic-unfetch';

// 请求超时时间设置
const REQUEST_TIEM_OUT = 10 * 1000;
// loading延迟时间设置
const LOADING_TIME_OUT = 1000;

class ProxyFetch {
  constructor() {
    this.fetchInstance = null;
    this.urlPrefix = '';
    this.headers = { 'Content-Type': 'application/json', DeviceId: 'android/ios' };
    this.init = { credentials: 'omit', headers: this.headers };
    // 处理loading
    this.requestCount = 0;
    this.isLoading = false;
    this.loadingTimer = null;
  }

  /**
   * 请求1s内没有响应显示loading
   */
  showLoading() {
    if (this.requestCount === 0) {
      this.loadingTimer = setTimeout(() => {
        Toast.loading('加载中...', 0);
        this.isLoading = true;
        this.loadingTimer = null;
      }, LOADING_TIME_OUT);
    }
    this.requestCount++;
  }

  hideLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      if (this.loadingTimer) {
        clearTimeout(this.loadingTimer);
        this.loadingTimer = null;
      }
      if (this.isLoading) {
        this.isLoading = false;
        Toast.hide();
      }
    }
  }

  /**
   * 获取proxyFetch单例对象
   */
  static getInstance() {
    if (!this.fetchInstance) {
      this.fetchInstance = new ProxyFetch();
    }
    return this.fetchInstance;
  }

  /**
   * get请求
   * @param {*} url
   * @param {*} params
   */
  async get(url, params = {}, isServer = false) {
    const options = { method: 'GET' };
    if (params) {
      let paramsArray = [];
      // encodeURIComponent
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    return await this.dofetch(url, options, isServer);
  }

  /**
   * post请求
   * @param {*} url
   * @param {*} params
   */
  async post(url, params = {}, isServer = false) {
    const options = { method: 'POST' };
    let data = '';
    switch (params.bodyType) {
      case 'form':
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        Object.keys(params.bodys).map(index => {
          let param = encodeURI(params.bodys[index]);
          data += `${index}=${param}&`;
        });
        options.body = data;
        break;
      case 'file':
        data = new FormData();
        Object.keys(params.bodys).map(index => {
          data.append(index, params.bodys[index]);
        });
        options.body = data;
        break;
      default:
        options.body = JSON.stringify(params);
        break;
    }
    return await this.dofetch(url, options, isServer);
  }

  /**
   * fetch主函数
   * @param {*} url
   * @param {*} options
   * @param {boolean} isServer 是否是服务端渲染的请求
   * @param {boolean} setAuthorization 登录接口设置Authorization
   */
  dofetch(url, options, isServer, setAuthorization) {
    !isServer && this.showLoading();
    return Promise.race([
      fetch(this.urlPrefix + url, { ...this.init, ...options }),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), REQUEST_TIEM_OUT);
      })
    ])
      .then(response => {
        !isServer && this.hideLoading();
        if (setAuthorization) {
          this.headers.Authorization = response.json().token;
          return {};
        } else {
          return response;
        }
      })
      .catch(e => {
        if (!server) {
          this.hideLoading();
          Toast.fail(e.message);
        }
        return { ok: false, status: '501', statusText: e.message };
      });
  }
}

export default ProxyFetch.getInstance();
```

##### 最后，一个完整项目的雏形大致出来了，但是还是需要在实践中不断打磨和优化。

##### 如有错误和问题欢迎各位大佬不吝赐教 :)
