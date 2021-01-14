// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  env: {
    es6: true,
  },
  plugins: ["import"],
  extends: ["plugin:@typescript-eslint/recommended", "airbnb", "ziu"],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        directory: "./tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  // add your custom rules here
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/interface-name-prefix": {
      prefixWithI: "always",
    },
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/camelcase": 0,
    "prefer-promise-reject-errors": 0,
    "object-curly-newline": 0,
    "no-plusplus": 0,
    "no-param-reassign": ["error", { props: false }],
    "linebreak-style": 0,
    "no-use-before-define": 0,
    "class-methods-use-this": 0,
    "operator-linebreak": [
      2,
      "after",
      {
        overrides: {
          "?": "before",
          ":": "before",
        },
      },
    ],
    // not require constant expressions in conditions
    "no-constant-condition": 0,
    // not require === and !===
    eqeqeq: 0,
    // allow multiline strings
    "no-multi-str": 0,
    // enforce 4 space indent
    indent: ["error", 2, { SwitchCase: 1 }],
    // undef
    "no-undef": 2,
    // allow variable decalared separately in functions
    "one-var": 0,
    // allow either backticks, double or single quotes
    quotes: 0,
    // enforce no sapce before function parent
    "space-before-function-paren": ["error", "never"],
    // not require camlecase
    camelcase: 0,
    // not require newline at the end of files
    "eol-last": 0,
    // disallow semi in line end
    semi: ["error", "always"],
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  },
};
