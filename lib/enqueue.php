<?php

namespace Starter;

add_action( 'wp_enqueue_scripts', 'Starter\load_assets' );
/**
 *
 * Load files in the /assets/ directory
 *
 * @since 1.0.0
 *
 */
function load_assets() {

	// Use uncompressed assets if debugging.
	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_script( 'bundle-scripts', get_stylesheet_directory_uri() . "/dist/js/bundle{$suffix}.js", [ 'jquery' ], CHILD_THEME_VERSION, true );

}