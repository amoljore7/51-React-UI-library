const gulp = require('gulp');

gulp.task('copy:assets', (src, dest) =>
  gulp.src(['src/assets/**']).pipe(gulp.dest('core/assets'))
);
