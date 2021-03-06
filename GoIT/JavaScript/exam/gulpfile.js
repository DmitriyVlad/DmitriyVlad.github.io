'use strict';

var gulp = require('gulp'),
		watch = require('gulp-watch'),
		prefixer = require('gulp-autoprefixer'),
		uglify = require('gulp-uglify'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		rigger = require('gulp-rigger'),
		cssmin = require('gulp-clean-css'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		rimraf = require('rimraf'),
	  browserSync = require('browser-sync'),
	  gutil = require('gulp-util'),
	  reload = browserSync.reload;
	  

var path = {
	public: {
		html: 'public/',
		js: 'public/js/',
		css: 'public/css/',
		img: 'public/img/',
		fonts: 'public/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		cssPie: 'bower_components/css3pie/PIE.htc',
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './public'
};

var config = {
	server: {
		baseDir: './public'
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: 'My_project'
};

gulp.task('html:build', function() {
	gulp.src(path.src.html)
			.pipe(rigger())
			.pipe(gulp.dest(path.public.html))
			.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js) 
      .pipe(rigger()) 
      .pipe(sourcemaps.init()) 
      .pipe(uglify().on('error', gutil.log)) 
      .pipe(sourcemaps.write()) 
      .pipe(gulp.dest(path.public.js)) 
      .pipe(reload({stream: true})); 
});

gulp.task('cssPie:build', function () {
    gulp.src(path.src.cssPie) 
        .pipe(gulp.dest(path.public.css)) 
        .pipe(reload({stream: true})); 
});

gulp.task('style:build', function () {
  gulp.src(path.src.style) 
	    .pipe(sourcemaps.init())
	    .pipe(sass()) 
	    .pipe(prefixer())
	    .pipe(cssmin()) 
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(path.public.css)) 
	    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) 
      .pipe(imagemin({ 
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()],
          interlaced: true
      }))
      .pipe(gulp.dest(path.public.img)) 
      .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.public.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'cssPie:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
      gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
      gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
      gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
      gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
      gulp.start('fonts:build');
  });
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
   rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);

