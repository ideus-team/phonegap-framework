import promise from './promise';

export default function(cb) {

  //console.log(this.viewData);

  this.$el.html(this.template(this.viewData));

  if ( this.viewData.settings.footer.visible && this.viewData.settings.footer.tpl ){
    this.$('.js-footer').html(this.viewData.settings.footer.tpl(this.viewData));
  }

  if ( this.viewData.settings.header.visible && this.viewData.settings.header.tpl ){
    this.$('.js-header').html(this.viewData.settings.header.tpl(this.viewData));
  }

  if ( !this.isPopup ){
    promise(App.router.renderView.bind(null, this, App.options.renderElement))
      .then(result => {
        cb && cb instanceof Function && cb(result);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    promise(App.router.renderPopup.bind(null, this, App.options.popupsWrapper))
      .then(result => {
        cb && cb instanceof Function && cb(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return this;

}