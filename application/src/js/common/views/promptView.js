import Register from '../../modules/registrator';
import * as utils from '../../modules/utility';

let models = Register.models;
let collections = Register.collections;

Register.view('prompt', {

  isPopup: true,

  events: {
    'mouseup .js-buttonOk': 'ok'
  },

  ok(e){
    App.popup.close()
      .then(popup => {
        let val = this.$('.js-promptInput').val();
        this.initData.callback && this.initData.callback(this, popup);
        if ( val || val.length ){
          this.resolve(val);
        } else {
          this.reject({
            code: 15,
            message: 'Value is empty!'
          });
        }
      });
  },

  init(){
    console.log(this);
  }

});