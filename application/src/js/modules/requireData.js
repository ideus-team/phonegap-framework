import promise from './promise';
import renderView from './renderView';

export default function(callback){

  let checkRender = function(array, counter) {
    let view = this;
    if ( counter >= array.length) {
      promise(
        renderView.bind(view),
        () => {
          callback && callback(view);
        }
      );
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

      /* check for need loading data for element before rendering view */
      if ( !Element.loadPerRender ) {
        loadCounter++;
        return false;
      }


      /* if element need loading data before rendering view */
      element.ctor = Element;
      element.name = element.name;
      element.type = element.prototype.model ? 'collection' : 'model';
      element.data = view.datas[element.type][element.name];
      element[element.type] = new Element(element.data);
      element.fetchParams = element[element.type].fetchParams;
      element.successFetch = element[element.type].successFetch;

      request.fetch(element.fetchParams, element.successFetch.bind(VIEW), element.errorFetch.bind(VIEW), true)

        .done((response) => {
          VIEW.viewData.data[element.name] = element[element.type].toJSON();
          loadCounter++;
          checkRender.call(VIEW, ARRAY, loadCounter);
        })

        .error((response) => {

        });

    });
  } else {
    checkRender.call(VIEW, ARRAY, 0);
  }

}