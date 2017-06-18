const gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  rename = require('gulp-rename'),
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

gulp.task('prod', () => {
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
  .pipe(rename('player' + '-' + process.env.npm_package_version + '.js'))
  .pipe(rename({ extname: ".min.js" }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
});
