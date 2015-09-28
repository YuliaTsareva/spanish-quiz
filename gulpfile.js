'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  babelify = require('babelify'),
  watchify = require('watchify'),
  _ = require('underscore'),
  gutil = require('gulp-util'),
  postcss = require('gulp-postcss'),
  cssVars = require('postcss-simple-vars');


var customOpts = {
  entries: ['./js/app.js'],
  debug: true
};
var opts = _.extend({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.transform(babelify);

function bundle() {
  return b.bundle()
    .on('error', function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(source('app.min.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
}

gulp.task('js', bundle);
b.on('log', gutil.log);

gulp.task('css', function () {
  var processors = [ cssVars ];

  return gulp.src('./css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});
//todo watch css

gulp.task('server', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {

  gulp.start('server');
  b.on('update', bundle);
  gulp.watch('css/*.css', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
