'use strict';

const gulp = require('gulp');
const concatcss = require('gulp-concat-css');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('styles', function() {

	return gulp.src('src/**/*.css')
		.pipe(concatcss('main.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {

	return gulp.src('src/**/*.js')
		.pipe(concat('main.js'))
		.pipe(minify())
		.pipe(gulp.dest('build/js'))
});

gulp.task('clean', function() {
	return del('build')
});

gulp.task('build', ['clean', 'styles', 'scripts']);