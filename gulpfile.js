var gulp = require('gulp');
var minify = require('gulp-minify');


connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server();
});


gulp.task('min-js', function() {
    return gulp.src('Product/script.js')
        .pipe(minify({
            ext: {
                min: ('.min.js')
            },
        }))
        .pipe(gulp.dest('Product'))
});

gulp.task('watch', function(){
    gulp.watch('Product/script.js', gulp.series('min-js'));
});

gulp.task('default', gulp.series('webserver', 'min-js', 'watch'));



