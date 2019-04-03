const path = require('path')
const fs = require('fs')
const conf = {
    "ROOT": __dirname,
    "templatepath": "tool",
    "componentPlacementPath": "src"
}

const walkFolder = function walkFolder(modelPath) {
    const newList = []
    fs.readdirSync(modelPath)
        .forEach(file => {
            const filePath = path.join(modelPath, '/' + file)
            const stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
                newList.push(filePath)
                walkFolder(filePath)
            }
        })
    return newList
}

const walkFile = function walkFile(modelPath) {
    const newList = []
    fs.readdirSync(modelPath)
        .forEach(file => {
            const filePath = path.join(modelPath, '/' + file)
            const stat = fs.statSync(filePath)
            if (stat.isFile()) {
                if (/(.*)\.txt/.test(file)) {
                    newList.push(filePath)
                }
            }
        })
    return newList
}

const replacePath = function replacePath(paths, placementPath, f) {
    return paths.map(i => i.replace(path.join(conf.ROOT, (placementPath && f) ? placementPath : '', '/'), ''))
}

function plop (plop) {

    const n1 = replacePath(walkFolder(path.resolve(conf.ROOT, conf.templatepath)), conf.templatepath, true),
        n2 = replacePath(walkFolder(path.resolve(conf.ROOT, conf.componentPlacementPath)));

    plop.setGenerator('add', {
        prompts: [{
                type: 'input',
                name: 'componentName',
                message: 'please input the ComponentName name',
                default: 'index'
            },
            {
                type: 'input',
                name: 'filesName',
                message: 'please input the FilesName name',
                default: 'index'
            },
            {
                type: 'list',
                name: 'list',
                message: 'please choose your template name',
                choices: n1
            }, {
                type: 'list',
                name: 'files',
                message: 'please choose your placement components name',
                choices: n2
            }
        ],
        actions: function (data) {
            const actions = replacePath(walkFile(path.resolve(conf.ROOT, conf.templatepath, data.list)), path.join(conf.templatepath, data.list), true)
            return actions.map(i => ({
                type: 'add',
                path: path.join(data.files, '{{pascalCase filesName}}', `{{lowerCase componentName}}.${i.match(/\.(\S*)\./)[1]}`),
                templateFile: path.join(conf.templatepath, data.list, i)
            }))
        }
    });

    plop.setPartial('myTitlePartial', '{{pascalCase filesName}}');

    plop.setPartial('myScssPartial', '{{lowerCase componentName}}');

};

module.exports = plop
