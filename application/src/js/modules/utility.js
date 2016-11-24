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

export let defineHideProp = function(obj, name, value){

  Object.defineProperty(obj, name, {
    value: value,
    writable: false,
    configurable: false,
    enumerable: false
  });

}
export let getFormData = function(form){
  let o = {};
  let a = form.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || undefined);
      } else {
        o[this.name] = this.value || undefined;
      }
  });
  return o;
}