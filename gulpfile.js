
var gulp = require('gulp'),
  path = require('path'),
  mustache = require('gulp-mustache'),
  pkg = require('./package.json'),
  git = require('simple-git')(__dirname);

gulp.task('dependencies', function() {
  var david = require('gulp-david');

  return gulp.src(path.join(__dirname,'package.json'))
    .pipe(david());
});

gulp.task('lint-less', ['dependencies'], function () {
  var lesshint = require('gulp-lesshint');

  return gulp.src(path.join(__dirname, '/src/less/*.less'))
    .pipe(lesshint({
      configPath: path.join(__dirname, '.lesshintrc')
    }))
    .pipe(lesshint.reporter());
});

gulp.task('lint-js', ['lint-less'], function () {
  var jshint = require('gulp-jshint'),
    jshintrc = path.join(__dirname, '.jshintrc');

  return gulp.src(path.join(__dirname, '/src/js/*.js'))
    .pipe(jshint(jshintrc))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint-js'], function (done) {
  done();
});

gulp.task('less', ['test'], function () {

  var less = require('gulp-less'),
    rename = require('gulp-rename');

  return gulp.src(path.join(__dirname, '/src/less/base.less'))
    .pipe(less({
      paths: [ path.join(__dirname, 'src/less') ]
    }))
    .pipe(rename('octogerrit.css'))
    .pipe(mustache({
  		version: pkg.version
  	}))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('GerritSite.css'))
    .pipe(gulp.dest('./dist/theme'));
});

gulp.task('html', ['less'], function () {
  return gulp.src(path.join(__dirname, '/src/html/*.html'))
    .pipe(mustache({
  		version: pkg.version
  	}))
    .pipe(gulp.dest('./dist/theme'));
});

gulp.task('js', ['html'], function () {
  var concat = require('gulp-concat');

  return gulp.src(path.join(__dirname, '/src/js/*.js'))
    .pipe(concat('octogerrit.js'))
    .pipe(mustache({
  		version: pkg.version
  	}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['js'], function (done) {
  git
    .addTag('v' + pkg.version)
    .pushTags('origin', function () {
      done();
    });
});
