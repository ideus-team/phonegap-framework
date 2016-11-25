export var home = function(data) {
var __t, __p = '';
__p += '<div data-page="asd" data-direction="up" class="js-pageLink" data-writable="false">To NotFound up</div><div data-page="asd" data-direction="down" class="js-pageLink">To NotFound down</div><div data-page="asd" data-direction="left" class="js-pageLink">To NotFound left</div><div data-page="asd" data-direction="right" class="js-pageLink">To NotFound right</div><form action="#" class="js-form"><div><input type="text" placeholder="name" name="name" value="Nick"></div><div><input type="text" placeholder="age" name="age" value="12"></div><div><input type="text" placeholder="email" name="email" value="nick@gmail.com"></div><button>Добавить</button></form><div class="js-users"></div>';
return __p
};


export var notFound = function(data) {
var __t, __p = '';
__p += '<div data-page="/" data-direction="down" class="js-pageLink">To Home down</div><div data-page="/" data-direction="up" class="js-pageLink">To Home up</div><div data-page="/" data-direction="left" class="js-pageLink" data-back="true">To Home left</div><div data-page="/" data-direction="right" class="js-pageLink">To Home right</div>';
return __p
};


export var userComponent = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 var _data = data.toJSON(); ;
__p += '<ul data-cid="' +
((__t = ( data.cid )) == null ? '' : __t) +
'">';
 for ( var prop in _data ) { ;

 if ( _data[prop] ) { ;
__p +=
((__t = ( App.templates.userPropComponent({prop: prop, data: _data}) )) == null ? '' : __t);
 } ;

 } ;
__p += '</ul>\n';
return __p
};


export var userPropComponent = function(data) {
var __t, __p = '';
__p += '<li data-bind="' +
((__t = ( data.prop )) == null ? '' : __t) +
'">' +
((__t = ( data.data[data.prop] )) == null ? '' : __t) +
'</li>';
return __p
};

