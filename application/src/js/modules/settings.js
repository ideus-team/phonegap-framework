export default {

  initEvent: window.cordova ? 'deviceready' : 'DOMContentLoaded',

  platform: window.device && device.platform.toLowerCase() || 'browser',

  /*
   * If debug = true - browser verstion
   * will be displayed. You must check if ( !app.debug )
   * in all places where with cordova plugin method call
  */
  debug: window.cordova ? false : true,

  // day
  //cachePreiod: 3600*1000*24,
  // minute
  cachePreiod: 60000,

  sqlServer: {
    protocol: 'http',
    domain: '',
    host: '',
    apiUrl: 'api',
    lang: '',
    url(){
      var url = window.cordova ? this.protocol+'://'+this.domain+'.'+this.host+this.getLang()+this.apiUrl+'/' : this.getLang()+this.apiUrl+'/';
      return url;
    },

    getLang(){
      return this.lang && this.lang.length ? '/'+this.lang+'/' : '/';
    }
  },
  
  /**
   * Default application options
   * Can be extend or change when App is creating
   * @type {Object}
   */
  options: {

    applicationName: 'iDeus',

    // default page before signUp/signIn
    defaultPage: '/',

    // default page after signUp/signIn
    specialPage: '/',

    // duration to animate pages
    slideDuration: 500,

    // default transition effect to change pages
    slideEffect: '',

    renderElement: '#app-main',

    menuHolder: '#app-menu',

    footerHolder: '#app-footer',

    mainContainer: '#app-container',

    popupsWrapper: '#app-popupWrap',

    popupOptions: {
      openClass: '-state_open',
      closeClass: '-state_close',
      fadeDuration: 200,

      alertDefaults: {
        title(){
          return App.applicationName;
        },
        button: 'Ok',
        template(){
          return App.templates.alert
        }
      }
    }
  },

};