var gulp = require('gulp'),
    concat = require('gulp-concat');

const cleanCss = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass');

const cssFiles = ['./src/css/style.min.css',],
      jsFiles = ['./src/js/main.min.js',],
      del = require('del'),
      browserSync = require('browser-sync').create();

function styles() {
  return gulp.src(cssFiles)

    // выход    
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src(jsFiles)

    // выход
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify({
      toplevel: true
    }))

    .pipe(browserSync.stream())
}

function clean() {
  return del([
    'dist/*'
  ])
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/index.html"
    }
  })
  gulp.watch('./src/css/**/*.css', styles)
  gulp.watch('./src/js/**/*.js', scripts)
  gulp.watch('./*.html').on('change', browserSync.reload)
}

//таски
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));

gulp.task('dev', gulp.series('build', 'watch'));