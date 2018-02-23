'use strict';

var gulp         = require('gulp');
var shell        = require('gulp-shell');
var util         = require('gulp-util');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');
var cp           = require('child_process');
//var scsslint     = require('gulp-scss-lint');


var browserSync  = require('browser-sync').create();

var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

gulp.task('style', () => {
  return gulp.src('_scss/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ["last 50 versions", "ie >= 9"],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    // .pipe(browserSync.stream());
});

// gulp.task('sprites', function () {
//     return gulp.src('assets/svg/*.svg')
//         .pipe(svgSprite({mode: "symbols"}))
//         .pipe(gulp.dest("dist"));
// });

gulp.task('script-lib', () => {
  return gulp.src('_js/lib/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('script-kakudo', () => {
  return gulp.src('_js/kakudo/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('kakudo.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('script-site', () => {
  return gulp.src('_js/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint());
});

gulp.task('build', shell.task(['bundle exec jekyll build --config _config.yml,_config_dev.yml']));


gulp.task('reload', ['build'], () => {
    browserSync.reload();
});

gulp.task('script', ['script-lib', 'script-kakudo', 'script-site'], () => {});

gulp.task('serve', ['style', 'script', 'build'], () => {
  browserSync.init({
      server: {baseDir: '_site/'}
  });
});

gulp.task('watch', () => {
  gulp.watch('_scss/**/*.scss', ['style']);
  gulp.watch('_js/**/*.js', ['script']);
  gulp.watch(['*.html', '_data/*', '_includes/**/*', '_js/**/*', '_layouts/*', '_scss/**/*', 'assets/**/*', 'lyrics/**/*', 'global/**/*'], ['reload']);
});

gulp.task('default', ['serve', 'watch'], () => {});
