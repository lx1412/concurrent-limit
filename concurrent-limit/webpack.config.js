const path = require('path');

module.exports = (env) => {

    return {
        mode: 'production',
        entry: './index.js',
        resolve: {
            extensions: ['.js'],
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "presets": ["env","stage-2"],
                        // "plugins": [
                        //     [
                        //         {
                        //             "polyfill": false,
                        //             "regenerator": true
                        //         }
                        //     ]
                        // ]
                    }
                }]
            },
            ]
        },
        output: {
            filename: 'concurrent-limit.min.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: "",
            library:"ConcurrentLimit",
            libraryTarget:"umd",
        },
    };
}

