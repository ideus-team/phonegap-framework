export default class ApplicationError {

  constructor(message, code, data){
    this.message = message || 'Application error.';
    this.code = code || 316;
    this.data = data || {};
  }

}