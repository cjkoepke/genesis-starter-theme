<?php
/*
Template Name: Landing Page
Description: A landing page template that removes every element on the page, save the entry content and site credits.
*/

/**
 *
 * Remove the site header
 *
 * @since 1.0.0
 *
 */
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

/**
 *
 * Remove navigation
 *
 * @since 1.0.0
 *
 */
remove_action( 'genesis_after_header', 'genesis_do_nav' );
remove_action( 'genesis_after_header', 'genesis_do_subnav' );

/**
 *
 * Remove footer widgets
 *
 * @since 1.0.0
 *
 */
remove_action( 'genesis_before_footer', 'genesis_do_footer_widget_area' );

genesis();