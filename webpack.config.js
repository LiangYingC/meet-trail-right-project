const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/public'),
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
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // 小於 8000 bytes, use url-loader 轉成 64 bits 無檔案
                        name: '[hash:7].[ext]', // for file-loader
                        outputPath: './src/assets' // for file-loader
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
    }
}