module.exports = {
    "env": {
        "node": true,
        "browser":true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
      "__DEV__":true  
    },
    "extends": "eslint:recommended",
    "parser":"babel-eslint",
    "parserOptions": {
        "ecmaVersion":7,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "no-unused-vars": [0, {
            "vars": "local",
            "args": "after-used"
        }],
        "guard-for-in":0,
        "no-invalid-regexp": 2,
        "no-extra-semi": 2,
        "no-extra-boolean-cast": 0,
        "no-obj-calls": 2,
        "no-reserved-keys": 0,
        "no-sparse-arrays": 2,
        "no-unreachable": 2,
        "eqeqeq": 2,
        "comma-dangle": [2, "never"],
        "guard-for-in": 2,
        "vars-on-top": 2,
        "no-use-before-define": 0,
        "semi": [
            "error",
            "never"
        ]
    }
};