window.Backbone = window.Backbone || require('Backbone');
let text = require('requirejs-text');
console.log(text);
//import template from 'text!./js/common/templates/test.html';

/**
 * Main router of the application
 */
export default Backbone.Router.extend({

  /**
   * [Define all routes, that using in your application and set controller for this route]
   * @type {Object}
   */
  routes: {
    '': 'home',

    '*notFound': 'notFound'
  },

  home: function() {
    console.log('Router Home');
  },

  /**
   * [Controller that fired when some url not defined in routes object (404 not found)]
   */
  notFound: function() {
    // app.errorView = new ErrorView();
    // this.renderView(app.errorView, settings.renderElem);
  }

});