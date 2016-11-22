import promise from './promise';

/*
 Create fetch params with model attributes and pre-installed fetch params
 */
export let compareFetchData = function(data, model){

  return promise(function(){
    for ( let prop in data ){
      if ( typeof data[prop] == 'object' && data[prop] != null ){
        compareFetchData(data[prop]);
      }
      else if ( prop != 'command' ) {
        let param = model.get(prop);
        if ( param ) {
          data[prop] = model.get(prop);
        } else {
          throw Error('Model "'+model.name+'" error: No property "'+prop+'" in model attributs or it\'s not defined');
        }
      }
    }

    return data;
  });
}