const gulp = require('gulp');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const rigger = require('gulp-rigger');
const gulpif = require('gulp-if');
const prettify = require('gulp-prettify');
const config = require('../config');

function renderHtml(onlyChanged) {
  return gulp
    .src([`${config.src.templates}/*.html`])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html)))
    .pipe(rigger())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(prettify({
      indent_size: 2,
      brace_style: 'expand',
      indent_inner_html: true,
      wrap_attributes: 'auto',
      preserve_newlines: true,
      max_preserve_newlines: 50,
      wrap_line_length: 120,
      end_with_newline: true,
      wrap_attributes_indent_size: 1,
      unformatted: ['use']
    }))
    .pipe(gulp.dest(config.dest.html));
}

gulp.task('html', () => renderHtml());

gulp.task('html:changed', () => renderHtml(true));

gulp.task('html:watch', () => {
  gulp.watch([`${config.src.templates}/**/*.html`], ['html:changed']);

  gulp.watch([`${config.src.templates}/**/*.html`], ['html']);
});
