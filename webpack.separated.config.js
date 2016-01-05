'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {

  // config
  context: __dirname + '/frontend',
  entry: {
    application: './application.js',
  },
  output: {
    path:       __dirname + '/public',
    publicPath: '/',
    filename:   '[name].js',
  },

  // resolve settings
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js'],
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js'],
  },

  // plugins
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],

  // loaders
  module: {
    loaders: [
      {
        test:    /\.js$/,
        include: __dirname + '/frontend',
        loader:  'ng-annotate!babel?presets[]=es2015',
      }, {
        test:   /\.sass$/,
        loader: 'style!css!sass?indentedSyntax&sourceMap',
      }, {
        test:   /\.jade$/,
        loader: 'raw!jade-html',
      }, {
        test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]?[hash]',
      },
    ],
  },

  // devtools
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: __dirname + '/public',
  },
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:     false,
        drop_console: true,
        unsafe:       true,
      },
    })
  );
}

