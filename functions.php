<?php

namespace Starter;

// Define useful constants.
define( 'CHILD_THEME_NAME', 'Genesis Starter' );
define( 'CHILD_THEME_AUTHOR', 'Calvin Koepke' );
define( 'CHILD_THEME_AUTHOR_URL', 'https://calvinkoepke.com/' );
define( 'CHILD_THEME_URL', 'https://github.com/cjkoepke/genesis-starter-theme/' );
define( 'CHILD_THEME_VERSION', '2.0' );
define( 'VENDOR_URL', __DIR__ . '/vendor' );

// Init the autoloader.
require_once( VENDOR_URL . '/autoload.php' );

// Autoload theme modules.
\A7\autoload( __DIR__ . '/lib' );