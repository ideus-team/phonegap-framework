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
              log(`message: ${error.message}, code: ${error.code}`, 'red');
            });

        },

        // default callback before init event
        beforeInit(){
          //throw new App.error(312, 'asdasd');
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
      throw Error('Registration view error: Name is not defined or Name must be a string. http://github.com');
    }

  }

}


export default new Register();