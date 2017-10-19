/**
 *
 * Gulp task recipe to produce production ready files for a WordPress theme
 * @author Calvin Koepke
 * @version 1.0
 * @link https://twitter.com/cjkoepke
 *
 */

'use strict';

//* Store paths
var PATHS = {
	js: './assets/js/',
	scss: './assets/scss/',
	build: {
		js: './build/js/',
		css: './build/css/'
	}
}

//* Load and define dependencies
var gulp = require( 'gulp' );
var scss = require( 'gulp-ruby-sass' );
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require( 'gulp-uglify' );
var pump = require('pump');
var rename = require( 'gulp-rename' );
var sort = require( 'gulp-sort' );
var wpPot = require( 'gulp-wp-pot' );
var zip = require( 'gulp-zip' );

var taskLoader = [ 'scripts', 'scss', 'watch' ];

//* Gulp task to combine JS files, minify, and output to bundle.min.js
gulp.task( 'scripts', function(cb) {

	pump([
		gulp.src( PATHS.js + '**/*.js' ),
		sourcemaps.init(),
		uglify(),
		rename({ extname: '.min.js' }),
		sourcemaps.write('maps'),
		gulp.dest( PATHS.build.js )
	], cb);

});

//* Gulp task to compile, minify, and output stylesheet in place of old uncompressed version
gulp.task( 'scss', function() {

	scss( PATHS.scss + 'style.scss', {sourcemap: true} )
		.on('error', scss.logError)
		.pipe(sourcemaps.init())
		.pipe(cssnano({
			autoprefixer: {
				add: true
			},
		}))
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: './assets/scss'
		}))
		.pipe( gulp.dest( './' ) );

});

//* Watch files
gulp.task( 'watch', function() {

	gulp.watch( PATHS.js + '**/*.js', ['scripts'] );
	gulp.watch( PATHS.scss + '**/*.scss', ['scss'] );

});

//* ZIP theme
gulp.task( 'package-theme', function() {

	gulp.src( [ './**/*', '!./node_modules/', '!./node_modules/**', '!./gulpfile.js', '!./package.json' ] )
		.pipe( zip( __dirname.split("/").pop() + '.zip' ) )
		.pipe( gulp.dest( '../' ) );

});

//* Translate theme
gulp.task( 'translate-theme', function() {

	gulp.src( [ './**/*.php' ] )
		.pipe( sort() )
		.pipe( wpPot({
			domain: "startertheme",
			headers: false
		}))
		.pipe( gulp.dest( './translation/' ));

});

//* Load tasks
gulp.task( 'default', taskLoader );
