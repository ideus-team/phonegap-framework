let Router = require('Backbone').Router;
import Models from '../models/mainModels';
import Collections from '../collections/mainCollections';
import Views from '../views/mainViews';
import createView from '../../modules/createView';
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
    '(/)': 'home',

    '*notFound': 'notFound'
  },

  home() {
    console.log('Home');
    new Views.home();
  },

  /**
   * [Controller that fired when some url not defined in routes object (404 not found)]
   */
  notFound() {
    console.log('notFound');
    new Views.notFound();
  },

  renderView(view, el) {
    console.log('RENDER VIEW');
    return createView.create(view, $(el));
  }

});