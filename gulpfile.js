var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var jade = require('gulp-jade');
// var sass = require('gulp-sass');
// var plumber = require('gulp-plumber');
// var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');

gulp.task('clean', function () {
    return gulp.src(['./tmp','./public'], {read: false})
        .pipe($.clean());
});

gulp.task('imagemin', () =>
    gulp.src('./source/**/*.{png,jpg,gif}')
        .pipe($.imagemin())
        .pipe(gulp.dest('./public/'))
);

gulp.task('jade', function() {
//   var YOUR_LOCALS = {};
  gulp.src('./source/**/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
    //   locals: YOUR_LOCALS
    pretty: true
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
    ];
  return gulp.src('./source/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('babel', () => {
    return gulp.src('./source/js/**/*.js')
        // .pipe(sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        // .pipe(concat('all.js'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('watch', function () {
  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch('./source/**/*.jade', ['jade']);
  gulp.watch('./source/images/**/*.{png,jpg,gif}', ['imagemin']);
  gulp.watch('./source/js/**/*.js', ['babel']);
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

gulp.task('build', gulpSequence('clean','imagemin','jade','sass','babel'));//發布流程順序

gulp.task('default',['imagemin','jade','sass','babel','browser-sync','watch']);

