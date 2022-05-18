module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'warn',
        'indent': [
            'error',
            4
        ],
        'vue/attribute-hyphenation': 'off',
        'vue/require-v-for-key': 'off',
        'vue/require-default-prop': 'warn',
        'vue/no-v-html': 'off',
        'vue/script-indent': [
            'warn',
            4,
            {
                'baseIndent': 1
            }
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                'baseIndent': 1
            }
        ]
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                'indent': 'off'
            }
        }
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    }
}
