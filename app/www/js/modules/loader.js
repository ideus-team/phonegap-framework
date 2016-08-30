define([], function(){
  
  return {

    element: 'body',

    class: 'g-loading',

    initLoader: function(element, _class){
      $(element || this.element).addClass(_class || this.class);
    },

    removeLoader: function(element, _class){
      $(element || this.element).removeClass(_class || this.class);
    }

  };
  
});