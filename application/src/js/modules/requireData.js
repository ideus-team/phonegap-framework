import promise from './promise';
import renderView from './renderView';
import request from './request';

export default function(callback){

  let checkRender = function(array, counter) {
    let view = this;
    if ( counter >= array.length ) {
      promise(renderView.bind(view))
        .then(result => {
          callback && callback(result);
        });
    } else {
      return false;
    }
  };

  /* our view */
  let VIEW = this;

  /* array of models and collections */
  let ARRAY = [...this.models, ...this.collections];

  if ( ARRAY.length ){
    let loadCounter = 0; // need, because some responses can be faster than prev
    let arrLength = ARRAY.length; // check ARRAY length

    ARRAY.forEach( function(Element, index) {

      let element = {};

      /* if element need loading data before rendering view */
      element.ctor = Element;
      element.name = element.ctor.prototype.name;
      element.type = element.ctor.prototype.type;
      element.data = VIEW.data[element.type][element.name];
      element[element.type] = new Element(element.data);

      /* check for need loading data for element before rendering view */
      if ( !element[element.type].loadPerRender ) {
        loadCounter++;
        return checkRender.call(VIEW, ARRAY, loadCounter);
      }

      element.fetchParams = element[element.type].fetchParams;
      element.successFetch = element[element.type].successFetch;
      element.errorFetch = element[element.type].errorFetch;

      request.fetch(element.fetchParams, true, element.successFetch.bind(VIEW), element.errorFetch.bind(VIEW))

        .then(response => {
          VIEW.viewData.data[element.name] = element[element.type].toJSON();
          loadCounter++;
          checkRender.call(VIEW, ARRAY, loadCounter);
        })

        .catch(error => {
          
          if ( error.status === 404 || error.status === 500 ) {
            console.log('Server Error');
            App.navigate('error');
          } else {
            console.log('Application error');
          }

        });

    });
  } else {
    checkRender.call(VIEW, ARRAY, 0);
  }

}