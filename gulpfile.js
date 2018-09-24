var gulp  = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('serve', ['sass', 'mincss'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/sass/**", ['sass', 'mincss']).on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);

});

gulp.task('sass', function() {
    return gulp.src("src/sass/**")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('mincss', ['sass'], function() {
    return gulp.src("dist/css/**.css")
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());

});

gulp.task('default', ['serve']);