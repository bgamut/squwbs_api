var path = require('path');
var webpack = require('webpack');
require('babel-register')
require('@babel/plugin-proposal-class-properties')

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
    plugins: [
        [
          "@babel/plugin-proposal-class-properties",
          {
            "loose": true
          }
        ]
      ],
    resolve: {
        alias: {
          'react-native-svg': 'react-native-svg-web-transform'
        }
      }
};