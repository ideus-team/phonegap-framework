/**
 * @constructor
 * Main application constructor
 */

window.$ = window.$ || require('jQuery');

import * as templates from './common/templates/templates';
import settings from './modules/settings';
import navigate from './modules/navigate';
import MainRouter from './common/routers/router';
import AppError from './modules/error';
import Popup from './modules/popup';
import cache from './modules/cache';
import Device from './modules/device';
import splash from './modules/splash';

let App = {

  firstStart: true,

  logger: window.logger,

  /* define Application templates */
  templates,
  
  /* define Application cache */
  cache,

  /* define Application Navigator */
  navigate,

  /* define Application Splash */
  splash,

  error: AppError,

  /* initialize Application router */
  router: new MainRouter(),

  popupData: {},
  popup: new Popup(),

  init(_options){
    this.extendOptions(_options);
    this.bindEvents();

    log('Application was inited', 'black');

    return this;
  },

  bindEvents(){
    /**
     * [Main Event for deviceready/DOMContentLoaded. Using for start application]
     * @param {string} settings.initEvent [Event that fired when dom is already loaded]
     */
    document.addEventListener(settings.initEvent, this.startApplication, false);

    // android only
    document.addEventListener('backbutton', this.backButton, false);
  },

  /**
   * [Initialize application function]
   */
  startApplication(){
    App.splash.hide();
    App.defineModules();
    Backbone.history.start();
    log('Application history was inited', 'black');
  },

  backButton(e){
    e.preventDefault();
    console.log(App.isPopupOpen);
    if ( App.isPopupOpen ){
      console.log('test');
      App.popup.close();
    } else {
      App.navigate(App.history[App.history.length-1].previusView.page);
    }
  },

  defineModules(){
    new Device();
  },

  extendOptions(_options){
    this.options = $.extend(settings.options, _options)
  },

}

export default App;