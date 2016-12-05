/**
 * External dependencies
 */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { By, WebDriver } from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';

/**
 * Internal dependencies
 */
import { WebDriverManager, WebDriverHelper as helper } from '../src/index';

const startBrowserTimeout = 30000;

chai.use( chaiAsPromised );

const assert = chai.assert;
const expect = chai.expect;

let manager;
let driver;

test.describe( 'WebDriver client for chrome', () => {
	test.before( 'Start chrome', function() {
		this.timeout( startBrowserTimeout );

		const baseUrl = 'https://automattic.com';
		manager = new WebDriverManager( 'chrome', { baseUrl: baseUrl } );
		driver = manager.getDriver();

		driver.get( manager.getPageUrl( '/work-with-us/' ) );
		helper.waitTillPresentAndDisplayed(
			driver,
			By.css( '#content' )
		);
	} );

	test.it( 'creates instance of WebDriver', () => {
		assert( driver instanceof WebDriver );
	} );

	test.it( 'has https://automattic.com as the default base URL', () => {
		assert( 'https://automattic.com' === manager.getBaseUrl() );
	} );

	test.it( 'can returns full url via manager.getPageUrl', () => {
		assert( 'https://automattic.com/work-with-us/', manager.getPageUrl( '/work-with-us/' ) );
	} );

	test.it( 'has desktop as default screen size config', () => {
		assert( 'desktop' === manager.getConfigScreenSize() );
	} );

	test.it( 'uses desktop screen size by default', () => {
		return expect( driver.manage().window().getSize() ).
			to.eventually.deep.equal( manager.getScreenSizeAsObject( 'desktop' ) );
	} );

	test.describe( 'Resize browser by device type', () => {
		test.it( 'can resize browser to mobile size', () => {
			manager.resizeBrowser( 'mobile' );
			return expect( driver.manage().window().getSize() ).
				to.eventually.deep.equal( manager.getScreenSizeAsObject( 'mobile' ) );
		} );

		test.it( 'can resize browser to tablet size', () => {
			manager.resizeBrowser( 'tablet' );
			return expect( driver.manage().window().getSize() ).
				to.eventually.deep.equal( manager.getScreenSizeAsObject( 'tablet' ) );
		} );

		test.it( 'can resize browser to desktop size', () => {
			manager.resizeBrowser( 'desktop' );
			return expect( driver.manage().window().getSize() ).
				to.eventually.deep.equal( manager.getScreenSizeAsObject( 'desktop' ) );
		} );

		test.it( 'can resize browser to laptop size', () => {
			manager.resizeBrowser( 'laptop' );
			return expect( driver.manage().window().getSize() ).
				to.eventually.deep.equal( manager.getScreenSizeAsObject( 'laptop' ) );
		} );
	} );

	test.it( 'just visited https://automattic.com/work-with-us/', () => {
		return assert.eventually.equal(
			driver.getCurrentUrl(),
			'https://automattic.com/work-with-us/'
		);
	} );

	test.after( () => {
		manager.quitBrowser();
	} );
} );
