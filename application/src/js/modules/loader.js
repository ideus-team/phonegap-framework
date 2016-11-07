export default {

  element: 'body',

  class: 'g-loading',

  show: function(element, _class){
    $(element || this.element).addClass(_class || this.class);
  },

  hide: function(element, _class){
    $(element || this.element).removeClass(_class || this.class);
  }

}