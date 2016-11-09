import Register from '../../modules/registrator';

Register.view('home', {

  init(){
    console.log('Home');
  },

  afterRender(){
    console.log('afterRender');
  }

});