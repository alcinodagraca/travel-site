//Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');


// createSprite Task configuration
var config = {
  spacing :{
    padding: 10
  },
  mode: {
      render: {
        scss: true // Activate Sass output (with default options)
      }
    }
};


//Sass + browserSync Tasks
gulp.task('sass', function() {
  return gulp.src('./app/assets/styles/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('createSprite', function(){
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
});


gulp.task('copySpriteCSS', function () {
  return gulp.src('./app/temp/sprite/css/sprite.scss')
    .pipe(rename('_sprite.scss'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});


// Static Server + watching scss/html files
gulp.task('watch', function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch('./app/assets/styles/**/*.scss', ['sass']);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'watch']);
