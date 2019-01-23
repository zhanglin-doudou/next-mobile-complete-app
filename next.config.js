/* eslint-disable */
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './antd-custom.less'), 'utf8'));

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
  require.extensions['.css'] = file => {};
}

module.exports = withCSS(
  withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
      webpack: config => {
        config.resolve.extensions = ['.web.js', '.js', '.json'];
        config.resolve.alias = {
          components: path.resolve(__dirname, 'components'),
          styles: path.resolve(__dirname, 'styles'),
          images: path.resolve(__dirname, 'static/images'),
          api: path.resolve(__dirname, 'api'),
          actions: path.resolve(__dirname, 'store/actions'),
          utils: path.resolve(__dirname, 'utils'),
        };
        return config;
      },
    })
  )
);
