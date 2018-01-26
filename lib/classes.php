<?php

/**
 *
 * Custom function for applying common classes to the body tag, depending on the current view
 *
 * @since 1.0.0
 * @author Calvin Koepke
 *
 */

add_filter( 'body_class', 'startertheme_body_classes' );
function startertheme_body_classes( $classes ) {

	if ( is_home() )
		$classes[] = 'page-blog';

	if ( is_front_page() )
		$classes[] = 'page-front';

	if ( is_archive() )
		$classes[] = 'page-archive';

	if ( is_category() )
		$classes[] = 'page-category';

	if ( is_tag() )
		$classes[] = 'page-tag';

	if ( is_search() )
		$classes[] = 'page-search';

	if ( is_page_template() && get_page_template_slug() != false ) {

		$template = basename( get_page_template_slug() );		
		$template_class = str_replace( '.php', '', $template );

		$classes[] = $template_class;
	}

	return $classes;

}