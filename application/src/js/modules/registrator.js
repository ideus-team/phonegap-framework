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
import * as utils from './utility';

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

        datas: {
          model: options.datas ? $.extend(options.datas.model, {}) : {},
          collection: options.datas ? $.extend(options.datas.collection, {}) : {}
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
          promise(this.beforeRender)
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
        beforeRender(){
         //throw new App.error('asdasdasd', 2213, {id: 213});
        },

        bindModels(){
          this.models.forEach((model, index) => {
            const VIEW = this;
            let name = model.prototype.name;
            let _model = _.findWhere(App.models, {name: name});

            /* model change event */
            _model.on('change', changedModel => {
              console.log(changedModel);
              let changed = changedModel.changed;
              let dom = VIEW.$('[data-cname="'+name+'"]');
              if ( dom.length ){
                for ( let prop in changed ){
                  if ( changed[prop] ){
                    let _data = changedModel.toJSON();
                    utils.defineHideProp(_data, 'cname', name);
                    dom.replaceWith(App.templates[name](_data));
                  } else {
                    dom.find('[data-bind="'+prop+'"]').remove();
                    dom.is(':empty') && dom.remove();
                  }
                }
              } else {
                let _data = changedModel.toJSON();
                utils.defineHideProp(_data, 'cname', name);
                VIEW.$el.append(App.templates[name](_data));
              }
            });

          });
        },

        bindCollections(){
          this.collections.forEach((collection, index) => {
            const VIEW = this;
            let name = collection.prototype.name;
            let _collection = _.findWhere(App.collections, {name: name});

            /* collection change model */
            _collection.on('change', changedModel => {
              let changed = changedModel.changed;
              let dom = VIEW.$('[data-cname="'+name+'"]');
              let cid = changedModel.cid;
              let model = dom.find('[data-cid="'+cid+'"]');
              for ( var prop in changed ){
                let attr = model.find('[data-'+prop+'-bind]');
                attr && attr.attr('data-'+prop+'-bind', changed[prop]);
                model.find('[data-bind="'+prop+'"]').html(changed[prop]);
              }
            });

            /* collection add model */
            _collection.on('add', newModel => {
              let modelName = newModel.name;
              let cid = newModel.cid;
              let dataModel = newModel.toJSON();
              utils.defineHideProp(dataModel, 'cid', cid);
              VIEW.$('[data-cname="'+name+'"]').append(App.templates[modelName]({model: dataModel}));
            });

            /* collection remove model */
            _collection.on('remove', deleteModel => {
              let cid = deleteModel.cid;
              VIEW.$('[data-cid="'+cid+'"]').remove();
            });
          });
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
        
        idAttribute: '_id',

        type: 'model',
        loadPerRender: false,
        name: name,

        defaults: $.extend(options.defaults, {}),
        
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

          utils.compareFetchData(params, this)
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

  /*
    Constructor to register models in Application
   */
  collection(name, options){

    if ( name && (typeof(name) === 'string' || name instanceof String) ){

      this.collections = this.collections || {};
      this.collections[name] = Collection.extend($.extend({

        model: options.model || this.model(name+'Model'),
        type: 'collection',
        loadPerRender: false,
        name: name,
        
        initialize(data){

          /* save initialization data localy */
          this.initData = data || {};

          /* check for App.views defined */
          App.collections = App.collections || {};

          /* save created view by its name into global App object */
          App.collections[name] = this;
        },

        successFetch(response){
          let data = response.data;
          let collectionName = this.name;

          console.log('------');
          console.log('Получили данные для модели с ID:', collectionName, 'и записали их в модель. ');
          console.log('Данные: ', data, ' для модели ', collectionName, ' записали в кеш.');
          console.log('------');

          cache.setData(collectionName, data);
          this.set(data);
        },

        errorFetch(error){
          console.log(error);
        },

        createFetch(page, callback, params = this.fetchParams){

          let name = this.name;

          utils.compareFetchData(params, this)
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
      throw Error('Registration collection error: Name is not defined or Name must be a string.');
    }

  }

}


export default new Register();