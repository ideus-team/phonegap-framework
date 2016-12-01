export default module = {

  create(view, el){
    this.view = view;
    this.view.init && this.view.init(this.view.initData);
    el.html(view.el)
      .addClass(App.options.popupOptions.openClass);
    this.afterRender();
  },

  afterRender(){
    this.view.afterRender && this.view.afterRender();
    App.currentView = this.view;
  },

}