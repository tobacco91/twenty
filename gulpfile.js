var gulp = require('gulp');
var babel = require('gulp-babel');
gulp.task('watch',  function() {
  return gulp.src('src/**/*')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-class-properties']
    }))
    .pipe(gulp.dest('lib'))
})