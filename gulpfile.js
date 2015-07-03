'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	babelify = require('babelify'),
	watchify = require('watchify'),
	_ = require('underscore'),
	gutil = require('gulp-util');


var customOpts = {
	entries: ['./js/app.js'],
	debug: true
};
var opts = _.extend({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.transform(babelify);

function bundle() {
	return b.bundle()
		.pipe(source('app.min.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload());
}

gulp.task('js', bundle);
b.on('log', gutil.log);

gulp.task('server', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('watch', function() {

	gulp.start('server');
	b.on('update', bundle);
});

gulp.task('default', ['js', 'watch']);