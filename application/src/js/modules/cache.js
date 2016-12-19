export default {

  storage: localStorage || window.localStorage,

  getData(key){
    var str = this.storage.getItem(key);
    let result = str ? true : false;
    let data = str && JSON.parse(str);
    log([`Result: ${result}`, `Stamp: ${data.stamp}`], null, 'Cache:getData');
    return {
      result: result,
      data
    };
  },

  setData(key, obj){
    var _obj = {
      stamp: new Date().getTime(),
      params: obj
    };
    var str = JSON.stringify(_obj);
    this.storage.setItem(key, str);
    log([`Stamp: ${_obj.stamp}`, `String: ${str}`], null, 'Cache:setData');
    return true;
  },


  /**
   * [clearCache]
   * @param  {[array || string || not set]} key [description]
   */
  clearCache(key){

    let textForLog = [];

    if ( key && Array.isArray(key) ){
      key.forEach( (_key, i) => {
        this.storage.removeItem(_key);
        textForLog.push(`Delete cache for: ${_key}`);
      }, this);
    }

    else if ( key && !Array.isArray(key) ) {
      this.storage.removeItem(key);
      textForLog.push(`Delete cache for: ${key}`);
    }

    else {
      this.storage.clear();
      textForLog.push(`Delete all cache`);
    }

    log(textForLog, 'red', 'Cache:clearCache');

    return true;
  }

}