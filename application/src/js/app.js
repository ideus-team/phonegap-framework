/**
 * @constructor
 * Main application constructor
 */
import * as templates from './common/templates/templates';
import settings from './modules/settings';
import navigate from './modules/navigate';
import MainRouter from './common/routers/router';
import AppError from './modules/error';

export default class App {

  constructor(_options){
    this.defineModules();

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

  defineModules(){
    /* define Application templates */
    this.templates = templates;

    /* define Application Navigator */
    this.navigate = navigate.bind(this);

    this.error = AppError;
  }

  extendOptions(_options){
    this.options = $.extend(settings.options, _options);
  }
}