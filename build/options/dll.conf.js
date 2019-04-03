const webpack = require('webpack')
const WebpackChain = require('webpack-chain')
const TerserPlugin = require('terser-webpack-plugin')
const progressBarPlugins = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const conf = require('../utils/conf')
const { resolve } = require('../utils')

const config = new WebpackChain()

function _webpack_dll(){

    config.mode("production")

    config
        // 所有和react相关的库
        .entry('_react')
            .add(resolve('build/options/vendors.react.js'))
            .end()
        .entry('_library')
            .add(resolve('build/options/vendors.library.js'))
            .end()
        .output
            .path(resolve('dll'))
            .filename('[name].dll.[hash:5].js')
            .library('_dll_[name]')

    config
        .plugin('dll-plugin')
            .use(webpack.DllPlugin, [{
                path: resolve('dll/[name].manifest.json'),
                name: "_dll_[name]",
                context: conf.context
            }])
            .end()
        .plugin('progress-bar')
            .use(progressBarPlugins, [{
                format: chalk.blue.bold('build  ') + chalk.cyan('[:bar]') + chalk.green.bold(':percent') + ' (' + chalk.magenta(":elapsed") + ' seconds) ',
                clear: false
            }])
            .end()


    config.optimization
            .minimizer('terser-uglifyjs')
                .use(TerserPlugin, [{
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }])
                .end()

    return config.toConfig()

}

module.exports = _webpack_dll
