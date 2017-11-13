const gulp = require('gulp');
const config = require('../config');

gulp.task('watch', [
  'copy:watch',
  'images:watch',
  'sprite:svg:watch',
  'svgo:watch',
  'html:watch',
  'webpack:watch',
  'sass:watch',
  'scripts:watch',
  'scripts-static:watch'
]);
