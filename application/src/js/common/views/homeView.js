import Register from '../../modules/registrator';

let models = Register.models;

Register.view('home', {

  models: [models.auth],

  init(){
    console.log('Home init');
  },

  afterRender(){
    console.log('afterRender');
  }

});