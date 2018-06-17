//Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
//var del = require('del');


// createSprite Task configuration
var config = {
  spacing :{
    padding: 10
  },
  mode: {
      sprite: 'sprite.svg',
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

//Begin Sprites Tasks
gulp.task('BeginClean', function () {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
})

/*
  Estas Tasks serão responsáveis por criar, copiar o ficheiro.svg para a pasta de default
  de images.

  Antes de começar todo este processo, ao criar/modificar os sprites existentes, começaremos pela Task "BeginClean"
  que será Responsável por apagar todos os ficheiros antigos e terminaremos com a Task "EndClean" que será
  Responsável por apagar ficheiros desnecessários
*/

//Responsável por criar o sprite.
gulp.task('createSprite',['createSprite'], function(){
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
});

//Responsável por copiar o ficheiro.svg do seu local padrão para a pasta images padrão
gulp.task('copySpriteGraphic', ['createSprite'], function () {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'))
});

//Responsável por copiar o ficheiro.scss do seu directório padrão para a pasta styles/modules
gulp.task('copySpriteCSS', function () {
  return gulp.src('./app/temp/sprite/css/sprite.scss')
    .pipe(rename('_sprite.scss'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

//Responsável por limpar ficheiros desnecessários
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
  return del('./app/temp/sprite');
});

// Static Server + watching scss/html files
gulp.task('watch', function() {
    browserSync.init({
        server: "./app"
    });

    gulp.watch('./app/assets/styles/**/*.scss', ['sass']);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});

gulp.task('icons', ['BeginClean','createSprite', 'copySpriteGraphic', 'copySpriteCSS'])
gulp.task('default', ['sass', 'watch']);
