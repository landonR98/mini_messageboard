module.exports = {
  "env": {
      "browser": true,
      "node": false,
      "commonjs": true,
      "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
      {
          "env": {
              "node": false
          },
          "files": [
              ".eslintrc.{js,cjs}"
          ],
          "parserOptions": {
              "sourceType": "script"
          }
      }
  ],
  "parserOptions": {
      "ecmaVersion": "latest"
  },
  "rules": {
      "no-unused-vars": 0
  }
}