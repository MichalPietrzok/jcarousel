const gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  del = require('del'),
  browserSync = require('browser-sync'),
  cache = require('gulp-cache');

//scripts-----------------------
gulp.task('js', () => {
  gulp.src([
    './src/scripts/ie-polyfils.js',
    './src/scripts/jInitialization.js',
    './src/scripts/jStyles.js',
    './src/scripts/jNavigation.js',
    './src/scripts/jActivate.js',
  ]
  )
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./src/js'))
});

//local_server-----------------
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});
//-----------------local_server




//delete cache and dist folder
gulp.task('clear', () => {
  return cache.clearAll();
})
gulp.task('clean', () => {
  return del('./dist');
})


//deploy task
gulp.task('build', ['clean', 'css', 'js'], () => {
  gulp.src(['./src/js/*.js']).pipe(gulp.dest('./dist/js'));
})

gulp.task('watch', ['clean', 'browser-sync', 'js'], () => {
  gulp.watch('src/scripts/**/*.js', ['js', browserSync.reload]);
});

gulp.task('default', ['watch']);