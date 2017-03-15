module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public/assets/',
    publicPath: 'assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ["react-hot-loader", "babel-loader"] 
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
        loaders: ["react-hot-loader", "babel-loader"]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};