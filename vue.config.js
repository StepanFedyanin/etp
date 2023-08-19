const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service');
const miniSVGDataURI = require('mini-svg-data-uri');

module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: config => {
        return {
            node: {
                __filename: true,
                __dirname: true
            },
            plugins: [
                new webpack.NormalModuleReplacementPlugin(/settings$/, function(resource) {
                    resource.request = resource.request.replace(/settings$/, `settings/${process.env.NODE_ENV}`);
                })
            ],
            module: {
                rules: [
                    {
                        test: /\.(svg)$/i,
                        type: 'asset',
                        generator: {
                            dataUrl(content) {
                                content = content.toString();
                                return miniSVGDataURI(content);
                            }
                        },
                        use: 'svgo-loader'
                    },
                ]
            },
            output: {
                libraryExport: 'default'
            },

        };
    },
    /*
    chainWebpack: config => {
        const svgToMiniDataURI = require('mini-svg-data-uri');
        const svgRule = config.module.rule('svg');

        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        svgRule.uses.clear();

        // add replacement loader(s)
        svgRule
            .use('url-loader')
            .loader('url-loader')
            .options({
                generator: (content) => svgToMiniDataURI(content.toString()),
            });
    },
    */
    css: {
        sourceMap: true
    },
})
