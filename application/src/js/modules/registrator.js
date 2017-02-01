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
import validate from './validate';

class Register {

  /* Registrator constructor */
  constructor(){
    this.views = this.views || {};
    this.popups = this.popups || {};
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
        isPopup: false,
 
        /* models and collection that needed for view */
        models: [],
        collections: [],

        datas: {
          model: options.datas ? $.extend(options.datas.model, {}) : {},
          collection: options.datas ? $.extend(options.datas.collection, {}) : {}
        },

        events: $.extend(options.events, {
          'mouseup .js-pageLink': 'pageLink',
          'mouseup .js-popup': 'openPopup',
          'mouseup .js-popupClose': 'popupClose'
        }),
        
        initialize(data){
          /* define template for view */
          this.template = this.template || App.templates[name];

          /* save initialization data localy */
          this.initData = data || {};

          /* check for App.views defined */
          App.views = App.views || {};
          App.popups = App.popups || {};

          /* save created view by its name into global App object */
          if ( !this.isPopup ){
            App.views[name] = this;
          } else {
            App.popups[name] = this;
          }

          /* Before init promise */
          promise(this.beforeRender, this.initData, this)
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
        beforeRender(data){
         //throw new App.error('asdasdasd', 2213, {id: 213});
        },

        pageLink(e){
          e.preventDefault();
          let link = $(e.currentTarget);
          let options = link.data();
          let page = options.page;
          App.navigate(page, options);
        },

        openPopup(e){
          e.preventDefault();
          let link = $(e.currentTarget);
          let options = link.data();
          let page = options.page;
          options.writable = false;
          App.navigate(page, options);
        },

        popupClose(e){
          e.preventDefault();
          if ( App.history.splice ){
            let lastRoute = App.history.slice(-1)[0] || App.history.slice(0)[0];
            App.history.splice(-1, 1);
            App.navigate(lastRoute.page, {
              trigger: false
            });
            App.currentView = lastRoute.previusView && lastRoute.previusView.view ? lastRoute.previusView.view : null;
            App.popup.close();
          }
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
        template: 'default',

        defaults: $.extend(options.defaults, {}),

        validate: function(attributes){
          return validate(attributes, options.validateParam);
        },
        
        initialize(data){

          //validate.test();


          /* save initialization data localy */
          this.initData = data || {};

          /* check for App.views defined */
          App.models = App.models || {};

          /* save created view by its name into global App object */
          App.models[name+'_'+this.cid] = this;
          this.bindModel();
        },

        bindModel(){
          const VIEW = App.currentView;
          let model = this;
          let name = model.name;
          let tpl = model.template;
          name = name+'_'+model.cid;
          let _model = App.models[name];

          /* model change event */
          _model.on('change', changedModel => {
            console.log('model change ', changedModel);
            let changed = changedModel.changed;
            let dom = VIEW.$('[data-cid="'+changedModel.cid+'"]');
            
            if ( dom.length ){
              for ( let prop in changed ){
                if ( changed[prop] ){
                  dom.replaceWith(App.templates[tpl](changedModel));
                } else {
                  dom.find('[data-bind="'+prop+'"]').remove();
                  dom.is(':empty') && dom.remove();
                }
              }
            } else {
              VIEW.$el.append(App.templates[tpl](changedModel));
            }
          });

          _model.on('invalid', function(model, error) {
            console.log(model.get('name') + ' ' + error);
          });
        },

        successFetch(response){
          let data = response.data;
          let modelName = this.name;

          log([
            `Получили данные для модели с ID: ${modelName} и записали их в модель.`,
            'Данные записаны в кэш',
            data
          ], 'black', `successFetch:${modelName}`);

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
          //this.bindCollection();
        },

        bindCollection(){
          const VIEW = App.currentView;
          let collection = this;
          let name = collection.name;
          let _collection = _.findWhere(App.collections, {name: name});

          /* collection change model */
          _collection.on('change', changedModel => {

            // console.log('model change ', changedModel);
            // let changed = changedModel.changed;
            // let dom = VIEW.$('[data-cid="'+changedModel.cid+'"]');
            
            // if ( dom.length ){
            //   for ( let prop in changed ){
            //     if ( changed[prop] ){
            //       dom.replaceWith(App.templates[tpl](changedModel));
            //     } else {
            //       dom.find('[data-bind="'+prop+'"]').remove();
            //       dom.is(':empty') && dom.remove();
            //     }
            //   }
            // } else {
            //   VIEW.$el.append(App.templates[tpl](changedModel));
            // }

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

          if ( !params ) return;

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