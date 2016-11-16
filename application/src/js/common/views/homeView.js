import Register from '../../modules/registrator';

Register.view('home', {

  init(){
    console.log('Home init');
  },

  afterRender(){
    console.log('afterRender');
  },

  events: {
    'asd .asd': 'init'
  }

});