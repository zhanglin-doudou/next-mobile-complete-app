module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    'arrow-parens': 0,
    'linebreak-style': ['error', 'unix'],
    // 允许async-await
    'generator-star-spacing': 0,
    // 允许开发环境debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 'off',
    'no-undef': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // 一个函数的复杂性不超过 10，所有分支、循环、回调加在一起，在一个函数里不超过 10 个
    complexity: [2, 10],
    // 一个函数的嵌套不能超过 4 层，多个 for 循环，深层的 if-else，这些都是罪恶之源
    'max-depth': [2, 4],
    // 一个函数最多有 3 层 callback，使用 async/await
    'max-nested-callbacks': [2, 3],
    // 一个函数最多 5 个参数。参数太多的函数，意味着函数功能过于复杂，请拆分
    'max-params': [2, 5],
    // 一个函数最多有 50 行代码，如果超过了，请拆分之，或者精简之
    'max-statements': [2, 50],
    // react配置
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0
  }
};
