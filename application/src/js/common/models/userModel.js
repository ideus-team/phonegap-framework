import Register from '../../modules/registrator';
import * as templates from '../templates/templates'


Register.model('user', {

  template: 'userComponent',

  idAttribute: 'userId',

  defaults: {
    //name: 'Alex',
    //age: '27',
    //email: 'mrmasterix@gmail.com'
  },

  validateParam: {
    name: {
      required: true,
      minlength: 5,
      maxlength: 10
    },
    age: {
      required: true,
      min: 1,
      max: 99
    },
    email: {
      email: true
    }
  }

});