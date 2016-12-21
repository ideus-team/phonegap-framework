export default class Device {

  constructor(){
    if ( window.device ) {
      window.device.platform = window.device.platform.toLowerCase();
      App.device = window.device;
    }
  }

}