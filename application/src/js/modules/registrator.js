const $ = require('jQuery');
let View = require('Backbone').View;
let Model = require('Backbone').Model;
let Collection = require('Backbone').Collection;

import promise from './promise';
import viewData from './viewData';
import requireData from './requireData';

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

    if ( name ){

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

        // events: $.extend(options.events, {
        //   'mouseup .js-pageLink': 'pageLink',
        // }),

        events: {
          'mouseup .js-pageLink': 'pageLink'
        },

        initialize(data){
          //this.el = App.options.renderElement;
          /* define template for view */
          this.template = App.templates[name];

          /* save initialization data localy */
          this.initData = data || {};

          /* check for App.views defined */
          App.views = App.views || {};

          /* save created view by its name into global App object */
          App.views[name] = this;

          /* Before init promise */
          promise(
            this.beforeInit,

            // success
            () => {
              viewData.call(this);
              requireData.call(this);
            },

            // error
            () => {
              console.log(`View "${this.name}" error with beforeInit callback. [must return true]`);
            }
          );

        },

        // default callback before init event
        beforeInit(){
          return true;
        },

        pageLink(e){
          e.preventDefault();
          let link = $(e.currentTarget);
          let page = link.data('page');
          let options = link.data();
          App.navigate(page, options);
        }

      }, options));
    }

    else {
      throw Error('View must have name!');
    }

  }

}


export default new Register();