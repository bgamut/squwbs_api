var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            // {
            //     test: /\.js$/,
            //     loader: "transform?brfs"
            // }

        ]
    },
    resolve: {
        alias: {
          'react-native-svg': 'react-native-svg-web-transform'
        }
      }
};