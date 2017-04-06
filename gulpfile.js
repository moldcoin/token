const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');

gulp.task('testrpc', shell.task('node_modules/.bin/testrpc --account="0xfeb72ffb6bb482e3d4b5f0168f24ece904e8ddb7d3076362b94a209078666de6,5000000000000000000000000" --account="0xdd1f69c790ec35a5e70b6511b2c7128a23109617372bcc3102d0caef47ffdf0e,0"'));

gulp.task('test', shell.task('node_modules/.bin/truffle test'));

gulp.task('contracts:compile', shell.task('node_modules/.bin/truffle compile'));
gulp.task('contracts:migrate:development', shell.task('node_modules/.bin/truffle migrate --network development'));
gulp.task('contracts:migrate:testnet', shell.task('node_modules/.bin/truffle migrate --network testnet'));
// gulp.task('contracts:migrate:live', shell.task('node_modules/.bin/truffle migrate --network live'));
gulp.task('contracts:migrate:reset', shell.task('node_modules/.bin/truffle migrate --reset'));

gulp.task('webpack',  ['theme', 'contracts:compile'], shell.task('./node_modules/.bin/webpack --config webpack.dist.config.js'));

gulp.task('theme', function () {
    return gulp.src(['app/**/*.*', '!app/src/*.*'])
        .pipe(gulp.dest('build/'));
});

gulp.task('build', ['theme', 'contracts:compile', 'webpack']);

gulp.task('clean', function() {
    del(['build']);
});

gulp.task('watch', ['theme', 'contracts:compile'], function () {
    gulp.watch(['app/**/*.*', '!app/src/*.*'], ['theme']);
    gulp.watch(['contracts/**/*.sol'], ['contracts:compile']);
});

gulp.task('dev', ['watch'], shell.task('./node_modules/.bin/webpack-dev-server --content-base build/ --hot --watch-content-base --config webpack.config.js'));

gulp.task('default', ['build', 'contracts:compile', 'webpack']);
