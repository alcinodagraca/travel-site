var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('html', function() {
  gulp.watch('../app/*.html');
});

gulp.task('styles', function() {

});

// Static Server + watching scss/html files
gulp.task('watch', function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch('./app/assets/styles/**/*.css', ['styles']);
    gulp.watch('./app/index.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
