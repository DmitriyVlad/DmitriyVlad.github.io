var gulp = require('gulp'),
		babel = require('gulp-babel'),
		watch = require('gulp-watch');

var path = {
		build: {
				html: 'build/',
				js: 'build/js/',
				css: 'build/css/'
		},
		src: { 
				html: 'src/*.html', 
				js: 'src/js/tmpl.js',
				style: 'src/css/main.css'
		},
		watch: {
				html: 'src/**/*.html',
				js: 'src/js/**/*.js',
				style: 'src/css/**/*.css'
		},
		clean: './build'
};  

gulp.task('html:build', function () {
		gulp.src(path.src.html) 
				.pipe(gulp.dest(path.build.html));
});

gulp.task('babel', function() {
    gulp.src('src/js/main.js')
        .pipe(babel({
        	presets: ['es2015']
        }))
        .pipe(gulp.dest('build/js'))
});

gulp.task('js:build', function () {
		gulp.src(path.src.js)
				.pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
		gulp.src(path.src.style)
				.pipe(gulp.dest(path.build.css));
});

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
});

gulp.task('build', [
		'html:build',
		'js:build',
		'style:build',
		'babel'
]);

gulp.task('default', ['build', 'watch']);