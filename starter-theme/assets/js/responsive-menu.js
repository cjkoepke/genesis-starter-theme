/**
 *
 * Modified Responsive Menu for Genesis Framework markup (accessible)
 *
 * @version 1.0.0
 * @author Robin Cornett, Calvin Koepke
 * @link http://robincornett.com/genesis-responsive-menu/
 *
 */
( function ( document, $, undefined ) {
	'use strict';

	var startertheme        = {},
		mainMenuButtonClass = 'menu-toggle',
		subMenuButtonClass  = 'sub-menu-toggle';

	startertheme.init = function() {
		var toggleButtons = {
			menu : $( '<button />', {
				'class' : mainMenuButtonClass,
				'aria-expanded' : false,
				'aria-pressed' : false,
				'role' : 'button'
				} )
				.append( startertheme.params.mainMenu ),
			submenu : $( '<button />', {
				'class' : subMenuButtonClass,
				'aria-expanded' : false,
				'aria-pressed' : false,
				'role' : 'button'
				} )
				.append( $( '<span />', {
					'class' : 'screen-reader-text',
					text : startertheme.params.subMenu
				} ) )
		};
		$( '.site-header > .wrap' ).append( toggleButtons.menu ); // add the main nav buttons
		$( '.menu-item-has-children' ).append( toggleButtons.submenu ); // add the submenu nav buttons
		$( '.' + mainMenuButtonClass ).each( _addClassID );
		$( window ).on( 'resize.startertheme', _doResize ).triggerHandler( 'resize.startertheme' );
		$( '.' + mainMenuButtonClass ).on( 'click.startertheme-mainbutton', _mainmenuToggle );
		$( '.' + subMenuButtonClass ).on( 'click.startertheme-subbutton', _submenuToggle );
	};

	// add nav class and ID to related button
	function _addClassID() {
		var $this = $( this ),
			nav   = $this.parents().find( 'nav' ),
			id    = 'class';
		// $this.addClass( $( nav ).attr( 'class' ) );
		if ( $( nav ).attr( 'id' ) ) {
			id = 'id';
		}
		$this.attr( 'id', 'mobile-' + $( nav ).attr( id ) );
	}

	// Change Skiplinks and Superfish
	function _doResize() {
		var buttons = $( 'button[id^=mobile-]' ).attr( 'id' );
		if ( typeof buttons === 'undefined' ) {
			return;
		}
		_superfishToggle( buttons );
		_changeSkipLink( buttons );
		_maybeClose( buttons );
	}

	/**
	 * action to happen when the main menu button is clicked
	 */
	function _mainmenuToggle() {
		var $this = $( this );
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$( 'nav' ).slideToggle( 'fast' );
		$( 'body' ).toggleClass( 'nav-visible' );
	}

	/**
	 * action for submenu toggles
	 */
	function _submenuToggle() {

		var $this  = $( this ),
			others = $this.parents( '.menu-item' ).siblings();
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.parent().find( '> .sub-menu' ).slideToggle( 'fast' );

		others.find( '.' + subMenuButtonClass ).removeClass( 'activated' ).attr( 'aria-pressed', 'false' );
		others.find( '.sub-menu' ).slideUp( 'fast' );

	}

	/**
	 * activate/deactivate superfish
	 */
	function _superfishToggle( buttons ) {
		if ( typeof $( '.js-superfish' ).superfish !== 'function' ) {
			return;
		}
		if ( 'none' === _getDisplayValue( buttons ) ) {
			$( '.js-superfish' ).superfish( {
				'delay': 100,
				'animation': {'opacity': 'show', 'height': 'show'},
				'dropShadows': false
			});
		} else {
			$( '.js-superfish' ).superfish( 'destroy' );
		}
	}

	/**
	 * modify skip links to match mobile buttons
	 */
	function _changeSkipLink( buttons ) {
		var startLink = 'genesis-nav',
			endLink   = 'mobile-genesis-nav';
		if ( 'none' === _getDisplayValue( buttons ) ) {
			startLink = 'mobile-genesis-nav';
			endLink   = 'genesis-nav';
		}
		$( '.genesis-skip-link a[href^="#' + startLink + '"]' ).each( function() {
			var link = $( this ).attr( 'href' );
			link = link.replace( startLink, endLink );
			$( this ).attr( 'href', link );
		});
	}

	function _maybeClose( buttons ) {
		if ( 'none' !== _getDisplayValue( buttons ) ) {
			return;
		}
		$( '.menu-toggle, .sub-menu-toggle' )
			.removeClass( 'activated' )
			.attr( 'aria-expanded', false )
			.attr( 'aria-pressed', false );
		$( 'nav, .sub-menu' )
			.attr( 'style', '' );
	}

	/**
	 * generic function to get the display value of an element
	 * @param  {id} $id ID to check
	 * @return {string}     CSS value of display property
	 */
	function _getDisplayValue( $id ) {
		var element = document.getElementById( $id ),
			style   = window.getComputedStyle( element );
		return style.getPropertyValue( 'display' );
	}

	/**
	 * Toggle aria attributes
	 * @param  {button} $this     passed through
	 * @param  {aria-xx} attribute aria attribute to toggle
	 * @return {bool}           from _ariaReturn
	 */
	function _toggleAria( $this, attribute ) {
		$this.attr( attribute, function( index, value ) {
			return _ariaReturn( value );
		});
	}

	/**
	 * update aria-xx value of an attribute
	 * @param  {aria-xx} value passed from function
	 * @return {bool}
	 */
	function _ariaReturn( value ) {
		return 'false' === value ? 'true' : 'false';
	}

	/**
	 * combine menus if there is a secondary navigation
	 */
	function _combineMenus(){

		if ( $( window ).width() < 1200 ) {

			if ( $( '.nav-secondary' )[0] !== undefined ) {
				
				$( 'ul.menu-secondary > li' ).addClass( 'moved-item' ); // tag moved items so we can move them back
				$( 'ul.menu-secondary > li' ).appendTo( 'ul.menu-primary' );
			
			}
			
		} else {

			if ( $( '.nav-secondary' )[0] !== undefined ) {

				$( 'ul.menu-primary > li.moved-item' ).appendTo( 'ul.menu-secondary' );
				$( 'ul.menu-secondary > li' ).removeClass( 'moved-item' );

			}
		}

	}
	

	$(document).ready(function () {

		_combineMenus();

		$( window ).resize( _combineMenus );

		startertheme.params = typeof starterthemeL10n === 'undefined' ? '' : starterthemeL10n;

		if ( typeof startertheme.params !== 'undefined' ) {
			startertheme.init();
		}
	});

})( document, jQuery );