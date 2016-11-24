import Register from '../../modules/registrator';
import * as templates from '../templates/templates'


Register.model('user', {

  idAttribute: 'userId',

  defaults: {
    name: 'Alex',
    age: '27',
    email: 'mrmasterix@gmail.com'
  }

});

Register.model('auth', {

  fetchParams: [
    {
      command: 'auth',
      params: {
        email: null,
        username: null
      }
    }
  ],

  defaults: {
    name: 'Alex',
    age: '27',
    email: 'mrmasterix@gmail.com'
  }

});

Register.model('auth2', {

  fetchParams: [
    {
      command: 'auth2',
      params: {
        email: null,
        username: null
      }
    }
  ],

  defaults: {
    name: 'Alex2',
    age: '27_2',
    email: 'mrmasterix@gmail.com_2'
  }

});