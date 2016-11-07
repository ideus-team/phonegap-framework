let logTypes = {
  default: 'background: #fff; color: #000',
  green: 'background: #222; color: #bada55',
  red: 'background: red; color: #fff'
}

export default (message, type) => {
  let css = logTypes[type] || logTypes.default;
  let text = `%c ${message} `;
  return console.log(text, css);
}