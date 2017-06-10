const gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
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
  .pipe(fs.createWriteStream('public/js/player.js'));
});

