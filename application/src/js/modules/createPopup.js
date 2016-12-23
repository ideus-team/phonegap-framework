export default module = {

  create(view, el){
    this.options = App.navigateOptions;
    App.options.popupOptions.animateClass =  App.options.popupOptions.animations[this.options.animationType].class || App.options.popupOptions.animations.default.class;
    this.view = view;
    this.view.init && this.view.init(this.view.initData);
    el.html(view.el)
      .removeClass(App.options.popupOptions.closeClass)
      .addClass(App.options.popupOptions.animateClass)
      .addClass(App.options.popupOptions.openClass);
    App.isPopupOpen = true;
    this.afterRender();
  },

  afterRender(){
    this.view.afterRender && this.view.afterRender();
    App.currentView = this.view;
  },

}