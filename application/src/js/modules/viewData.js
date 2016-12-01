export default function() {
  let obj = {};

  ['header', 'footer'].forEach(function(el, ind){
    if ( typeof this[el] === 'object' ){
      obj[el] = this[el];
    } else {
      obj[el] = {
        visible: this[el] ? this[el] : false
      }
    }
  }.bind(this));

  let curPage = Backbone.history.getFragment();

  this.viewData = {
    settings: {
      header: obj.header,
      footer: obj.footer
    },
    page: curPage,
    data: {}
  };
  
  if ( this.initData ){
    this.viewData.defaults = this.initData;
  }
}