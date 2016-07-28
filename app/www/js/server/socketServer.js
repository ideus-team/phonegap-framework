define([
  'socket'
], function (io) {

  var $this;

  var socketServer = function(socket){
    /**
     * Запрос на сервер
     * @param method {string} - название евента
     * @param params {object} - параметры
     * @param cb {callback} - функция которая выполнится после обработки запроса
     */
    this.request = function(method, params, cb){
      var data = {
        method: method,
        params: params,
        id: socket.id
      };
      socket.once('response', function(res){
        if(typeof cb == 'function'){
          cb(res);
        }
      });
      socket.emit('client', data);
    };

    /**
     * Подписываемся на евент
     * @param eventName {string} - название евента
     * @param cb {callback} - функция которая должна выполнится при евенте
     */
    this.on = function (eventName, cb){
      socket.on(eventName,function(){
        var args = [].slice.call(arguments);
        if(cb){
          cb.apply(socket, args);
        }
      });
    };

    /**
     * Слушаем сервер только один раз
     * @param eventName {string} - название евента
     * @param cb {callback} - функция которая должна выполнится при евенте
     */
    this.once = function (eventName, cb){
      socket.once(eventName,function(){
        var args = [].slice.call(arguments);
        if(cb){
          cb.apply(socket, args);
        }
      });
    };
  };
  
  return socketServer;
});