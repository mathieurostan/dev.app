var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('asset/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('asset/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('asset/sass/**/*.scss', ['sass']);
});

gulp.task('default', [ 'sass', 'sass:watch' ]);
