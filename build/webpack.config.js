const constants = require('./utils/constants')
const chalk = require('chalk')

module.exports = function _webpack_entry( APP_CONF = {} , argv ){
    // APP_ENV 命令行注入权限最高，然后读取 process.env.APP_ENV
    const __CONF__ = APP_CONF.APP_ENV || constants.APP_ENV
    const __PATH__ = constants.APP_PATH
    const reslovePath = `${__PATH__}/webpack.${__CONF__}.js`
    let __PROD__ = null, __DEV__ = null
    switch (__CONF__) {
        case 'dev':
            __DEV__ = true;
            break;
        case 'prod':
            __PROD__ = true;
            break;
        default:
            break;
    }
    console.log(chalk.cyan('Building Now : ') + chalk.magenta(reslovePath))
    return require(reslovePath)({
        ROOTPATH: __dirname,
        PUBLICPATH: '',
        __PROD__,
        __DEV__,
        __CONF__
    })
}