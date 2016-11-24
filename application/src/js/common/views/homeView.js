import Register from '../../modules/registrator';
import * as utils from '../../modules/utility';

let models = Register.models;
let collections = Register.collections;

Register.view('home', {

  events: {
    'submit .js-form': 'addUser'
  },

  models: [models.auth, models.auth2],
  collections: [collections.usersList],

  datas: {
    model: {},
    collection: {
      usersList: [
        {
          userId: '1',
          name: 'Alex_1',
          age: '27_1',
          email: 'mrmasterix@gmail.com_1'
        },
        {
          userId: '2',
          name: 'Alex_2',
          age: '27_2',
          email: 'mrmasterix@gmail.com_2'
        }
      ]
    }
  },

  init(){
    console.log('Home init');
  },

  beforeRender(){
    console.log('before Render');
  },

  afterRender(){
    console.log('after Render');
  },

  addUser(e){
    e.preventDefault()
    let data = utils.getFormData($(e.currentTarget));
    let modelName = 'user_'+data.name;
    let User = Register.model(modelName, {

      idAttribute: '_id',

      defaults: {
        name: 'Alex2',
        age: '27_2',
        email: 'mrmasterix@gmail.com_2'
      }
    });

    new Register.models[modelName](data);
    let _data = App.models[modelName].toJSON();
    utils.defineHideProp(_data, 'cname', modelName);
    console.log(_data);
    this.$('.js-users').append(App.templates.auth(_data));
  }

});