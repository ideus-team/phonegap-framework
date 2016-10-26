/**
 * Require libraries
 * If you want add some libs, you must install it by `npm i LIB_NPM_NAME_PACKAGE`
 */
window._ = window._ || require('Underscore');
window.Backbone = window.Backbone || require('Backbone');
window.$ = window.$ || require('jQuery');

/**
 * Import modules
 */
import Application from './app';


/**
 * [App] is main object of Application
 * @constructor {Application}
 */
window.App = new Application();