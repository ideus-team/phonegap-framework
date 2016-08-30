define([], function(){
  
  /**
   * @duration {int} ms - default duration
   * @_duration {int} ms - custom duration in init of function
   * @el - node to scroll
   */

  return {

    duration: 1000,

    element: '.b-viewMain',

    scroll: function (el, _duration) {
      $(el || this.element)
        .animate({
          scrollTop: $(el || this.element)[0].scrollHeight
        }, _duration || this.duration);
    }

  };
  
});