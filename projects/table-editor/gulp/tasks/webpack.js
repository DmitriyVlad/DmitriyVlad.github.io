const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const config = require('../config');
const webpackConfig = require('../../webpack.config').createConfig;
const server = require('./server');

function handler(err, stats, cb) {
  const { errors } = stats.compilation;

  if (err) throw new gutil.PluginError('webpack', err);

  if (errors.length > 0) {
    notify
      .onError({
        title: 'Webpack Error',
        message: '<%= error.message %>',
        sound: 'Submarine'
      })
      .call(null, errors[0]);
  }

  gutil.log(
    '[webpack]',
    stats.toString({
      colors: true,
      chunks: false
    })
  );

  server.reload();
  if (typeof cb === 'function') cb();
}

gulp.task('webpack', (cb) => {
  webpack(webpackConfig(config.env)).run((err, stats) => {
    handler(err, stats, cb);
  });
});

gulp.task('webpack:watch', () => {
  webpack(webpackConfig(config.env)).watch(
    {
      aggregateTimeout: 100,
      poll: false
    },
    handler
  );
});
