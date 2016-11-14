export default function(fragment, options) {
  
  this.navigateOptions = $.extend({
    fragment: fragment || '',
    trigger: true,
    direction: 'left',
    animationType: 'default',
    back: false
  }, options);

  this.history = this.history || [];
  this.history.push(this.navigateOptions);
  Backbone.history.navigate(fragment, this.navigateOptions);

}