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
const gulp = require( 'gulp' );
const scss = require( 'gulp-sass' );
const cssnano = require( 'gulp-cssnano' );
const sourcemaps = require( 'gulp-sourcemaps' );
const uglify = require( 'gulp-uglify' );
const pump = require( 'pump' );
const rename = require( 'gulp-rename' );
const sort = require( 'gulp-sort' );
const wpPot = require( 'gulp-wp-pot' );
const zip = require( 'gulp-zip' );

//* Gulp task to combine JS files, minify, and output to bundle.min.js
function scripts(cb) {

	return pump([
		gulp.src( PATHS.js + '**/*.js' ),
		sourcemaps.init(),
		uglify(),
		rename({ extname: '.min.js' }),
		sourcemaps.write('maps'),
		gulp.dest( PATHS.build.js )
	], cb);

}

//* Gulp task to compile, minify, and output stylesheet in place of old uncompressed version
function styles(cb) {

	return pump([
		gulp.src( PATHS.scss + 'style.scss' ),
		sourcemaps.init(),
		scss({
			outputStyle: 'compressed',
		}).on('error', scss.logError),
		cssnano({
			autoprefixer: {
				add: true
			},
		}),
		sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: './assets/scss'
		}),
		gulp.dest( './' )
	], cb)

}

//* Watch files
function watch() {

	gulp.watch( PATHS.js + '**/*.js', { ignoreInitial: false }, scripts );
	gulp.watch( PATHS.scss + '**/*.scss', { ignoreInitial: false }, styles );

}

//* ZIP theme
function package_theme() {

	gulp.src( [ './**/*', '!./node_modules/', '!./node_modules/**', '!./gulpfile.js', '!./package.json' ] )
		.pipe( zip( __dirname.split("/").pop() + '.zip' ) )
		.pipe( gulp.dest( '../' ) );

}

//* Translate theme
function translate_theme() {

	gulp.src( [ './**/*.php' ] )
		.pipe( sort() )
		.pipe( wpPot({
			domain: "frank",
			headers: false
		}))
		.pipe( gulp.dest( './translation/' ));

}

//* Load tasks
exports.js    = scripts;
exports.css   = styles;
exports.watch = watch;
exports.default = gulp.parallel(scripts, styles, watch);
