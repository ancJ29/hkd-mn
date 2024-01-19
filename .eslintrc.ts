const path = require("path");

export default {
  root: true,
  plugins: ["prettier"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "eslint-config-prettier",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "comma-dangle": ["error", "only-multiline"],
    "no-unused-vars": "off",
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
    "quote-props": ["error", "as-needed"],
    "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
    "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
    "react/jsx-max-props-per-line": [
      "error",
      { maximum: 1, when: "multiline" },
    ],
    "react/react-in-jsx-scope": "off",
    indent: ["error", 2],
  },
};
