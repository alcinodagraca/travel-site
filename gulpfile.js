var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');


gulp.task('html'), function () {
  gulp.watch('./app/*.html');
}
gulp.task('sass', function() {
  return gulp.src('./app/assets/styles/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(browserSync.reload({stream: true}));
});

// Static Server + watching scss/html files
gulp.task('watch', function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch('./app/assets/styles/**/*.scss', ['sass']);
    gulp.watch('./app/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'watch']);
