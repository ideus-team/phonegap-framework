export default {

  storage: localStorage || window.localStorage,

  getData(key){
    var str = this.storage.getItem(key);
    return {
      result: str ? true : false,
      data: str && JSON.parse(str)
    };
  },

  setData(key, obj){
    var obj = {
      stamp: new Date().getTime(),
      data: obj
    };
    var str = JSON.stringify(obj);
    this.storage.setItem(key, str);
    return true;
  },


  /**
   * [clearCache]
   * @param  {[array || string || not set]} key [description]
   */
  clearCache(key){

    if ( key && Array.isArray(key) ){
      key.forEach( (_key, i) => {
        this.storage.removeItem(_key);
      }, this);
    }

    else if ( key && !Array.isArray(key) ) {
      this.storage.removeItem(key);
    }

    else {
      this.storage.clear();
    }

    return true;
  }

}