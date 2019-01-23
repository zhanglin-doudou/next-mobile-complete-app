const isProd = process.env.NODE_ENV === 'production';
// 客户端渲染api请求地址
process.env.BACKEND_URL = isProd ? '/' : 'https://jsonplaceholder.typicode.com';
// 服务器渲染api请求地址，可以是内网地址
process.env.BACKEND_URL_SERVER_SIDE = isProd ? 'http://bff.api.com' : 'https://jsonplaceholder.typicode.com';

module.exports = {
  'process.env.BACKEND_URL': process.env.BACKEND_URL,
  'process.env.BACKEND_URL_SERVER_SIDE': process.env.BACKEND_URL_SERVER_SIDE,
};
