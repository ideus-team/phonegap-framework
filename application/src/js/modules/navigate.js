export default function(fragment, options) {

  this.navigateOptions = $.extend({
    page: '/',
    trigger: true,
    direction: 'left',
    animationType: 'default',
    back: false,
    writable: true,
    static: false,
    previusView: {
      view: App.currentView,
      page: App.history && App.history.slice(-1)[0] ? App.history.slice(-1)[0].page : '/'
    }
  }, options);

  this.history = this.history || [];
  this.navigateOptions.writable && this.history.push(this.navigateOptions);
  Backbone.history.navigate(fragment, this.navigateOptions);

}