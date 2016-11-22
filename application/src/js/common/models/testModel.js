import Register from '../../modules/registrator';

Register.model('auth', {

  fetchParams: [
    {
      command: 'auth',
      params: {
        email: null,
        username: null
      }
    }
  ]

});