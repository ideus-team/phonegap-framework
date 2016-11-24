export var auth = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<ul data-cname="' +
((__t = ( data.cname )) == null ? '' : __t) +
'">';
 for ( var prop in data ) { ;

 if ( data[prop] ) { ;
__p +=
((__t = ( App.templates.authLi({prop: prop, value: data[prop]}) )) == null ? '' : __t);
 } ;

 } ;
__p += '</ul>';
return __p
};


export var authLi = function(data) {
var __t, __p = '';
__p += '<li data-bind="' +
((__t = ( data.prop )) == null ? '' : __t) +
'" data-' +
((__t = ( data.prop )) == null ? '' : __t) +
'-bind="' +
((__t = ( data.value )) == null ? '' : __t) +
'">' +
((__t = ( data.value )) == null ? '' : __t) +
'</li>';
return __p
};


export var home = function(data) {
var __t, __p = '';
__p += '<div data-page="asd" data-direction="up" class="js-pageLink" data-writable="false">To NotFound up</div><div data-page="asd" data-direction="down" class="js-pageLink">To NotFound down</div><div data-page="asd" data-direction="left" class="js-pageLink">To NotFound left</div><div data-page="asd" data-direction="right" class="js-pageLink">To NotFound right</div><!-- <h2>Collections</h2>' +
((__t = ( App.templates.userList(data.data.usersList) )) == null ? '' : __t) +
' --><form action="#" class="js-form"><div><input type="text" placeholder="name" name="name" value="Nick"></div><div><input type="text" placeholder="age" name="age" value="12"></div><div><input type="text" placeholder="email" name="email" value="nick@gmail.com"></div><button>Добавить</button></form><div class="js-users"><h2>Users</h2>' +
((__t = ( App.templates.auth(data.data.auth) )) == null ? '' : __t) +
'' +
((__t = ( App.templates.auth(data.data.auth2) )) == null ? '' : __t) +
'</div>';
return __p
};


export var notFound = function(data) {
var __t, __p = '';
__p += '<div data-page="/" data-direction="down" class="js-pageLink">To Home down</div><div data-page="/" data-direction="up" class="js-pageLink">To Home up</div><div data-page="/" data-direction="left" class="js-pageLink" data-back="true">To Home left</div><div data-page="/" data-direction="right" class="js-pageLink">To Home right</div>';
return __p
};


export var user = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<h3>Collections model</h3><ul data-cid="' +
((__t = ( data.model.cid )) == null ? '' : __t) +
'">';
 for ( var prop in data.model ) { ;
__p += '<li data-bind="' +
((__t = ( prop )) == null ? '' : __t) +
'" data-' +
((__t = ( prop )) == null ? '' : __t) +
'-bind="' +
((__t = ( data.model[prop] )) == null ? '' : __t) +
'">' +
((__t = ( data.model[prop] )) == null ? '' : __t) +
'</li>';
 } ;
__p += '</ul>';
return __p
};


export var userList = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div data-cname="' +
((__t = ( data.cname )) == null ? '' : __t) +
'" >';
 _.each(data, function(model, index){ ;
__p +=
((__t = ( App.templates.user({model: model}) )) == null ? '' : __t);
 }); ;
__p += '</div>';
return __p
};

