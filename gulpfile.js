// Packages.
var gulp = require( 'gulp' );
var scss = require( 'gulp-sass' );
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require( 'gulp-uglify' );
var concat = require( 'gulp-concat' );
var pump = require('pump');
var rename = require( 'gulp-rename' );
var sort = require( 'gulp-sort' );
var wpPot = require( 'gulp-wp-pot' );
var zip = require( 'gulp-zip' );

// Paths.
var PATHS = {
	js: './assets/js/',
	scss: './assets/scss/',
	build: {
		js: './dist/js/',
		css: './dist/css/'
	}
}

var taskLoader = [ 'scripts', 'scripts-bundle', 'scss', 'watch' ];

// Build individual scripts.
gulp.task( 'scripts', function(cb) {

	pump([
		gulp.src( PATHS.js + '/*.js' ),
		sourcemaps.init(),
		sourcemaps.write('.'),
		gulp.dest( PATHS.build.js ),
		uglify(),
		rename({ extname: '.min.js' }),
		sourcemaps.write('.'),
		gulp.dest( PATHS.build.js )
	], cb)

});

// Bundle scripts together.
gulp.task( 'scripts-bundle', function(cb) {

	pump([
		gulp.src( PATHS.js + '/bundle/*.js' ),
		sourcemaps.init(),
		concat( 'bundle.js' ),
		gulp.dest( PATHS.build.js ),
		uglify(),
		rename({ extname: '.min.js' }),
		sourcemaps.write('.'),
		gulp.dest( PATHS.build.js )
	], cb);

});

// Build styles (write to the theme root).
gulp.task( 'scss', function(cb) {

	pump([
		gulp.src( PATHS.scss + 'style.scss' ),
		scss({
			sourcemap: true,
			includePaths: [
				'./node_modules/**'
			]
		}).on('error', scss.logError),
		sourcemaps.init(),
		cssnano({
			autoprefixer: {
				add: true
			}
		}),
		sourcemaps.write('.', {
			includeContent: false,
			sourceRoot: PATHS.scss
		}),
		gulp.dest('./')
	], cb)

});

// File watcher.
gulp.task( 'watch', function() {

	gulp.watch( PATHS.js + '/*.js', ['scripts'] );
	gulp.watch( PATHS.js + '/bundle/*.js', ['scripts-bundle'] );
	gulp.watch( PATHS.scss + '**/*.scss', ['scss'] );

});

//* ZIP theme
gulp.task( 'package-theme', function() {

	gulp.src( [ './**/*', '!./node_modules/', '!./node_modules/**', '!./gulpfile.js', '!./package.json', '!./lib/src/vendor' ] )
		.pipe( zip( __dirname.split("/").pop() + '.zip' ) )
		.pipe( gulp.dest( '../' ) );

});

//* Translate theme
gulp.task( 'translate-theme', function() {

	gulp.src( [ './**/*.php' ] )
		.pipe( sort() )
		.pipe( wpPot({
			domain: "genesis-starter",
			headers: false
		}))
		.pipe( gulp.dest( './translation/' ));

});

//* Load tasks
gulp.task( 'default', taskLoader );
