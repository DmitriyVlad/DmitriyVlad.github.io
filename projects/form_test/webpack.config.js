const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client', 
    path.join(__dirname, '/client/index')
  ],
  output: {
    path: path.join(__dirname, '/public/assets/'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ["react-hot-loader", "babel-loader"] ,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loader", "autoprefixer-loader"]
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
        test: /\.gif$/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=26000&mimetype=image/svg+xml"
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/, 
        loaders: ["react-hot-loader", "babel-loader"],
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};