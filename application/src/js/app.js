/**
 * @constructor
 * Main application constructor
 */

import settings from './modules/settings';
import MainRouter from './common/routers/router';

export default class App {

  constructor(){
    this.bindEvents();
  }

  bindEvents(){

    /**
     * [Main Event for deviceready/DOMContentLoaded. Using for start application]
     * @param {string} settings.initEvent [Event that fired when dom is already loaded]
     */
    document.addEventListener(settings.initEvent, this.startApplication);
  }

  /**
   * [Initialize application function]
   */
  startApplication(){
    this.router = new MainRouter();
    Backbone.history.start();
  }
}