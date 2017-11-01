/**
 * External dependencies
 */
import test from 'selenium-webdriver/testing';
import { WebDriverManager } from '../src/index';

const startBrowserTimeout = 30000;

// Set manager and driver
test.before( function() {
	this.timeout( startBrowserTimeout );

	global.__MANAGER__ = new WebDriverManager( 'chrome' );
	global.__DRIVER__ = global.__MANAGER__.getDriver();
} );
