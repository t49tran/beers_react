gulp = require 'gulp'
sass = require 'gulp-sass'
sassGlob = require 'gulp-sass-glob'
browserify = require 'browserify'
browserSync = require 'browser-sync'
uglifycss = require 'gulp-uglifycss'
source = require 'vinyl-source-stream'
concat = require 'gulp-concat'
eslint = require 'gulp-eslint'
historyFallback = require 'connect-history-api-fallback';

gulp.task 'serve', ()->
  browserSync.init {
    server: {
      baseDir: './public',
      middleware: [
        historyFallback()
      ]
    }
    port: 3010
  }
  gulp.watch ['assets/**/*.js','assets/**/*.jsx'], ['lint', 'browserify']
  gulp.watch 'assets/styles/**/*.sass', ['sass']
  gulp.watch('public/*.html').on 'change', browserSync.reload

gulp.task 'browserify', ()->
  browserify('./assets/js/main.jsx',{extensions:['.jsx','.js']})
  .transform 'babelify', {presets:['es2015','react', 'stage-2']}
  .bundle().on("error", (err)->
    console.log err
    @.emit 'end'
  )
  .pipe source('main.js')
  .pipe(gulp.dest('./public/js/'))
  .pipe(browserSync.stream())

gulp.task 'sass', ()->
  gulp.src( './assets/styles/main.sass')
  .pipe sassGlob()
  .pipe sass({
    includePaths: require('node-bourbon').with('./node_modules','node_modules/bootstrap/scss/'),
  })
  .pipe concat('main.css')
  .pipe(gulp.dest('./public/css'))
  .pipe browserSync.stream()

gulp.task 'lint', ()->
  gulp.src((['assets/js/**/*.js']))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

gulp.task 'default', ['serve']