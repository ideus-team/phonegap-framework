const $ = require('jQuery');
window._ = window._ || require('Underscore');
window.Backbone = window.Backbone || require('Backbone');
let View = Backbone.View;
let Model = Backbone.Model;
let Collection = Backbone.Collection;

import promise from './promise';
import viewData from './viewData';
import requireData from './requireData';
import cache from './cache';
import request from './request';
import { compareFetchData } from './utility';

class Register {

  /* Registrator constructor */
  constructor(){
    this.views = this.views || {};
    this.models = this.models || {};
    this.collections = this.collections || {};
  }

  /*
    Constructor to register views in Application
   */
  view(name, options){
    
    if ( name && (typeof(name) === 'string' || name instanceof String) ){

      this.views = this.views || {};
      this.views[name] = View.extend($.extend({
        
        name: name,

        header: false,
        footer: false,
 
        /* models and collection that needed for view */
        models: [],
        collections: [],

        data: {
          model: {},
          collection: {}
        },

        events: $.extend(options.events, {
          'mouseup .js-pageLink': 'pageLink',
        }),
        
        initialize(data){

          /* define template for view */
          this.template = App.templates[name];

          /* save initialization data localy */
          this.initData = data || {};

          /* check for App.views defined */
          App.views = App.views || {};

          /* save created view by its name into global App object */
          App.views[name] = this;

          /* Before init promise */
          promise(this.beforeInit)
            .then(() => {
              viewData.call(this);
              requireData.call(this);
            })
            .catch(error => {
              console.log(error);
              //log(`message: ${error.message}, code: ${error.code}`, 'red');
            });

        },

        // default callback before init event
        beforeInit(){
         //throw new App.error('asdasdasd', 2213, {id: 213});
        },

        pageLink(e){
          e.preventDefault();
          let link = $(e.currentTarget);
          let options = link.data();
          let page = options.page;
          App.navigate(page, options);
        }

      }, options));
    }

    else {
      throw Error('Registration view error: Name is not defined or Name must be a string.');
    }

  }

  /*
    Constructor to register models in Application
   */
  model(name, options){

    if ( name && (typeof(name) === 'string' || name instanceof String) ){

      this.models = this.models || {};
      this.models[name] = Model.extend($.extend({
        
        type: 'model',
        loadPerRender: false,
        name: name,

        defaults: $.extend(options.defaults, {
          
        }),
        
        initialize(data){

          /* save initialization data localy */
          this.initData = data || {};

          /* check for App.views defined */
          App.models = App.models || {};

          /* save created view by its name into global App object */
          App.models[name] = this;
        },

        successFetch(response){
          let data = response.data;
          let modelName = this.name;

          console.log('------');
          console.log('Получили данные для модели с ID:', modelName, 'и записали их в модель. ');
          console.log('Данные: ', data, ' для модели ', modelName, ' записали в кеш.');
          console.log('------');

          cache.setData(modelName, data);
          this.set(data);
        },

        errorFetch(error){
          console.log(error);
        },

        createFetch(page, callback, params = this.fetchParams){

          let name = this.name;

          compareFetchData(params, this)
            .then(fetchParams => {
              console.log(fetchParams);
              return request.fetch(params, true);
            })
            .then(result => {
              this.successFetch(result);
              callback && callback(result);
              page && App.navigate(page);
            })
            .catch(error => {
              console.log(error);
            });
        }

      }, options));

    } else {
      throw Error('Registration model error: Name is not defined or Name must be a string.');
    }

  }

}


export default new Register();