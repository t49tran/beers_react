/*
     ./webpack.config.js
*/

const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginConfig = new ExtractTextPlugin('styles.css');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './assets/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
    entry: './assets/js/main.jsx',
    output: {
       path: path.resolve(__dirname, './public/js/'),
       filename: 'main.js',
       publicPath: '/'
    },
    module: {
       loaders: [
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
       	  { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
          { test: /\.css$/, use: ExtractTextPlugin.extract({
             fallback: "style-loader",
             use: [
               {
                  loader: "css-loader" // translates CSS into CommonJS
               },
             ]
           })
          },
          { test: /\.sass$/, enforce: 'pre', loader: 'import-glob-loader'},
          { test: /\.sass$/,
           use: ExtractTextPlugin.extract({
             fallback: "style-loader",
             use: [
               {
                  loader: "css-loader" // translates CSS into CommonJS
               },
               {
                  loader: "sass-loader", // compiles Sass to CSS,
                  options: {
                    includePaths: ["node_modules", "node_modules/bootstrap/scss"]
                  }
               }
             ]
           })
          }
       ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
            path.resolve(__dirname, './assets/js'),
            'node_modules'
      ]
   },
   plugins: [
        ExtractTextPluginConfig,
        HtmlWebpackPluginConfig
   ],
   devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        publicPath: '/'
   }
}
