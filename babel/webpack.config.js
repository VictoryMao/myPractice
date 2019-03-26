var path = require('path');

module.exports = {
    entry: './src/person.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'person.compiled.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    }
}