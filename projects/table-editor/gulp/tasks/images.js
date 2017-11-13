const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegTran = require('imagemin-jpegtran');
const imageminOptiPng = require('imagemin-optipng');
const imageminGifsicle = require('imagemin-gifsicle');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const config = require('../config');

gulp.task('images', () =>
  gulp
    .src([`${config.src.img}/**/*.{jpg,png,jpeg,gif}`, `!${config.src.img}/svgo/**/*.*`])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(changed(config.dest.img))
    .pipe(imagemin([
      imageminJpegTran({ progressitve: true }),
      imageminOptiPng({ optimizationLevel: 5 }),
      imageminGifsicle({ interlaced: true })
    ]))
    .pipe(gulp.dest(config.dest.img)));

gulp.task('images:watch', () => {
  gulp.watch([`${config.src.img}/**/*.{jpg,png,jpeg,gif}`], ['images']);
});
