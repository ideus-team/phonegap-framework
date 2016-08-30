define([], function(){

  /**
   * @settings {object}
   * example { header: true || false, footer: true || false }
   */

  return function(settings){

    return this.viewData = {
      settings: {
        header: {
          visible: settings && settings.header ? settings.header : false
        },
        footer: {
          visible: settings && settings.footer ? settings.footer : false
        }
      },
      data: {}
    };

  };
  
});