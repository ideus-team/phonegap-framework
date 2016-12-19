import promise from './promise';

export default function(cb) {

  this.$el.html(this.template(this.viewData));

  if ( this.viewData.settings.footer.visible && this.viewData.settings.footer.tpl ){
    this.$('.js-footer').html(this.viewData.settings.footer.tpl(this.viewData));
  }

  if ( this.viewData.settings.header.visible && this.viewData.settings.header.tpl ){
    this.$('.js-header').html(this.viewData.settings.header.tpl(this.viewData));
  }

  let element = !this.isPopup ? 'renderElement' : 'popupsWrapper';
  let render = !this.isPopup ? 'renderView' : 'renderPopup';

  promise(App.router[render].bind(null, this, App.options[element]))
    .then(result => {
      cb && cb instanceof Function && cb(result);
    })
    .catch(error => {
      console.log(error);
    });

  return this;

}