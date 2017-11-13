const gulp = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const config = require('../config');

gulp.task('scripts', cb =>
  gulp
    .src(`${config.src.js}/libs/*.js`)
    .pipe(
      plumber({
        errorHandler: config.errorHandler
      })
    )
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${config.dest.js}/libs/`))
);

gulp.task('scripts:watch', () =>
  gulp.watch(`${config.src.js}/libs/*.js`, ['scripts'])
);
