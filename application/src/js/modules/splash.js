import settings from './settings';

export default {
  show(){
    'splashscreen' in navigator && !settings.debug && navigator.splashscreen.show();
  },
  
  hide(){
    'splashscreen' in navigator && !settings.debug && navigator.splashscreen.hide();
  }
}