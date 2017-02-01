export var alert = function(data) {
var __t, __p = '';
__p += '<div class="b-popupInner"><div class="b-alert"><div class="b-alert__title">' +
((__t = ( data.defaults.title )) == null ? '' : __t) +
'</div><div class="b-alert__message">' +
((__t = ( data.defaults.message )) == null ? '' : __t) +
'</div><div class="b-alert__button js-button">' +
((__t = ( data.defaults.button )) == null ? '' : __t) +
'</div></div></div>';
return __p
};


export var home = function(data) {
var __t, __p = '';
__p += '<div data-page="asd" data-direction="up" class="js-pageLink" data-writable="false">To NotFound up</div><div data-page="asd" data-direction="down" class="js-pageLink">To NotFound down</div><div data-page="asd" data-direction="left" class="js-pageLink">To NotFound left</div><div data-page="asd" data-direction="right" class="js-pageLink">To NotFound right</div><form action="#" class="js-form"><div><input type="text" placeholder="name" name="name" value="Nick"></div><div><input type="text" placeholder="age" name="age" value="12"></div><div><input type="text" placeholder="email" name="email" value="nick@gmail.com"></div><button>Добавить</button></form><div data-page="popup/testPopup" class="js-popup">Test popup</div><div class="js-users"></div>';
return __p
};


export var notFound = function(data) {
var __t, __p = '';
__p += '<div data-page="/" data-direction="down" class="js-pageLink">To Home down</div><div data-page="/" data-direction="up" class="js-pageLink">To Home up</div><div data-page="/" data-direction="left" class="js-pageLink" data-back="true">To Home left</div><div data-page="/" data-direction="right" class="js-pageLink">To Home right</div><div data-page="popup/testPopup" class="js-popup">Test popup</div>';
return __p
};


export var prompt = function(data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="b-popupInner"><div class="b-prompt">';
 if ( data.defaults.title ) { ;
__p += '<div class="b-prompt__title">' +
((__t = ( data.defaults.title )) == null ? '' : __t) +
'</div>';
 } ;
__p += '<div class="b-prompt__input"><input type="text" value="' +
((__t = ( data.defaults.defaultInput ? data.defaults.defaultInput : '' )) == null ? '' : __t) +
'" class="js-promptInput" ></div><div class="b-prompt__button -type_ok js-buttonOk">' +
((__t = ( data.defaults.buttonOk )) == null ? '' : __t) +
'</div><div class="b-prompt__button -type_cancel js-buttonCancel">' +
((__t = ( data.defaults.buttonCancel )) == null ? '' : __t) +
'</div></div></div>';
return __p
};


export var testPopup = function(data) {
var __t, __p = '';
__p += '<div class="b-popupInner"><div data-page="popup/testPopup2" class="js-popup">Popup in popup</div><div class="js-popupClose">Close</div></div>';
return __p
};


export var testPopup2 = function(data) {
var __t, __p = '';
__p += '<div class="b-popupInner"><div class="js-popupClose">Close</div></div>';
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
__p += '</ul>';
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

