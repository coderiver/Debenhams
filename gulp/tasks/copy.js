var gulp = require('gulp');
var config = require('../config');

// copy static files
gulp.task('copy', function() {
   gulp.src(config.src.img+'*.*')
   .pipe(gulp.dest(config.dest.img));
   gulp.src(config.src.root+'fonts/*.*')
   .pipe(gulp.dest(config.dest.css+'fonts/'));
   gulp.src(config.src.root+'video/*.*')
   .pipe(gulp.dest(config.dest.root+'video/'));
   gulp.src(config.src.root+'img/logo/*.*')
   .pipe(gulp.dest(config.dest.root+'img/logo/'));
   gulp.src(config.src.root+'img/photo/*.*')
   .pipe(gulp.dest(config.dest.root+'img/photo/'));
});

gulp.task('copy:watch', function() {
    gulp.watch(config.src.img+'*', ['copy']);
    gulp.watch(config.src.root+'fonts/*', ['copy']);
});

