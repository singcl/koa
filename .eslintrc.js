// http://eslint.cn/docs/user-guide/configuring
module.exports = {
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
        
    },
    "globals": {},
    "extends": "eslint:recommended",
    "rules": {
      "max-len": ["error", { "comments": 200 }],
      "linebreak-style": 0,
      "indent": ["error", 4],
      "no-var": "off",
      "semi": ["error", "never"],
      "max-len": ["error", 150],
      "no-multi-spaces": ["error", { ignoreEOLComments: true }],
      "no-console": 0
    }
};