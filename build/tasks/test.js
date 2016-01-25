var 
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	path = require('path'),
	taico = require('./../../../taico');

//var tests_dir = path.join(__dirname, '/../../tests');
var tests_path = path.join(__dirname, '/../../tests/*.js');


gulp.task('test', function (done) {
	taico.tests(tests_path).run(done, { watch: true});
});

// gulp.task('test-watch', function(done) {
// 	var runner = taico.tests(tests_dir).run();
// 	watch(source_path, () => runner.run());
// 	watch(tests_path, () => runner.run());
// });

