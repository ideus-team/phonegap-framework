define([], function(){

  /**
   * @settings {object}
   * example { header: true || false, footer: true || false }
   */

  return function(settings){
    this.viewData = {
      settings: {
        header: {
          visible: settings && settings.header.length ? settings.header : false
        },
        footer: {
          visible: settings && settings.footer ? settings.footer : false
        }
      },
      data: {}
    }
  };
  
});