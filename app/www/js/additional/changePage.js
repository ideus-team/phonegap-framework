define([
  'junior'
], function(Jr){
  
  /**
   * change page
   * @param page {string} - page name
   * @param trigger {boolean} - must be 'true'
   * @param dir {string} - direction to slide page // LEFT| RIGHT | UP | DOWN
   */

  return function(page, trigger, dir){
    
    setTimeout(function() {
      $('body').addClass('g-loading');
    }, 1); 

    Jr.Navigator.navigate(page, {
      trigger: trigger,
      animation: {
        type: Jr.Navigator.animations.SLIDE_OVER,
        direction: dir && Jr.Navigator.directions[dir.toUpperCase()] ? Jr.Navigator.directions[dir.toUpperCase()] : ''
      }
    });
  };
  
});