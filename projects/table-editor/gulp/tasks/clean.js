const gulp = require('gulp');
const del = require('del');
const util = require('gulp-util');
const config = require('../config');

gulp.task('clean', cb => del([config.dest.root]).then((paths) => {
  util.log('Deleted:', util.colors.magenta(paths.join('\n')));
}));
