var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    livereload   = require('gulp-livereload');

var onError = function (err) {
  gutil.beep();
  gutil.log(gutil.colors.red(err.message));
  this.emit( "end" );
};

// JS
gulp.task('uglifyjs', function() {
  return gulp.src('./src/formikation.js')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(rename({prefix: 'jquery.'}))
  .pipe(gulp.dest('./dist/'))
  .pipe(uglify({ preserveComments: 'some' }))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

// Sass
gulp.task('sass', function() {
  return gulp.src('./src/formikation.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  return gulp.src('./test/index.html')
  .pipe(livereload());
});

// Default watcher
gulp.task('default', function() {
  // LiveReload
  livereload.listen();

  // Watch JS
  gulp.watch('./src/formikation.js', ['uglifyjs']);

  // Watch Sass
  gulp.watch('./src/formikation.scss', ['sass']);

  // Watch HTML and livereload
  gulp.watch('./demo/index.html', ['html']);

  // Watch Gulpconfig
  gulp.watch('./Gulpfile.js', ['uglifyjs', 'sass', 'html']);
});

// Manually build all
gulp.task('build', function() {
  gulp.start('uglifyjs', 'sass');
});
