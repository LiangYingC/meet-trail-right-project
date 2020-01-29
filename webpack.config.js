const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,  //根據 .js 結尾的檔案
                exclude: /(node_modules)/, // 排除 node_modules 因應已處理過
                use: { // 使用 ...
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ]
    },
    devServer: {
        contentBase: './dist',
    }
}