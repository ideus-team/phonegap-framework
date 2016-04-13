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
        console.log('Test echo event', data);
      },
      
      /**
       * Создание комнаты и добавление в нее пользователя
       * @param res {object} - параметры
       * @param res.clientEvent {string} - название евента на клиенте
       * @param res.serverEvent {string} - название евента на сервере
       * @param res.data {object} - данные события
       * @param res.data.username {string} - имя пользователя
       * @param res.data.roomId {string} - id комнаты
       */
      create: function(res){
        socket.room = 'room_' + res.data.roomId;
        socket.name = res.data.username;
        socket.join(socket.room);
        socket.emit(res.clientEvent, res.data);
        console.log('User '+ socket.name +' added to room ' +socket.room);
      },
      
      /**
       * Событие, когда пользователь покидает комнату.
       * В этот момент всем, кроме того, кто покинул комнату,
       * отсылаются данные о пользователе покинувшем комнату.
       * @param serverEvent {string} - название евента на сервере
       * @param clientEvent {string} - название евента на клиенте
       * @param data {object} - параметры
       */
      leaveroom: function(res){
        socket.leave(socket.room);
        socket.broadcast.to(socket.room).emit(res.clientEvent, res.data);
      },
      
      /**
       * Отправить всем в комнату включая отправителя
       * @param serverEvent {string} - название евента на сервере
       * @param clientEvent {string} - название евента на клиенте
       * @param data {object} - параметры
       */
      send: function(res){
        io.sockets.in(socket.room).emit(res.clientEvent, res.data);
      },
      
      /**
       * Отправить всем в комнату кроме отправителя
       * @param serverEvent {string} - название евента на сервере
       * @param clientEvent {string} - название евента на клиенте
       * @param data {object} - параметры
       */
      broadcast: function(res){
        socket.broadcast.to(socket.room).emit(res.clientEvent, res.data);
      }
    }
  }
}

function ioConnect(server) {
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function (socket) {
    var gate = new Gate(socket, io);

    socket.on('client', function(res){
      gate.call[res.method](res.params);
    });
    
    socket.on('disconnect', function(res){
      console.log(res);
      console.log('User '+ socket.name +' disconnected!');
    });
    
  });
  return io;
}



module.exports = ioConnect;