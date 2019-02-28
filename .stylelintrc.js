// @ts-nocheck
module.exports = {
    ignoreFiles: ['node_modules/**/*.scss', '**/*.md', '**/*.ts', '**/*.tsx', '**/*.js', 'dist/**/*.css'],
    extends: ['stylelint-config-css-modules', 'stylelint-config-standard'],
    plugins: ['stylelint-scss'],
    rules: {
        'indentation': 4,
        'at-rule-no-unknown': null,
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
        'property-no-unknown': [true, { ignoreProperties: ['composes'] }]
    }
}
