const constants = require('./constants')
const { resolve } = require('./index')

const STATICDOMAIN = constants.APP_ENV === 'prod' ? '.' : ''

module.exports = {
    assetsPublicPath: constants.APP_ENV === 'dev' ? '/' : `${STATICDOMAIN}/`,
    assetsSubDirectory: 'static',
    sourceMap: constants.APP_ENV === 'dev' ? 'source-map' : constants.APP_ENV === 'prod' ? 'cheap-module-source-map' : false,
    extractCss: constants.APP_ENV !== 'dev',
    bundleAnalyzerReport: process.env.npm_config_report
}
