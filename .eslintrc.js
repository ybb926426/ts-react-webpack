// eslint：javascript代码检测工具，使用espree解析器
// @typescript-eslint/parser：将 TypeScript 转换为 ESTree，使 eslint 可以识别
// @typescript-eslint/eslint-plugin：只是一个可以打开或关闭的规则列表

// prettier:  格式化规则程序
// eslint-config-prettier: 禁用所有和 Prettier 产生冲突的规则
// eslint-plugin-prettier: 把 Prettier 应用到 Eslint，配合 rules  "prettier/prettier": "error" 实现 Eslint 提醒


module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  globals: {

  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  // 解析器
  parser: '@typescript-eslint/parser',
  // 继承的规则 [扩展]
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended'
  ],
  // 插件
  plugins: [
    'react',
    'react-hooks',
    // 'prettier',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  // 规则
  rules: {
    'no-unused-vars': 1,
  }
}
