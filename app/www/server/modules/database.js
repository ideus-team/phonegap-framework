var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
var ObjectID = mongo.ObjectID;
var parseurl = require('parseurl');
// var connect = require('connect');


var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('YOUR_DATABASE_NAME', server, {safe: true});

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'YOUR_DATABASE_NAME DB' database");
  }
});

function sendR(res, status, data, code){
  var sendObj = {
    status: status,
    code: code,
    data: data
  }
  return res.send(sendObj);
}

exports.sendHeaders = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if ( err ){
    var err = new Error('Not Found');
    err.status = 404;
    console.log('ERROR');
    next(err); 
  } else {
    next();
  }
};

exports.test = function (req, res) {
  sendR(res, 'Ok', 'Test node server succesful', 200);
};

/*
exports.getUser = function (req, res, next) {
  db.collection('users', function(err, collection) {
    collection.find({'_id': new ObjectID(req.params.id)}, function(err, result){
      result.toArray(function(err, item) {
        return res.send(item);
      });
    });
 });
};

exports.auth = function (req, res, next) {
  var email = req.params.email;
  var password = req.params.password;
  db.collection('users', function(err, collection) {
    collection.find({email: email}, function(err, result){
      result.toArray(function(err, item){
        if ( item.length ){
          var user = item[0];
          var enterPassword = CryptoJS.AES.encrypt(password, cryptoKey).toString();
          var userPassword = CryptoJS.AES.decrypt(user.password, cryptoKey);
          userPassword = userPassword.toString(CryptoJS.enc.Utf8);
          if ( userPassword === password ){
            return res.send(user);
          } else {
            return res.send('Не верный пароль!');
          }
        } else {
          return res.send('Нет пользователя с таким Email');
        }
      });
    });
 });
};


exports.createUser = function (req, res, next) {
  var findData = [{ username: req.body.username}, { email: req.body.email}];
  db.collection('users').aggregate([{
    $match : {
      $or: findData
    }
  }],
  {
    explane: true
  }).toArray(function(err, result){
    if ( !result.length ){
      req.body.password = CryptoJS.AES.encrypt(req.body.password, cryptoKey).toString();
      db.collection('users').insert(req.body, function(err, result){
        if ( err ){
          return res.send(err);
        } else {
          result.ops[0].id = result.ops[0]._id;
          delete result.ops[0].password;
          return res.send(result.ops[0]);
        }
      });
    } else {
      var user = result[0];
      var error = {
        code: 10,
        text: 'Пользователь с таким именем или email уже существует',
        fields: {
          username: user.username,
          email: user.email
        },
        result: result
      }
      return res.send(error);
    }
  });
};

exports.updateUser = function (req, res, next) {
  var uid = req.body.uid;
  var user = req.body;
  delete user._id;
  db.collection('users', function(err, collection){
    console.log(user);
    collection.update({uid: uid}, user, {safe:true}, function(err, result){
      if ( err ){
        return res.send({'error':'An error has occurred'});
      } else {
        return res.send(result);
      }
    });
  });
};

exports.editMember = function (req, res, next) {
  var id = req.body._id;
  var user = req.body;
  delete user._id;
  
  db.collection('users', function(err, collection){
    collection.update({'_id': new ObjectID(id)}, user, {safe:true}, function(err, result){
      if ( err ){
        return res.send({'error':'An error has occurred'});
      } else {
        return res.send(result);
      }
    });
  });
};

exports.deleteUsers = function (req, res, next) {
  db.collection('users').remove({}, function(err, result){
    return res.send(result.result);
  });
};

exports.getSession = function (req, res, next) {
  return res.send({s: '1'});
};
*/