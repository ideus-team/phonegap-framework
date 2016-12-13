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

let App = {

  firstStart: true,

  /* define Application templates */
  templates,

  /* define Application Navigator */
  navigate: navigate.bind(this),

  error: AppError,

  /* initialize Application router */
  router: new MainRouter(),

  popupData: {},
  popup: new Popup(),

  init(_options){
    this.defineModules();
    this.extendOptions(_options);
    this.bindEvents();

    return this;
  },

  bindEvents(){
    /**
     * [Main Event for deviceready/DOMContentLoaded. Using for start application]
     * @param {string} settings.initEvent [Event that fired when dom is already loaded]
     */
    document.addEventListener(settings.initEvent, this.startApplication, false);
  },

  /**
   * [Initialize application function]
   */
  startApplication(){
    Backbone.history.start();
  },

  defineModules(){

  },

  extendOptions(_options){
    this.options = $.extend(settings.options, _options)
  }
}

export default App;