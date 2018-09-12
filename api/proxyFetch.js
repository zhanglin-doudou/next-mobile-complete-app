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
