/*
* classList.js: implémentation multi-navigateurs (Cross-browser) de element.classList.
* 2012-11-15
*
* By Eli Grey, http://eligrey.com
* Public Domain.
* NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

if (!('HTMLElement' in view) && !('Element' in view)) return;

var
  classListProp = "classList"
, protoProp = "prototype"
, elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
, objCtr = Object
, strTrim = String[protoProp].trim || function () {
  return this.replace(/^\s+|\s+$/g, "");
}
, arrIndexOf = Array[protoProp].indexOf || function (item) {
  var
      i = 0
    , len = this.length
  ;
  for (; i < len; i++) {
    if (i in this && this[i] === item) {
      return i;
    }
  }
  return -1;
}
// Vendors: please allow content code to instantiate DOMExceptions
, DOMEx = function (type, message) {
  this.name = type;
  this.code = DOMException[type];
  this.message = message;
}
, checkTokenAndGetIndex = function (classList, token) {
  if (token === "") {
    throw new DOMEx(
        "SYNTAX_ERR"
      , "An invalid or illegal string was specified"
    );
  }
  if (/\s/.test(token)) {
    throw new DOMEx(
        "INVALID_CHARACTER_ERR"
      , "String contains an invalid character"
    );
  }
  return arrIndexOf.call(classList, token);
}
, ClassList = function (elem) {
  var
      trimmedClasses = strTrim.call(elem.className)
    , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
    , i = 0
    , len = classes.length
  ;
  for (; i < len; i++) {
    this.push(classes[i]);
  }
  this._updateClassName = function () {
    elem.className = this.toString();
  };
}
, classListProto = ClassList[protoProp] = []
, classListGetter = function () {
  return new ClassList(this);
}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
return this[i] || null;
};
classListProto.contains = function (token) {
token += "";
return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
var
    tokens = arguments
  , i = 0
  , l = tokens.length
  , token
  , updated = false
;
do {
  token = tokens[i] + "";
  if (checkTokenAndGetIndex(this, token) === -1) {
    this.push(token);
    updated = true;
  }
}
while (++i < l);

if (updated) {
  this._updateClassName();
}
};
classListProto.remove = function () {
var
    tokens = arguments
  , i = 0
  , l = tokens.length
  , token
  , updated = false
;
do {
  token = tokens[i] + "";
  var index = checkTokenAndGetIndex(this, token);
  if (index !== -1) {
    this.splice(index, 1);
    updated = true;
  }
}
while (++i < l);

if (updated) {
  this._updateClassName();
}
};
classListProto.toggle = function (token, forse) {
token += "";

var
    result = this.contains(token)
  , method = result ?
    forse !== true && "remove"
  :
    forse !== false && "add"
;

if (method) {
  this[method](token);
}

return result;
};
classListProto.toString = function () {
return this.join(" ");
};

if (objCtr.defineProperty) {
var classListPropDesc = {
    get: classListGetter
  , enumerable: true
  , configurable: true
};
try {
  objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
} catch (ex) { // IE 8 doesn't support enumerable:true
  if (ex.number === -0x7FF5EC54) {
    classListPropDesc.enumerable = false;
    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
  }
}
} else if (objCtr[protoProp].__defineGetter__) {
elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

(function (){

  const overlay = document.querySelector('#overlay');


  let sidebarOpened = false
  let button = document.querySelector('#menu')
  const sidebar = document.querySelector('.sidebar')

  button.addEventListener('click',function (e){
    e.stopPropagation()
    e.preventDefault()
    sidebar.classList.toggle('has-sidebar')
    overlay.classList.toggle('is-hide');
    if(sidebarOpened){
      sidebarOpened = false;
    }else{
      sidebarOpened = true;
    }
  })

  overlay.addEventListener('click', function (){
    if(sidebarOpened){
      sidebar.classList.remove('has-sidebar')
      overlay.classList.add('is-hide');
      sidebarOpened = false
    }
  })

  let width = document.body.clientWidth;

  window.addEventListener("resize", function(){
    width = document.body.clientWidth;
    if(width>=680 && sidebarOpened && navbarOpened){
      sidebar.classList.remove('has-sidebar')
      overlay.classList.add('is-hide');
    }
    if(width<680 && sidebarOpened && navbarOpened){
      sidebar.classList.add('has-sidebar')
      overlay.classList.remove('is-hide');
    }
  }, true);

  var scrollY = function(){
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  }

  let lastknownPosY = 100
  let navbarOpened = true
  const header = document.querySelector('.header')

  window.addEventListener("scroll", function (){

    if(scrollY() > lastknownPosY){
      header.classList.add('hasno-navbar')
      if(width<700 && sidebarOpened){
        sidebar.classList.remove('has-sidebar')
        overlay.classList.add('is-hide');
      }
      navbarOpened = false
      lastknownPosY = scrollY()
    } else if (scrollY() <= lastknownPosY){
      header.classList.remove('hasno-navbar')
      if(width<700 && sidebarOpened){
        sidebar.classList.add('has-sidebar')
        overlay.classList.remove('is-hide');
      }
      navbarOpened = true
      lastknownPosY = scrollY()
    }
  })

})()
