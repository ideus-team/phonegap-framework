/**
 *
 * @param socket
 * @param io
 * @returns {{emit: Function, call: {echo: Function, broadcast: Function}}}
 * @constructor
 */
function Gate(socket, io){
  /**
   *
   * @param type {string} - навзвание евента
   * @param status {string} - статус ответа
   * @param params {object} - параметры ответа
   */
  function response(type, status, params){
    var data = {};
    data.result = 'ok';
    data.error = null;
    data.id = socket.client.conn.id;
    data.params = params || null;

    if(status == 'error'){

    }
    socket.emit(type, data);
  }

  return {
    emit: function(data){
      response('server', 'ok', data);
    },

    /**
     * функции для евентов
     */
    call: {
      echo: function(data){
        console.log(data);
        response('response', 'ok', data);
      },

      /**
       * Отправить всем в комнату кроме отправителя
       * @param event {string} - название евента
       * @param data {object} - параметры
       */
      broadcast: function(eventName, data){
        socket.broadcast.to(socket.room).emit(eventName, data);
      },
      /**
       * Отправка данных конкретному пользователю
       * @param socketId {string}
       */
      send: function(socketId){
        io.clients[socketId].send();
      }
    }
  }
}

function ioConnect(server) {
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function (socket) {
    var gate = new Gate(socket, io);
    socket.on('create', function (roomId) {
      socket.room = 'room_' + roomId;
      socket.join(socket.room);
      console.log('user add to', socket.room);
    });

    socket.on('client', function(res){
      console.log(res);
      gate.call[res.method](res.params);
    });
  });
  return io;
}



module.exports = ioConnect;