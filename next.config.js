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
    config.resolve.alias = {
      components: path.resolve(__dirname, 'components'),
      styles: path.resolve(__dirname, 'styles'),
      images: path.resolve(__dirname, 'static/images'),
      api: path.resolve(__dirname, 'api'),
      actions: path.resolve(__dirname, 'store/actions'),
      utils: path.resolve(__dirname, 'static/utils')
    };
    config.module.rules.push({
      test: /\.(svg)$/i,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      },
      include: [moduleDir('antd-mobile'), __dirname]
    });
    return config;
  }
});
