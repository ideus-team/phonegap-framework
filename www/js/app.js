var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    //document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
    
    // document.addEventListener('offline', this.onDeviceOffline, false);
    // document.addEventListener('online', this.onDeviceOnline, false);
  },
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    
    var appRouter = new AppRouter();
    Backbone.history.start();
    app.changePage('home', true);
  },
  
  changePage: function(page, trigger, dir){
    var anim = {
      type: Jr.Navigator.animations.SLIDE_OVER,
      direction: dir ? Jr.Navigator.directions[dir.toUpperCase()] : ''
    };
    
    var params = {
      trigger: trigger,
      animation: anim
    };
    
    Jr.Navigator.navigate(page, params);
  },
  
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
  },
  
  getTemplate: function(id){
    return $('#'+id).html();
  },
  
  onDeviceOffline: function(){
    navigator.notification.alert('Offline');
  },
  
  onDeviceOnline: function(){
    navigator.notification.alert('Online');
  },
  
  exitApp: function(){
    navigator.app.exitApp();
  },
  
  showSplash: function(){
    navigator.splashscreen.show();
  },
  
  hideSplash: function(){
    navigator.splashscreen.hide();
  }
};

app.initialize();