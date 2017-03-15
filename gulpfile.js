var gulp = require('gulp');
var clean = require('gulp-clean');
var console = require('tracer').colorConsole({
    inspectOpt: {
        showHidden : true, //the object's non-enumerable properties will be shown too
        depth : null //tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.
    }
});

var spawn = require('child_process').spawn, node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('sol', function() {
    if (node) node.kill();
    node = spawn('truffle', ['compile'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            console.error('Error detected, waiting for changes...');
        }
    });

});

gulp.task('app', function () {
    return gulp.src(['app/**/*.*'])
        .pipe(gulp.dest('build/'));
});

gulp.task('javascript', function () {
    return gulp.src(['node_module/**/*.*'])
        .pipe(gulp.dest('build/'));
});


gulp.task('clean', function () {
    return gulp.src(['build'], {read: false})
        .pipe(clean());
});

gulp.task('watch', ['app', 'sol'], function () {
    gulp.watch(['./app/**/*.js','./app/**/*.html','./app/**/*.css','./contracts/**/*.sol']);
});

gulp.task('default', ['app', 'sol']);

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});
