
// 执行测试覆盖率脚本文件
const { rm, cp, mkdir, exec, echo } = require('shelljs')
const chalk = require('chalk')
const { version, config } = require('../package.json')

console.info(chalk.green('run lint:* for parallel'))
exec('npm run lint')

console.log(chalk.green('run testing and collect new coverage...'));
exec('npm run test -s');

console.log(chalk.green('archive coverage report by version...'));
mkdir('-p', `coverage_archive/${version}`);
cp('-r', 'coverage/*',  `coverage_archive/${version}`);

console.info(chalk.green("removing old coverage reports..."))
rm('-rf', 'coverage')

console.log(chalk.green('open coverage report for preview...'));
exec(`anywhere -p ${ config.port ? config.port : 8080} -d coverage_archive/${version}/lcov-report/`);
