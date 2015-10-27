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
  autoprefixer = require('autoprefixer');


var customOpts = {
  entries: ['./js/app.js'],
  debug: true
};
var opts = _.extend({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

b.plugin('minifyify', {
  output: './dist/app.js.map',
  map: 'app.js.map'
});

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
  var processors = [ autoprefixer ];

  return gulp.src('./css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('server', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {

  b.on('update', bundle);

  watch('./css/*.css', function () {
    gulp.start('css');
  });

  gulp.start('server');
});

gulp.task('default', ['js', 'css', 'watch']);
