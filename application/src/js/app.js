/**
 * @constructor
 * Main application constructor
 */
import * as templates from './common/templates/templates';
import settings from './modules/settings';
import MainRouter from './common/routers/router';

export default class App {

  constructor(_options){
    this.templates = templates;
    this.extendOptions(_options);
    this.bindEvents();
  }

  bindEvents(){
    /* initialize Application router */
    this.router = new MainRouter();

    /**
     * [Main Event for deviceready/DOMContentLoaded. Using for start application]
     * @param {string} settings.initEvent [Event that fired when dom is already loaded]
     */
    document.addEventListener(settings.initEvent, this.startApplication, false);
  }

  /**
   * [Initialize application function]
   */
  startApplication(){
    Backbone.history.start();
  }

  extendOptions(_options){
    this.options = $.extend(settings.options, _options);
  }
}