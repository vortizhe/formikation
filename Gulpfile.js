(function() {
  'use strict';

  var gulp        = require('gulp'),
      connect     = require('gulp-connect'),
      open        = require('gulp-open'),
      rename      = require('gulp-rename'),
      header      = require('gulp-header'),
      path        = require('path'),
      uglify      = require('gulp-uglify'),
      size        = require('gulp-size'),
      sourcemaps  = require('gulp-sourcemaps'),
      jshint      = require('gulp-jshint'),
      stylish     = require('jshint-stylish'),
      sass        = require('gulp-sass'),
      paths = {
        scripts: 'src/*.js',
        styles: 'src/*.scss',
        dist: 'dist/',
        demo: 'demo/',
        themes: 'src/themes/*.scss'
      },
      fk = {
        pkg: require('./package.json'),
        date: {
          year: new Date().getFullYear(),
          month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
          day: new Date().getDate()
        },
        banner: [
          '/*!',
          ' * Formikation <%= pkg.version %>',
          ' * <%= pkg.description %>',
          ' *',
          ' * <%= pkg.homepage %>',
          ' *',
          ' * Copyright <%= date.year %>, <%= pkg.author.name %>. Licensed under <%= pkg.license %>.',
          ' *',
          ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
          ' */',
          '',''].join('\n')
      };

  gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(header(fk.banner, { pkg: fk.pkg, date: fk.date }))
        .pipe(gulp.dest(paths.dist))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
  });

  gulp.task('styles', function() {
    gulp.src(paths.styles)
        .pipe(header(fk.banner, { pkg: fk.pkg, date: fk.date }))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.dist));


    gulp.src(paths.themes)
        .pipe(header(fk.banner, { pkg: fk.pkg, date: fk.date }))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.dist + 'themes/'));

  });

  gulp.task('update_gem_version', function () {
    require('fs').writeFileSync('lib/Formikation/version.rb', "module Formikation\n  VERSION = \""+fk.pkg.version+"\"\nend");
  });

  gulp.task('build', function () {
    gulp.src(paths.scripts)
        .pipe(header(fk.banner, { pkg: fk.pkg, date: fk.date }))
        .pipe(size({title: 'Formikation scripts'}))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(sourcemaps.init())
        .pipe(uglify({
          preserveComments: 'some',
          mangle: true,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true
          }
        }))
        .pipe(size({title: 'Formikation minified scripts' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist));

    gulp.src(paths.styles)
        .pipe(header(fk.banner, { pkg: fk.pkg, date: fk.date }))
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest(paths.dist));
  });

  gulp.task('watch', function () {
      gulp.watch(paths.scripts, [ 'scripts' ]);
      gulp.watch([paths.styles, paths.themes], [ 'styles' ]);
  });

  gulp.task('connect', function () {
      return connect.server({
          root: './',
          port:'3000'
      });
  });

  gulp.task('open', function () {
    return gulp.src(paths.demo + 'index.html').pipe(open({ uri: 'http://localhost:3000/' + paths.demo + 'index.html'}));
  });
  gulp.task('dist', ['styles', 'scripts', 'build', 'update_gem_version']);

  gulp.task('server', ['watch', 'connect', 'open']);

  gulp.task('default', ['server']);
})();
