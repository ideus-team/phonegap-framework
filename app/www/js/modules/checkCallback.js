define([], function(){
  
  return function(callback, response) {
    return callback && callback instanceof Function && callback(response);
  }
  
});