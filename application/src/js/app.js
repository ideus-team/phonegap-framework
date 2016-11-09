/**
 * @constructor
 * Main application constructor
 */
import * as templates from './common/templates/templates';
import settings from './modules/settings';
import navigate from './modules/navigate';
import MainRouter from './common/routers/router';

export default class App {

  constructor(_options){

    /* initialize Application templates */
    this.templates = templates;

    /* initialize Application Navigator */
    this.navigate = navigate.bind(this);

    /* initialize Application router */
    this.router = new MainRouter();

    this.extendOptions(_options);
    this.bindEvents();
  }

  bindEvents(){
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