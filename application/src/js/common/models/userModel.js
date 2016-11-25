import Register from '../../modules/registrator';
import * as templates from '../templates/templates'


Register.model('user', {

  template: 'userComponent',

  idAttribute: 'userId',

  defaults: {
    name: 'Alex',
    age: '27',
    email: 'mrmasterix@gmail.com'
  }

});