import settings from './settings';

let logTypes = {
  default: 'background: white; color: black',
  black: 'background: black; color: white',
  red: 'background: red; color: white'
}

window.logger = {

  show(title, date){
    let _title = title ? `Logger:${title}` : 'Logger';

    if ( date ) {
      _title += ' :: '+ new Date().toLocaleString();
    }

    console.groupCollapsed(_title);
    this.logs.forEach((fn, i) => {
      fn();
    });
    console.groupEnd(_title);
  },

  clear(){
    this.logs = [];
  },

  save(key){
    if ( !key ){ return }
    this.cached[key] = this.logs.concat();
    return true;
  },

  get(key){
    if ( !key || !this.cached[key] ){ return }
    let _cached = this.cached[key];
    let _title = `Logger:${key}`;
    console.groupCollapsed(_title);
    _cached.forEach((fn, i) => {
      fn();
    });
    console.groupEnd(_title);
  },

  del(key){
    return key ? delete this.cached[key] : this.cached = {};
  },

  logs: [],
  cached: {}

};

export default (_message, _type, __title) => {

  var _logger = function(message, type, title){
    //if ( settings.debug ){
      let css, text;
      if ( Array.isArray(message) ){
        let _title = title ? title : 'Simple console group';
        console.groupCollapsed(_title);
        message.forEach( function(element, index) {
          let _type = Array.isArray(type) ? type[index] : type;
          css = logTypes[_type] || logTypes.default;
          text = typeof element === 'object' ? element : `%c ${element} `;

          if ( typeof element === 'object' ){
            console.log(text);
          } else {
            console.log(text, css);
          }
        });
        console.groupEnd(_title);
      } else {
        css = logTypes[type] || logTypes.default;
        text = `%c ${message} `;
        console.log(text, css);
      }
    //} 
  }.bind(null, _message, _type, __title);

  logger.logs.push(_logger);
}