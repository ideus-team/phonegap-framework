define([], function(){
  
  return {

    /*
     * If debug = true - browser verstion
     * will be displayed. You must check if ( !app.debug )
     * in all places where with cordova plugin method call
    */
    debug: true,

    uploadsDir: 'img/uploads',

    // ios || android
    developVersion: 'ios',

    sqlServer: '',

    nodeServer: 'http://localhost:8000',
    
    // main element where will be render all app content
    renderElem: '#app-main',
    mainContainer: '#app-container',

    // duration to animate pages
    slideDuration: 400,

    testUser: {
      username: 'Test User',
      uid: '2sd23'
    },
    
  };
});