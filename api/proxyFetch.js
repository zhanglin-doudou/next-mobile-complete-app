import Toast from 'utils/toast';
import 'isomorphic-unfetch';
import Router from 'next/router';

// 请求超时时间设置
const REQUEST_TIEM_OUT = 10 * 1000;
// loading延迟时间设置
const LOADING_TIME_OUT = 1000;

class ProxyFetch {
  constructor() {
    this.fetchInstance = null;
    this.headers = { 'Content-Type': 'application/json' };
    this.init = { credentials: 'include', mode: 'cors' };
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
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async get(url, params = {}, settings = {}) {
    const options = { method: 'GET' };
    if (params) {
      let paramsArray = [];
      // encodeURIComponent
      Object.keys(params).forEach(key => {
        if (params[key] instanceof Array) {
          const value = params[key].map(item => '"' + item + '"');
          paramsArray.push(key + '=[' + value.join(',') + ']');
        } else {
          paramsArray.push(key + '=' + params[key]);
        }
      });
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    return await this.dofetch(url, options, settings);
  }

  /**
   * post请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async post(url, params = {}, settings = {}) {
    const options = { method: 'POST' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * put请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async put(url, params = {}, settings = {}) {
    const options = { method: 'PUT' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * put请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async delete(url, params = {}, settings = {}) {
    const options = { method: 'DELETE' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * fetch主函数
   * @param {*} url
   * @param {*} options
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  dofetch(url, options, settings = {}) {
    const { isServer, noLoading, cookies = {} } = settings;
    let loginCondition = false;
    if (isServer) {
      this.headers.cookies = 'EGG_SESS=' + cookies['EGG_SESS'];
    }
    if (!isServer && !noLoading) {
      loginCondition = Router.route.indexOf('/login') === -1;
      this.showLoading();
    }
    const prefix = isServer ? process.env.BACKEND_URL_SERVER_SIDE : process.env.BACKEND_URL;
    return Promise.race([
      fetch(prefix + url, { headers: this.headers, ...this.init, ...options }),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), REQUEST_TIEM_OUT);
      }),
    ])
      .then(response => {
        !isServer && !noLoading && this.hideLoading();
        if (response.status === 500) {
          throw new Error('服务器内部错误');
        } else if (response.status === 404) {
          throw new Error('请求地址未找到');
        } else if (response.status === 401) {
          if (loginCondition) {
            Router.push('/login?directBack=true');
          }
          throw new Error('请先登录');
        } else if (response.status === 400) {
          throw new Error('请求参数错误');
        } else if (response.status === 204) {
          return { success: true };
        } else {
          return response && response.json();
        }
      })
      .catch(e => {
        if (!isServer && !noLoading) {
          this.hideLoading();
          Toast.info(e.message);
        }
        return { success: false, statusText: e.message };
      });
  }
}

export default ProxyFetch.getInstance();
