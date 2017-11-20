const path = require('path');

const webpack = require('webpack'); // to access built-in plugins

const CleanPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ArchivePlugin = require('webpack-archive-plugin');
const HappyPack = require('happypack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const AutoPrefixer = require('autoprefixer');
const FormatterPretty = require('eslint-formatter-pretty');

const getDateTime = require('./scripts/getDateTime.js');

const isProduction = process.env.NODE_ENV === 'production';
const nodeEnv = isProduction ? 'production' : 'development';

const webpackConfig = {
  context: __dirname,
  entry: {
    app: ['./src/index.jsx'],
    vendor: ['./src/vendor.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'assets/js/[name].[chunkhash].js',
    chunkFilename: 'assets/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // json only temp for translations
    alias: {
      Atoms: path.resolve(__dirname, 'src/components/atoms'),
      Styles: path.resolve(__dirname, 'src/styles'),
      Components: path.resolve(__dirname, 'src/components'),
      Actions: path.resolve(__dirname, 'src/redux/actions'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Api: path.resolve(__dirname, 'src/api')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          formatter: FormatterPretty
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'happypack/loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [AutoPrefixer],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]?[hash]'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          mimetype: 'application/font-woff',
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          mimetype: 'application/octet-stream',
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'assets/images/icons/[name].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      verbose: true,
      cache: true,
      threads: 4,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }], 'react', 'stage-2'],
            env: {
              development: {
                presets: ['react-hmre']
              }
            },
            plugins: ['react-hot-loader/babel', 'transform-runtime']
          }
        }
      ]
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      syntax: 'scss'
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      disable: !isProduction, // true for dev
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'static/index.html'),
      minify: {
        collapseWhitespace: isProduction,
        removeComments: isProduction
      }
    }),
    new webpack.DefinePlugin({
      __APIBASE__: isProduction
        ? '"https://api.kangacoach.com/"'
        : '"http://localhost:3000/api/v1"',
      __SERVER__: !isProduction,
      __DEVELOPMENT__: !isProduction,
      __DEVTOOLS__: !isProduction,
      'process.env': {
        BABEL_ENV: JSON.stringify(nodeEnv),
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: !isProduction
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch:
        'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: 4000,
      openAnalyzer: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

/* Development specific configs */
if (!isProduction) {
  console.log('DEVELOPMENT MODE');

  webpackConfig.devServer = {
    host: '0.0.0.0',
    port: 9000,
    compress: false,
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    hot: true,
    historyApiFallback: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: true,
      modules: true,
      publicPath: false,
      timings: true,
      version: true,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  };

  webpackConfig.entry.debug = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server'
  ];

  webpackConfig.output.filename = '[name].js';

  webpackConfig.devtool = 'inline-source-map';

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]);
}

/* Production specific configs */
if (isProduction) {
  console.log('BUILDING PRODUCTION');

  webpackConfig.plugins = webpackConfig.plugins.concat([
    // Cleanup the builds/ folder before
    // compiling our final assets
    new CleanPlugin('build'),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: Infinity
    }),

    // This plugin minifies all the Javascript code of the final bundle
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
    }),

    new ManifestPlugin({
      fileName: 'build-manifest.json'
    }),

    new CopyWebpackPlugin(
      [{ from: { glob: '**/*', dot: true }, context: 'static' }],
      {
        ignore: ['index.html']
      }
    ),
    new ArchivePlugin({
      output: `build/build-${getDateTime()}`
    })
  ]);
}

module.exports = webpackConfig;
