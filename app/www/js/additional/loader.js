define([], function(){
  
  return {

    element: 'body',

    class: 'g-loading',

    initLoader: function(element, _class){
      $(element || this.element).addClass(_class || this.class);
    }

    removeLoader: function(element, class){
      $(element || this.element).removelass(_class || this.class);
    }

  };
  
});