const path = require('path');
const webpack = require('webpack');
const util = require('gulp-util');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const config = require('./gulp/config');
const formatterPretty = require('eslint-formatter-pretty');

function createConfig(env) {
  let isProduction;
  let webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    context: path.join(__dirname, config.src.js),
    entry: {
      app: './app.js',
      vendor: './vendor/vendor.js'
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: './assets/js/'
    },
    devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].js',
        minChunks: Infinity
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require('eslint-formatter-pretty')
          }
        }
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false
      })
    ],
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          loader: 'eslint-loader',
          options: {
            cache: true,
            ignorePattern: `${__dirname}/src/js/lib/`,
            formatter: formatterPretty
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [path.resolve(__dirname, 'node_modules')],
          options: {
            presets: ['es2015', 'stage-2'],
            plugins: ['transform-runtime']
          }
        }
      ]
    }
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          collapse_vars: true,
          comparisons: true,
          conditionals: true,
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          screw_ie8: true,
          sequences: true,
          unused: true,
          warnings: false // Suppress uglification warnings
        }
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
