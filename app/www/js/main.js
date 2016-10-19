'use strict';

require.config({

  baseUrl: 'js/lib',

  paths: {
    jquery: 'jquery.min',
    react: 'react.min',
    reactDom: 'react-dom.min',
    JSXTransformer: 'JSXTransformer',
    jsx: 'jsx',
    es6: 'es6',
    babel: 'babel',
    text: 'text',
    json: 'json',

    app: '../app',
    templates: '../templates'
  },

  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  },

  es6: {
    fileExtension: '.jsx'
  },

  babel: {
    blacklist: [],
    nonStandard: true,
    modules: 'amd'
  }

});


require([
  'jsx!app'
], function (App){
  //new App();
});