const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');


gulp.task('contracts:compile', shell.task('node_modules/.bin/truffle compile'));
gulp.task('contracts:migrate', shell.task('node_modules/.bin/truffle migrate'));

gulp.task('webpack',  ['theme', 'contracts:compile'], shell.task('./node_modules/.bin/webpack --config webpack.dist.config.js'));

gulp.task('theme', function () {
    return gulp.src(['app/**/*.*', '!app/src/*.*'])
        .pipe(gulp.dest('build/'));
});

gulp.task('build', ['theme', 'contracts:compile', 'webpack']);

gulp.task('clean', function() {
    del(['build']);
});

gulp.task('watch', function () {
    gulp.watch(['app/**/*.*', '!app/src/*.*'], ['theme']);
    gulp.watch(['contracts/**/*.sol'], ['contracts:compile']);
});

gulp.task('dev', ['watch'], shell.task('./node_modules/.bin/webpack-dev-server --content-base build/ --hot --watch-content-base --config webpack.config.js'));

gulp.task('default', ['build', 'contracts:compile', 'webpack']);
