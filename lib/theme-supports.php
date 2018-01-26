<?php

namespace Starter;

// Mobile viewport tag.
add_theme_support( 'genesis-responsive-viewport' );

// HTML5 markup.
add_theme_support( 'html5',  [
	'search-form',
	'comment-form',
	'comment-list',
	'gallery',
	'caption',
] );

// Accessibility features.
add_theme_support( 'genesis-accessibility', [
	'skip-links',
	'search-form',
	'drop-down-menu',
	'headings',
] );

// Enable after-entry widget area.
add_theme_support( 'genesis-after-entry-widget-area' );