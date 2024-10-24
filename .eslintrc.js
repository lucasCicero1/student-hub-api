module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "jest"],
  ignorePatterns: ["node_modules/"],
  rules: {
    quotes: ["error", "double"],
    "class-methods-use-this": "off",
    "no-promise-executor-return": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
  },
};
