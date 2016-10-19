'use strict';

require.config({

  baseUrl: 'js/lib',

  paths: {
    jquery: 'jquery.min',
    es6: '../../node_modules/requirejs-babel/es6',
    babel: '../../node_modules/requirejs-babel/babel-5.8.34.min',
    react: 'react.min',
    reactDom: 'react-dom.min',
    text: 'text',
    json: 'json',

    app: '../app',
    templates: '../templates',
  },

  es6: {
    fileExtension: '.jsx'
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-es2015-modules-amd']
  }

});


require(['es6!app'], function (App){
  var app = new App();
});