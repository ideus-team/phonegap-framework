export default function(fragment, options) {

  this.navigateOptions = $.extend({
    fragment: fragment || '',
    trigger: true,
    direction: 'left'
  }, options);

  Backbone.history.navigate(fragment, this._options);

}