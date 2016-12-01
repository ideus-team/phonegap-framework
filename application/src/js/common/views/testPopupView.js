import Register from '../../modules/registrator';
import * as utils from '../../modules/utility';

let models = Register.models;
let collections = Register.collections;

Register.view('testPopup', {

  isPopup: true

});