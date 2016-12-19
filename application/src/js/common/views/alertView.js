import Register from '../../modules/registrator';
import * as utils from '../../modules/utility';

let models = Register.models;
let collections = Register.collections;

Register.view('alert', {

  isPopup: true,

  events: {
    'mouseup .js-button': 'callback'
  },

  callback(e){
    App.popup.close()
      .then(popup => {
        this.initData.callback && this.initData.callback(this, popup);
      });
  },

  init(){
    
  }

});