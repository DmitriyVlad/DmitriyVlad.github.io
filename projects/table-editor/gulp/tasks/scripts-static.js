const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglifyjs');
const config = require('../config');

gulp.task('scripts-static', cb =>
  gulp
    .src(`${config.src.js}/libs-static/*.js`)
    .pipe(
      plumber({
        errorHandler: config.errorHandler
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(`${config.dest.js}/libs/`))
);

gulp.task('scripts-static:watch', () =>
  gulp.watch(`${config.src.js}/libs-static/*.js`, ['scripts-static'])
);
