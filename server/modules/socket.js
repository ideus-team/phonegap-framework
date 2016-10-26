var dir = {
  uploadsDir: 'files/images/'
};

var newLoader = function(socket, siofu){
  socket.uploader = new siofu();
  socket.uploader.dir = dir.uploadsDir;
  socket.uploader.listen(socket);

  // server side
  socket.uploader.on("saved", function(event){
    event.file.clientDetail.stream = event.file.writeStream;
    console.log('Image saved');
  });

  // Error handler:
  socket.uploader.on("error", function(event){
      console.log("Error from uploader", event);
  });
}

/**
 *
 * @param socket
 * @param io
 * @returns {{emit: Function, call: {echo: Function, broadcast: Function}}}
 * @constructor
 */
function Gate(socket, io, siofu, database){
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
      
      test: function(){
        socket.emit('test', {});
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
        socket.username = res.data.user.username;
        socket.join(socket.room);
        socket.emit(res.clientEvent, res.data);

        var newUser = {
            event: 'newUserConnect',
            data: {
              username: socket.username,
              id: socket.id
            }
          };
          
        socket.broadcast.to(socket.room).emit(newUser.event, newUser.data);
        console.log('User '+ socket.username +' added to room ' +socket.room);
      },

      chatmessages: function(res){
        var $data = res.data;
        $data.room = socket.room;
        var date = new Date();
        $data.date = {
          year: date.getFullYear(),
          month: date.getMonth(),
          hour: date.getHours(),
          minutes: date.getMinutes(),
          monthDay: date.getDate()
        };

        database.saveMessage(res.data, function(data){
          io.sockets.in(socket.room).emit(res.clientEvent, data);
          database.getRooms({}, function(_data){
            io.sockets.emit('getRooms', _data);
          });
        });
      },

      newRoom: function (res) {
        database.newRoom(res.data, function(data){
          io.sockets.emit('getRooms', data);
        });
      },

      getHistory: function(res){
        database.getHistory(res.data, function(data){
          socket.emit(res.clientEvent, data);
          database.getRooms({}, function(_data){
            io.sockets.emit('getRooms', _data);
          });
        });
      },

      getRooms: function(res){
        database.getRooms(res.data, function(data){
          socket.emit(res.clientEvent, data);
        });
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
        database.leaveRoom(res.data, function(data){
          res.data.roomData = data;
          socket.broadcast.to(socket.room).emit(res.clientEvent, res.data);
          socket.leave(socket.room);
          database.getRooms({}, function(_data){
            io.sockets.emit('getRooms', _data);
          });
        });
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
  var siofu = require('socketio-file-upload');
  var database = require('../modules/database');

  io.sockets.on('connection', function (socket) {
    console.log('Socket Connection');
    newLoader(socket, siofu);
    socket.nameid = socket.id;
    var gate = new Gate(socket, io, siofu, database);

    socket.on('client', function(res){
      gate.call[res.method](res.params);
    });
    
    socket.on('disconnect', function(res){
      console.log('User '+ socket.username || socket.nameid +' disconnected!');
    });
    
  });
  return io;
}



module.exports = ioConnect;