var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  
  loadTemplate: function(tpls, callback) {
    $('body').addClass('g-loading');
    var deferreds = [];
    $.each(tpls, function(index, tpl) {
      deferreds.push($.get('js/templates/' + tpl + '.html', function(data) { app.templates[tpl] = data; }));
    });
    $.when.apply(null, deferreds).done(callback);
  },
  
  tpls: ['homeTemplate'],
  templates: {},
  
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    //document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('DOMContentLoaded', app.loadTemplate(app.tpls, app.onDeviceReady), false);
    
    // document.addEventListener('offline', this.onDeviceOffline, false);
    // document.addEventListener('online', this.onDeviceOnline, false);
  },
  
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    var appRouter = new AppRouter();
    Backbone.history.start();
    app.changePage('home', true);
    $('body').removeClass('g-loading');
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
    //return $('#'+id).html();
    return app.templates[id];
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