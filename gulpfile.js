'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	reactify = require('reactify');

gulp.task('browserify', function() {
	return browserify('./js/app.js', {debug: true})
		.transform(reactify)
		.bundle()
		.pipe(source('app.min.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload());
});

gulp.task('server', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('watch', function() {

	gulp.start('server');

	gulp.watch(['./js/**/*.js'], ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);