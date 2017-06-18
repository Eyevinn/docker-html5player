const gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  rename = require('gulp-rename'),
  buffer = require('gulp-buffer'),
  uglifycss = require('gulp-uglifycss')
  fs = require('fs');

const libs = ['./js/lib/shaka-player.compiled.js'];

gulp.task('build', () => {
  const b = browserify({
    entries: [ 'js/index.js' ],
    noParse: libs,
    debug: true,
  })
  .transform(babelify, {
    presets: [ 'es2015' ],
    ignore: /\js\/lib\//
  })
  .bundle()
  .pipe(source('player.js'))
  .pipe(gulp.dest('public/js/'))
});

gulp.task('stylesheets', () => {
  return gulp.src('public/stylesheets/player.css')
    .pipe(uglifycss())
    .pipe(rename('eyevinnplayer.css'))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest('dist/stylesheets'))
});

gulp.task('prod', ['stylesheets'], () => {
  const b = browserify({
    entries: [ 'js/index.js' ],
    noParse: libs,
    debug: true,
  })
  .transform(babelify, {
    presets: [ 'es2015' ],
    ignore: /\js\/lib\//
  })
  .bundle()
  .pipe(source('player.js'))
  .pipe(buffer())
  .pipe(rename('eyevinnplayer.js'))
  .pipe(rename({ extname: ".min.js" }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
});
