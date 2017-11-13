const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csso = require('postcss-csso');
const lost = require('lost');
const nano = require('gulp-cssnano');
const cleancss = require('gulp-cleancss');
const rename = require('gulp-rename');
const sassGlob = require('gulp-sass-glob');
const cssGlobbing = require('gulp-css-globbing');
const stylelint = require('gulp-stylelint');
const config = require('../config');

const processors = [
  autoprefixer({
    browsers: ['> 1%', 'last 4 versions'],
    cascade: true
  }),
  require('lost'),
  mqpacker({
    sort: sortMediaQueries
  }),
  csso
];

gulp.task('sass', () =>
  gulp
    .src(`${config.src.sass}/main.{sass,scss}`)
    .pipe(sourcemaps.init())
    .pipe(cssGlobbing())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: config.production ? 'compact' : 'expanded',
      precision: 5
    }))
    .on('error', config.errorHandler)
    .pipe(postcss(processors))
    .pipe(cleancss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css)));

gulp.task('sass:lint', () =>
  gulp.src(`${config.src.sass}/**/*.{sass,scss}`).pipe(stylelint({
    failAfterError: false,
    reporters: [{ formatter: 'verbose', console: true }],
    debug: true
  })));

gulp.task('sass:watch', () => {
  gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, ['sass', 'sass:lint']);
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}
