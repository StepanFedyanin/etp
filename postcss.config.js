module.exports = {
    parser: 'postcss',
    plugins: {
        'postcss-import': {},
        'postcss-mixins': {},
        'postcss-nested': {},
        'postcss-simple-vars': {},
        'postcss-hexrgba': {},
        'postcss-color-function': {},
        'postcss-font-weights': {},
        'postcss-inline-svg': {
            paths: ['./src']
        },
        'postcss-math': {
            functionName: 'calculate'
        },
        'postcss-conditionals': {},
        'postcss-preset-env': {}
    },
    // plugins: [
    //     require('postcss-mixins'),
    //     require('autoprefixer'),
    //     require('postcss-import'),
    //     require('postcss-nested'),
    //     require('postcss-simple-vars'),
    //     require('postcss-hexrgba'),
    //     require('postcss-color-function'),
    //     require('postcss-font-weights'),
    //     require('postcss-inline-svg')({ paths: ['./src'] }),
    //     require('postcss-math')({ functionName: 'calculate' }),
    //     require('postcss-conditionals'),
    //     require('postcss-preset-env'),
    // ]
}
