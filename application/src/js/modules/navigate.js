export default function(fragment, options) {
  
  this.navigateOptions = $.extend({
    fragment: fragment || '',
    trigger: true,
    direction: 'left',
    animationType: 'default',
    back: false,
    writable: true
  }, options);

  this.history = this.history || [];
  this.navigateOptions.writable && this.history.push(this.navigateOptions);
  Backbone.history.navigate(fragment, this.navigateOptions);

}