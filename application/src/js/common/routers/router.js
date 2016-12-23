let Router = require('Backbone').Router;
import Models from '../models/mainModels';
import Collections from '../collections/mainCollections';
import Views from '../views/mainViews';
import createView from '../../modules/createView';
import createPopup from '../../modules/createPopup';
import log from '../../modules/log';
/**
 * Main router of the application
 */
export default Router.extend({

  initialize(options){
    let isOptionsText = options ? options : 'NO OPTIONS';
    let logtext = 'Router was initialized with options: '+isOptionsText;
    log(logtext, 'black');
  },

  /**
   * [Define all routes, that using in your application and set controller for this route]
   * @type {Object}
   */
  routes: {
    '(/)': 'home',
    'popup/:id': 'popup',

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
  },

  popup(id){
    return App.popup.open(id);
  },

  renderView(view, el) {
    if ( App.isPopupOpen ){
      App.popup.close(true).then(() => {
        return createView.create(view, $(el));
      });
    } else {
      createView.create(view, $(el));
    }
  },

  renderPopup(view, el) {
    if ( App.isPopupOpen ){
      App.popup.close(true).then(() => {
        return createPopup.create(view, $(el));
      });
    } else {
      createPopup.create(view, $(el));
    }
  }

});