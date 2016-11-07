let Router = require('Backbone').Router;
import Views from '../views/mainViews';
/**
 * Main router of the application
 */
export default Router.extend({

  initialize(options){
    console.log('Router initialized with options:', options ? options : 'NO OPTIONS');
  },

  /**
   * [Define all routes, that using in your application and set controller for this route]
   * @type {Object}
   */
  routes: {
    '': 'home',

    '*notFound': 'notFound'
  },

  home() {
    new Views.home();
  },

  /**
   * [Controller that fired when some url not defined in routes object (404 not found)]
   */
  notFound() {
    new Views.notFound();
  }

});