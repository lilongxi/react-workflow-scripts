const { rm, exec } = require('shelljs')

rm('-rf', 'dist')
exec("cross-env APP_ENV=prod webpack --config build/webpack.config.js")
