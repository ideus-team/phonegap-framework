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
    console.groupEnd(title);
  },

  clear(){
    this.logs = [];
  },

  logs: []

};

export default (_message, _type, __title) => {

  var _logger = function(message, type, title){
    if ( settings.debug ){
      let css, text;
      if ( Array.isArray(message) ){
        let _title = __title ? __title : 'Simple console group';
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
    } 
  }.bind(null, _message, _type, __title);

  logger.logs.push(_logger);
}